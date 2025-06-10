package com.biblioteca.service;

import com.biblioteca.dto.RevistaDTO;
import com.biblioteca.model.Revista;

import java.util.List;

public interface RevistaService extends ElementoBibliotecaService<Revista, RevistaDTO> {
    List<RevistaDTO> findByCategoria(String categoria);
    List<RevistaDTO> findByPeriodicidad(String periodicidad);
    List<RevistaDTO> findByEditorial(String editorial);
    List<RevistaDTO> findByAutor(String autor);
}