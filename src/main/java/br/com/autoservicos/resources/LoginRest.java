package br.com.autoservicos.resources;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.autoservicos.config.security.CustomUserDetailsService;
import br.com.autoservicos.config.security.SecurityUser;
import br.com.autoservicos.entities.Usuario;
import br.com.autoservicos.repositories.UsuarioRepository;
import br.com.autoservicos.resources.dto.AuthenticationToken;
import br.com.autoservicos.utils.TokenUtils;

@RestController
@RequestMapping("/authenticate")
public class LoginRest {

	@Autowired
	private UsuarioRepository usuarioRepo;
	@Autowired
	private CustomUserDetailsService userService;
	@Autowired
	private AuthenticationManager authManager;
	
	@RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public AuthenticationToken autenticar(@RequestBody Usuario usuario, HttpServletRequest req) throws Exception {

		try {
			final UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(usuario.getEmail(), usuario.getSenha());
			
			Authentication auth = this.authManager.authenticate(token);
			
			SecurityContextHolder.getContext().setAuthentication(auth);
		
			final SecurityUser user = (SecurityUser) userService.loadUserByUsername(usuario.getEmail());
			
			return new AuthenticationToken(user.getId(), user.getEmail(), user.getNome(), TokenUtils.createToken(user));
		} catch (Exception e) {
			throw new Exception("Credenciais inválidas.");
		}
	}
	
	
}
