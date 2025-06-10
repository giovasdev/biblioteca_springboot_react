package com.biblioteca.repository;

import com.biblioteca.model.ElementoBiblioteca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ElementoBibliotecaRepository extends JpaRepository<ElementoBiblioteca, Long> {

    List<ElementoBiblioteca> findByTituloContainingIgnoreCase(String titulo);
    List<ElementoBiblioteca> findByAutorContainingIgnoreCase(String autor);
    List<ElementoBiblioteca> findByDisponible(Boolean disponible);

    @Query("SELECT COUNT(e) FROM ElementoBiblioteca e WHERE e.disponible = true")
    Long countByDisponibleTrue();

    @Query("SELECT COUNT(e) FROM ElementoBiblioteca e WHERE e.disponible = false")
    Long countByDisponibleFalse();
}