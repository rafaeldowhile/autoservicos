package br.com.autoservicos.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.autoservicos.entities.Servico;

public interface ServicoRepository extends JpaRepository<Servico, Long>{

}
