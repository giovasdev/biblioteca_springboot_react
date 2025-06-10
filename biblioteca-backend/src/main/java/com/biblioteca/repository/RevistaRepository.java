package com.biblioteca.repository;

import com.biblioteca.model.Revista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RevistaRepository extends JpaRepository<Revista, Long> {

    List<Revista> findByTituloContainingIgnoreCase(String titulo);
    List<Revista> findByAutorContainingIgnoreCase(String autor);
    List<Revista> findByCategoriaContainingIgnoreCase(String categoria);
    List<Revista> findByPeriodicidadContainingIgnoreCase(String periodicidad);
    List<Revista> findByEditorialContainingIgnoreCase(String editorial);
    List<Revista> findByDisponible(Boolean disponible);

    @Query("SELECT r FROM Revista r WHERE " +
            "LOWER(r.titulo) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(r.autor) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(r.categoria) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(r.editorial) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "r.issn LIKE CONCAT('%', :query, '%')")
    List<Revista> searchRevistas(@Param("query") String query);
}