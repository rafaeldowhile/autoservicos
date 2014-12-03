package br.com.autoservicos.resources;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;

import br.com.autoservicos.config.security.SecurityUser;

@RestController
public class BaseRest {

		public SecurityUser getUser() {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			Object principal = authentication.getPrincipal();
			if (principal instanceof String && ((String) principal).equals("anonymousUser")) {
	//			throw new WebApplicationException(401);
			}
			SecurityUser userDetails = (SecurityUser) principal;
	
			return userDetails;
		}

}
