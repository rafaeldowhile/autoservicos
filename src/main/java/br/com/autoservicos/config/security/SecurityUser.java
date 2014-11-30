package br.com.autoservicos.config.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import br.com.autoservicos.entities.Usuario;

public class SecurityUser extends Usuario implements UserDetails {

	private static final long serialVersionUID = 469378864877003066L;

	public SecurityUser(Usuario usuario) {
		if (usuario != null) {
			this.setEmail(usuario.getEmail());
			this.setSenha(usuario.getSenha());
			this.setId(usuario.getId());
			this.setNome(usuario.getNome());
		}
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
	}

	@Override
	public String getPassword() {
		return super.getSenha();
	}

	@Override
	public String getUsername() {
		return super.getEmail();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
