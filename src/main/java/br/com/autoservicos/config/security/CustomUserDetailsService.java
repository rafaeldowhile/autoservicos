package br.com.autoservicos.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import br.com.autoservicos.entities.Usuario;
import br.com.autoservicos.repositories.UsuarioRepository;

@Component
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private UsuarioRepository usuarioRepo;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Usuario usuario = usuarioRepo.findByEmail(username);
		
		if (usuario == null) {
			throw new UsernameNotFoundException("Usuario não existe");
		}
		
		return new SecurityUser(usuario);
	}
	
}
