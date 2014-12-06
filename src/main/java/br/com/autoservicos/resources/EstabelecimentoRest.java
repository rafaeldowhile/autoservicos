package br.com.autoservicos.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.autoservicos.entities.Estabelecimento;
import br.com.autoservicos.repositories.EstabelecimentoRepository;

import com.fasterxml.jackson.annotation.JsonView;

@RestController
@RequestMapping("/estabelecimento")
public class EstabelecimentoRest extends BaseRest {
	
	@Autowired
	private EstabelecimentoRepository estabelecimentoRepo;


	@ResponseBody
	@JsonView(Estabelecimento.class)
	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public Estabelecimento criar(@RequestBody Estabelecimento estabelecimento) {
		estabelecimento.setUsuario(getUser());
		estabelecimento = estabelecimentoRepo.save(estabelecimento);
		return estabelecimento;
	}
	
	@ResponseBody
	@JsonView(Estabelecimento.class)
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public Estabelecimento atualizar(@RequestBody Estabelecimento estabelecimento) {
		estabelecimento.setUsuario(getUser());
		estabelecimento = estabelecimentoRepo.save(estabelecimento);
		return estabelecimento;
	}
	
	@ResponseBody
	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Estabelecimento> listar() {
		return estabelecimentoRepo.findAll();
	}
	
	@ResponseBody
	@RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Estabelecimento buscar(@PathVariable("id") Long id) {
		Estabelecimento estabelecimento = estabelecimentoRepo.buscarInformacoesCadastrais(id);
		return estabelecimento;
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(value = HttpStatus.OK)
	public void remover(@PathVariable("id") Long id) {
		estabelecimentoRepo.delete(id);
	}
}
