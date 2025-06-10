package com.biblioteca.service.impl;

import com.biblioteca.dto.RevistaDTO;
import com.biblioteca.exception.ResourceNotFoundException;
import com.biblioteca.model.Revista;
import com.biblioteca.repository.RevistaRepository;
import com.biblioteca.service.RevistaService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class RevistaServiceImpl implements RevistaService {

    private final RevistaRepository revistaRepository;

    @Autowired
    public RevistaServiceImpl(RevistaRepository revistaRepository) {
        this.revistaRepository = revistaRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<RevistaDTO> findAll() {
        return revistaRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<RevistaDTO> findById(Long id) {
        return revistaRepository.findById(id).map(this::convertToDTO);
    }

    @Override
    public RevistaDTO save(RevistaDTO dto) {
        Revista revista = convertToEntity(dto);
        revista = revistaRepository.save(revista);
        return convertToDTO(revista);
    }

    @Override
    public RevistaDTO update(Long id, RevistaDTO dto) {
        Revista existingRevista = revistaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Revista no encontrada con ID: " + id));

        dto.setId(id);
        Revista updatedRevista = convertToEntity(dto);
        updatedRevista.setFechaCreacion(existingRevista.getFechaCreacion());

        updatedRevista = revistaRepository.save(updatedRevista);
        return convertToDTO(updatedRevista);
    }

    @Override
    public void deleteById(Long id) {
        if (!revistaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Revista no encontrada con ID: " + id);
        }
        revistaRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<RevistaDTO> search(String query) {
        return revistaRepository.searchRevistas(query).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<RevistaDTO> findByDisponible(Boolean disponible) {
        return revistaRepository.findByDisponible(disponible).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<RevistaDTO> findByCategoria(String categoria) {
        return revistaRepository.findByCategoriaContainingIgnoreCase(categoria).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<RevistaDTO> findByPeriodicidad(String periodicidad) {
        return revistaRepository.findByPeriodicidadContainingIgnoreCase(periodicidad).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<RevistaDTO> findByEditorial(String editorial) {
        return revistaRepository.findByEditorialContainingIgnoreCase(editorial).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<RevistaDTO> findByAutor(String autor) {
        return revistaRepository.findByAutorContainingIgnoreCase(autor).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private RevistaDTO convertToDTO(Revista revista) {
        RevistaDTO dto = new RevistaDTO();
        BeanUtils.copyProperties(revista, dto);
        return dto;
    }

    private Revista convertToEntity(RevistaDTO dto) {
        Revista revista = new Revista();
        BeanUtils.copyProperties(dto, revista);
        return revista;
    }
}