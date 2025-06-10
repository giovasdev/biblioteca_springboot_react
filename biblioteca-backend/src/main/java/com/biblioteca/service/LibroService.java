package com.biblioteca.service;

import com.biblioteca.dto.LibroDTO;
import com.biblioteca.model.Libro;

import java.util.List;
import java.util.Optional;

public interface LibroService extends ElementoBibliotecaService<Libro, LibroDTO> {
    List<LibroDTO> findByGenero(String genero);
    List<LibroDTO> findByEditorial(String editorial);
    Optional<LibroDTO> findByIsbn(String isbn);
    List<LibroDTO> findByAutor(String autor);
}