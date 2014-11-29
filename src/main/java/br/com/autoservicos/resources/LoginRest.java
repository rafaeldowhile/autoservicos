package br.com.autoservicos.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.autoservicos.entities.Usuario;
import br.com.autoservicos.repositories.UsuarioRepository;

@RestController
@RequestMapping("/authenticate")
public class LoginRest {

	@Autowired
	private UsuarioRepository usuarioRepo;
	
	@RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Usuario autenticar(@RequestBody Usuario usuario) {
		Usuario authUser = usuarioRepo.findByEmail(usuario.getEmail());
		
		if (authUser == null) {
			throw new UsernameNotFoundException("Usuario não encontrado.");
		}
		
		return authUser;
	}
}
