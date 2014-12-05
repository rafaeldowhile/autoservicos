package br.com.autoservicos.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import br.com.autoservicos.entities.Estabelecimento;
import br.com.autoservicos.repositories.EstabelecimentoRepository;

@RestController
@RequestMapping("/estabelecimento")
public class EstabelecimentoRest extends BaseRest {
	
	@Autowired
	private EstabelecimentoRepository estabelecimentoRepo;


	@JsonView(Estabelecimento.class)
	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Estabelecimento criar(@RequestBody Estabelecimento estabelecimento) {
		estabelecimento.setUsuario(getUser());
		estabelecimento = estabelecimentoRepo.save(estabelecimento);
		return estabelecimento;
	}
}
