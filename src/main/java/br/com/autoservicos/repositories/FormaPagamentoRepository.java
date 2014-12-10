package br.com.autoservicos.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.autoservicos.entities.FormaPagamento;

public interface FormaPagamentoRepository extends JpaRepository<FormaPagamento, Long>{

}
