package br.com.autoservicos.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.autoservicos.entities.Estabelecimento;
import br.com.autoservicos.entities.Servico;
import br.com.autoservicos.repositories.EstabelecimentoRepository;
import br.com.autoservicos.repositories.ServicoRepository;

@RestController
@RequestMapping(value = "/public")
public class PublicRest {

	@Autowired
	private EstabelecimentoRepository estabelecimentoRepo;
	@Autowired
	private ServicoRepository servicoRepo;
	
	@RequestMapping(value = "/estabelecimento", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<Estabelecimento> listarEstabelecimentos(@RequestParam(value="servicos", required=false) List<Long> servicos) {
		if (servicos == null || servicos.isEmpty())
			return estabelecimentoRepo.findAllWithService();
		
		return estabelecimentoRepo.findQuery(servicos);
	}
	
	@RequestMapping(value = "/estabelecimento/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Estabelecimento buscar(@PathVariable("id") Long id) {
		return estabelecimentoRepo.buscarInformacoesCadastrais(id);
	}
	
	@RequestMapping(value = "/servico", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<Servico> listarServicos(@RequestParam(value="servico", required=false) String servico) {
		if (StringUtils.isEmpty(servico))
			return servicoRepo.findAll();
		return servicoRepo.findByNomeLikeOrderByNomeAsc(servico);
	}
	
}
