package br.com.autoservicos.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.autoservicos.entities.Estabelecimento;

public interface EstabelecimentoRepository extends JpaRepository<Estabelecimento, Long>{
	
	@Query("select distinct e from Estabelecimento e join fetch e.servicos")
	public List<Estabelecimento> findAllWithService();
	
	@Query("select e from Estabelecimento e join e.usuario u where u.id = ?1")
	public List<Estabelecimento> findByUsuarioId(Long idUsuario);
	
	@Query("select e from Estabelecimento e left join fetch e.servicos left join fetch e.endereco where e.id = ?1")
	public Estabelecimento buscarInformacoesCadastrais(Long id);
}
