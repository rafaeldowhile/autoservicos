package br.com.autoservicos.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.autoservicos.entities.Servico;
import br.com.autoservicos.repositories.ServicoRepository;

@RestController
@RequestMapping("/servico")
public class ServicoRest {

	@Autowired
	private ServicoRepository servicoRepo;
	
	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	private List<Servico> buscarTodos() {
		return servicoRepo.findAll();
	}
}
