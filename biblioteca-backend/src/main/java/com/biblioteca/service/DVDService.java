package com.biblioteca.service;

import com.biblioteca.dto.DVDDTO;
import java.util.List;
import java.util.Optional;

public interface DVDService {

    // Métodos CRUD básicos
    List<DVDDTO> findAll();
    Optional<DVDDTO> findById(Long id);
    DVDDTO save(DVDDTO dvdDTO);
    DVDDTO update(Long id, DVDDTO dvdDTO);
    void deleteById(Long id);

    // Métodos de búsqueda básicos
    List<DVDDTO> findByTitulo(String titulo);
    List<DVDDTO> findByDisponible(Boolean disponible);
    List<DVDDTO> search(String termino);

    // Métodos específicos de DVD
    List<DVDDTO> findByDirector(String director);
    List<DVDDTO> findByGenero(String genero);
    List<DVDDTO> findByAnoLanzamiento(Integer ano);
    List<DVDDTO> findByDuracionBetween(Integer minDuracion, Integer maxDuracion);
    List<DVDDTO> findByClasificacion(String clasificacion);
    List<DVDDTO> findByActores(String actor);

    // Métodos adicionales
    List<DVDDTO> findByAnoLanzamientoBetween(Integer anoInicio, Integer anoFin);
    List<DVDDTO> findByPrecioBetween(Double precioMin, Double precioMax);
    List<String> findAllGeneros();
    List<String> findAllClasificaciones();
    Long countDisponibles();
    Double findPrecioPromedio();
}