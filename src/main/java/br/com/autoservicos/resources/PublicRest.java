package br.com.autoservicos.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.autoservicos.entities.Estabelecimento;
import br.com.autoservicos.repositories.EstabelecimentoRepository;

@RestController
@RequestMapping(value = "/public")
public class PublicRest {

	@Autowired
	private EstabelecimentoRepository estabelecimentoRepo;
	
	@RequestMapping(value = "/estabelecimento", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<Estabelecimento> listar() {
		return estabelecimentoRepo.findAllWithService();
	}
	
	@RequestMapping(value = "/estabelecimento/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Estabelecimento buscar(@PathVariable("id") Long id) {
		return estabelecimentoRepo.buscarInformacoesCadastrais(id);
	}
	
}
