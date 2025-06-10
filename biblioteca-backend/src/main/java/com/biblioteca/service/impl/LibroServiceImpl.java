package com.biblioteca.service.impl;

import com.biblioteca.dto.LibroDTO;
import com.biblioteca.exception.ResourceNotFoundException;
import com.biblioteca.model.Libro;
import com.biblioteca.repository.LibroRepository;
import com.biblioteca.service.LibroService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class LibroServiceImpl implements LibroService {

    private final LibroRepository libroRepository;

    @Autowired
    public LibroServiceImpl(LibroRepository libroRepository) {
        this.libroRepository = libroRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<LibroDTO> findAll() {
        return libroRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<LibroDTO> findById(Long id) {
        return libroRepository.findById(id).map(this::convertToDTO);
    }

    @Override
    public LibroDTO save(LibroDTO dto) {
        Libro libro = convertToEntity(dto);
        libro = libroRepository.save(libro);
        return convertToDTO(libro);
    }

    @Override
    public LibroDTO update(Long id, LibroDTO dto) {
        Libro existingLibro = libroRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Libro no encontrado con ID: " + id));

        // Mantener el ID original
        dto.setId(id);
        Libro updatedLibro = convertToEntity(dto);
        updatedLibro.setFechaCreacion(existingLibro.getFechaCreacion());

        updatedLibro = libroRepository.save(updatedLibro);
        return convertToDTO(updatedLibro);
    }

    @Override
    public void deleteById(Long id) {
        if (!libroRepository.existsById(id)) {
            throw new ResourceNotFoundException("Libro no encontrado con ID: " + id);
        }
        libroRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<LibroDTO> search(String query) {
        return libroRepository.searchLibros(query).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<LibroDTO> findByDisponible(Boolean disponible) {
        return libroRepository.findByDisponible(disponible).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<LibroDTO> findByGenero(String genero) {
        return libroRepository.findByGeneroContainingIgnoreCase(genero).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<LibroDTO> findByEditorial(String editorial) {
        return libroRepository.findByEditorialContainingIgnoreCase(editorial).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<LibroDTO> findByIsbn(String isbn) {
        return libroRepository.findByIsbn(isbn).map(this::convertToDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public List<LibroDTO> findByAutor(String autor) {
        return libroRepository.findByAutorContainingIgnoreCase(autor).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private LibroDTO convertToDTO(Libro libro) {
        LibroDTO dto = new LibroDTO();
        BeanUtils.copyProperties(libro, dto);
        return dto;
    }

    private Libro convertToEntity(LibroDTO dto) {
        Libro libro = new Libro();
        BeanUtils.copyProperties(dto, libro);
        return libro;
    }
}