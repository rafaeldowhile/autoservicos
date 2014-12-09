package br.com.autoservicos.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.autoservicos.entities.Servico;

public interface ServicoRepository extends JpaRepository<Servico, Long>{

	List<Servico> findByNomeLikeOrderByNomeAsc(String filtro);

}
