package br.com.autoservicos.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import br.com.autoservicos.entities.Estabelecimento;

public interface EstabelecimentoRespository extends CrudRepository<Estabelecimento, Long>{
	
	@Query("select e from Estabelecimento e join e.usuario u left join fetch e.servicos where u.id = ?1")
	public List<Estabelecimento> findByUsuarioId(Long idUsuario);
}
