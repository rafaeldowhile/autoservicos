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
	
	@Query("select e from Estabelecimento e left join fetch e.servicos left join fetch e.endereco left join fetch e.listaFormaPagamento where e.id = ?1 and e.usuario.id = ?2 order by e.id")
	public Estabelecimento buscarInformacoesCadastrais(Long id, Long idUsuario);

	@Query("select distinct e from Estabelecimento e left join fetch e.servicos s where e.id in (select r.id from Estabelecimento r left join r.servicos w where w.id in (?1) )")
	public List<Estabelecimento> findQuery(List<Long> servicos);

	@Query("select e from Estabelecimento e left join fetch e.servicos left join fetch e.endereco left join fetch e.listaFormaPagamento where e.id = ?1 order by e.id")
	public Estabelecimento buscarPublicInformacoesCadastrais(Long id);
}
