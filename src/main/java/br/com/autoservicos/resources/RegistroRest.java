package br.com.autoservicos.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.autoservicos.entities.Usuario;
import br.com.autoservicos.repositories.UsuarioRepository;

@RestController
@RequestMapping("/signin")
public class RegistroRest {

	@Autowired
	private UsuarioRepository usuarioRepo;
	
	@RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	@Transactional
	public Usuario registrar(@RequestBody Usuario usuario) {
		Usuario usr = usuarioRepo.findByEmail(usuario.getEmail());

		if (usr != null) {
			return null;
		}
		
		usr = usuarioRepo.save(usuario);
		
		return usr;
	}
	
	
}
