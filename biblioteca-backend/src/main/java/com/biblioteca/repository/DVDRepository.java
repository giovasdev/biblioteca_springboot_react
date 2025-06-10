package com.biblioteca.repository;

import com.biblioteca.model.DVD;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DVDRepository extends JpaRepository<DVD, Long> {

    // Búsquedas básicas
    List<DVD> findByTituloContainingIgnoreCase(String titulo);
    List<DVD> findByDirectorContainingIgnoreCase(String director);
    List<DVD> findByGeneroContainingIgnoreCase(String genero);
    List<DVD> findByAnoLanzamiento(Integer anoLanzamiento);
    List<DVD> findByDisponible(Boolean disponible);

    // MÉTODOS FALTANTES ↓
    List<DVD> findByDuracionBetween(Integer minDuracion, Integer maxDuracion);
    List<DVD> findByClasificacionContainingIgnoreCase(String clasificacion);

    // Búsquedas adicionales
    List<DVD> findByAnoLanzamientoBetween(Integer anoInicio, Integer anoFin);
    List<DVD> findByPrecioBetween(Double precioMin, Double precioMax);
    List<DVD> findByActoresContainingIgnoreCase(String actor);

    // Consultas personalizadas
    @Query("SELECT d FROM DVD d WHERE d.titulo LIKE %:termino% OR d.director LIKE %:termino% OR d.genero LIKE %:termino%")
    List<DVD> buscarPorTermino(@Param("termino") String termino);

    @Query("SELECT d FROM DVD d WHERE d.disponible = true ORDER BY d.fechaCreacion DESC")
    List<DVD> findDisponiblesRecientes();

    @Query("SELECT d FROM DVD d WHERE d.precio <= :precio ORDER BY d.precio ASC")
    List<DVD> findByPrecioMenorIgual(@Param("precio") Double precio);

    @Query("SELECT DISTINCT d.genero FROM DVD d WHERE d.genero IS NOT NULL ORDER BY d.genero")
    List<String> findAllGeneros();

    @Query("SELECT DISTINCT d.clasificacion FROM DVD d WHERE d.clasificacion IS NOT NULL ORDER BY d.clasificacion")
    List<String> findAllClasificaciones();

    @Query("SELECT COUNT(d) FROM DVD d WHERE d.disponible = true")
    Long countDisponibles();

    @Query("SELECT AVG(d.precio) FROM DVD d WHERE d.disponible = true")
    Double findPrecioPromedio();
}