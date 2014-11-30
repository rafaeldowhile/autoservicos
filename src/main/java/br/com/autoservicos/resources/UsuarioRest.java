package br.com.autoservicos.resources;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.autoservicos.config.security.SecurityUser;
import br.com.autoservicos.entities.Estabelecimento;
import br.com.autoservicos.repositories.EstabelecimentoRespository;

@RestController
@RequestMapping("/usuario")
public class UsuarioRest {
	
	@Autowired
	private EstabelecimentoRespository estabelecimentoRepo;

	@RequestMapping(value="/estabelecimentos", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	@Transactional
	public List<Estabelecimento> estabelecimentos(HttpServletRequest req) {
		List<Estabelecimento> estabelecimentos = estabelecimentoRepo.findByUsuarioId(getUser().getId());
		
		return estabelecimentos;
		
	}
	
	@RequestMapping(value="/estabelecimentos/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Estabelecimento estabelecimento(@PathVariable Long id, HttpServletRequest req) {
		Estabelecimento estabelecimento = estabelecimentoRepo.findOne(id);
		estabelecimento.getServicos();
		return estabelecimento;
		
	}
	
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
