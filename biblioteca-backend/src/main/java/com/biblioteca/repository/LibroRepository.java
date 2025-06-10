package com.biblioteca.repository;

import com.biblioteca.model.Libro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LibroRepository extends JpaRepository<Libro, Long> {

    List<Libro> findByTituloContainingIgnoreCase(String titulo);
    List<Libro> findByAutorContainingIgnoreCase(String autor);
    List<Libro> findByGeneroContainingIgnoreCase(String genero);
    List<Libro> findByEditorialContainingIgnoreCase(String editorial);
    Optional<Libro> findByIsbn(String isbn);
    List<Libro> findByIsbnContaining(String isbn);
    List<Libro> findByDisponible(Boolean disponible);

    @Query("SELECT l FROM Libro l WHERE " +
            "LOWER(l.titulo) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(l.autor) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(l.genero) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(l.editorial) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "l.isbn LIKE CONCAT('%', :query, '%')")
    List<Libro> searchLibros(@Param("query") String query);
}