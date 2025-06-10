package com.biblioteca.service.impl;

import com.biblioteca.dto.DVDDTO;
import com.biblioteca.model.DVD;
import com.biblioteca.repository.DVDRepository;
import com.biblioteca.service.DVDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DVDServiceImpl implements DVDService {

    @Autowired
    private DVDRepository dvdRepository;

    // Métodos de ElementoBibliotecaService
    @Override
    public List<DVDDTO> findAll() {
        return dvdRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<DVDDTO> findById(Long id) {
        return dvdRepository.findById(id)
                .map(this::convertToDTO);
    }

    @Override
    public DVDDTO save(DVDDTO dvdDTO) {
        DVD dvd = convertToEntity(dvdDTO);
        if (dvd.getId() == null) {
            dvd.setFechaCreacion(LocalDateTime.now());
        }
        dvd.setFechaActualizacion(LocalDateTime.now());

        DVD savedDVD = dvdRepository.save(dvd);
        return convertToDTO(savedDVD);
    }

    @Override
    public DVDDTO update(Long id, DVDDTO dvdDTO) {
        Optional<DVD> existingDVD = dvdRepository.findById(id);
        if (existingDVD.isPresent()) {
            DVD dvd = existingDVD.get();
            updateDVDFromDTO(dvd, dvdDTO);
            dvd.setFechaActualizacion(LocalDateTime.now());

            DVD updatedDVD = dvdRepository.save(dvd);
            return convertToDTO(updatedDVD);
        }
        return null;
    }

    @Override
    public void deleteById(Long id) {  // ← CAMBIO: void en lugar de boolean
        dvdRepository.deleteById(id);
    }

    @Override
    public List<DVDDTO> search(String termino) {  // ← MÉTODO FALTANTE
        return dvdRepository.buscarPorTermino(termino).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<DVDDTO> findByTitulo(String titulo) {
        return dvdRepository.findByTituloContainingIgnoreCase(titulo).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<DVDDTO> findByDisponible(Boolean disponible) {
        return dvdRepository.findByDisponible(disponible).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Método adicional para actualización parcial
    public DVDDTO partialUpdate(Long id, DVDDTO dvdDTO) {
        Optional<DVD> existingDVD = dvdRepository.findById(id);
        if (existingDVD.isPresent()) {
            DVD dvd = existingDVD.get();

            // Solo actualizar campos no nulos
            if (dvdDTO.getTitulo() != null) dvd.setTitulo(dvdDTO.getTitulo());
            if (dvdDTO.getDirector() != null) dvd.setDirector(dvdDTO.getDirector());
            if (dvdDTO.getAnoLanzamiento() != null) dvd.setAnoLanzamiento(dvdDTO.getAnoLanzamiento());
            if (dvdDTO.getGenero() != null) dvd.setGenero(dvdDTO.getGenero());
            if (dvdDTO.getDuracion() != null) dvd.setDuracion(dvdDTO.getDuracion());
            if (dvdDTO.getClasificacion() != null) dvd.setClasificacion(dvdDTO.getClasificacion());
            if (dvdDTO.getActores() != null) dvd.setActores(dvdDTO.getActores());
            if (dvdDTO.getSinopsis() != null) dvd.setSinopsis(dvdDTO.getSinopsis());
            if (dvdDTO.getPrecio() != null) dvd.setPrecio(dvdDTO.getPrecio());
            if (dvdDTO.getDisponible() != null) dvd.setDisponible(dvdDTO.getDisponible());

            dvd.setFechaActualizacion(LocalDateTime.now());

            DVD updatedDVD = dvdRepository.save(dvd);
            return convertToDTO(updatedDVD);
        }
        return null;
    }

    // Métodos específicos de DVD
    @Override
    public List<DVDDTO> findByDirector(String director) {
        return dvdRepository.findByDirectorContainingIgnoreCase(director).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<DVDDTO> findByGenero(String genero) {
        return dvdRepository.findByGeneroContainingIgnoreCase(genero).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<DVDDTO> findByAnoLanzamiento(Integer ano) {
        return dvdRepository.findByAnoLanzamiento(ano).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<DVDDTO> findByDuracionBetween(Integer minDuracion, Integer maxDuracion) {
        return dvdRepository.findByDuracionBetween(minDuracion, maxDuracion).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<DVDDTO> findByClasificacion(String clasificacion) {
        return dvdRepository.findByClasificacionContainingIgnoreCase(clasificacion).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<DVDDTO> findByActores(String actor) {
        return dvdRepository.findByActoresContainingIgnoreCase(actor).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<DVDDTO> findByAnoLanzamientoBetween(Integer anoInicio, Integer anoFin) {
        return dvdRepository.findByAnoLanzamientoBetween(anoInicio, anoFin).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<DVDDTO> findByPrecioBetween(Double precioMin, Double precioMax) {
        return dvdRepository.findByPrecioBetween(precioMin, precioMax).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<String> findAllGeneros() {
        return dvdRepository.findAllGeneros();
    }

    @Override
    public List<String> findAllClasificaciones() {
        return dvdRepository.findAllClasificaciones();
    }

    @Override
    public Long countDisponibles() {
        return dvdRepository.countDisponibles();
    }

    @Override
    public Double findPrecioPromedio() {
        return dvdRepository.findPrecioPromedio();
    }

    // Métodos de conversión
    private DVDDTO convertToDTO(DVD dvd) {
        DVDDTO dto = new DVDDTO();
        dto.setId(dvd.getId());
        dto.setTitulo(dvd.getTitulo());
        dto.setDirector(dvd.getDirector());
        dto.setAnoLanzamiento(dvd.getAnoLanzamiento());  // ← AHORA FUNCIONA
        dto.setGenero(dvd.getGenero());
        dto.setDuracion(dvd.getDuracion());  // ← AHORA FUNCIONA
        dto.setClasificacion(dvd.getClasificacion());
        dto.setActores(dvd.getActores());  // ← AHORA FUNCIONA
        dto.setSinopsis(dvd.getSinopsis());  // ← AHORA FUNCIONA
        dto.setPrecio(dvd.getPrecio());
        dto.setDisponible(dvd.getDisponible());
        dto.setFechaCreacion(dvd.getFechaCreacion());
        dto.setFechaActualizacion(dvd.getFechaActualizacion());
        return dto;
    }

    private DVD convertToEntity(DVDDTO dto) {
        DVD dvd = new DVD();
        dvd.setId(dto.getId());
        dvd.setTitulo(dto.getTitulo());
        dvd.setDirector(dto.getDirector());
        dvd.setAnoLanzamiento(dto.getAnoLanzamiento());  // ← AHORA FUNCIONA
        dvd.setGenero(dto.getGenero());
        dvd.setDuracion(dto.getDuracion());  // ← AHORA FUNCIONA
        dvd.setClasificacion(dto.getClasificacion());
        dvd.setActores(dto.getActores());  // ← AHORA FUNCIONA
        dvd.setSinopsis(dto.getSinopsis());  // ← AHORA FUNCIONA
        dvd.setPrecio(dto.getPrecio());
        dvd.setDisponible(dto.getDisponible());
        return dvd;
    }

    private void updateDVDFromDTO(DVD dvd, DVDDTO dto) {
        dvd.setTitulo(dto.getTitulo());
        dvd.setDirector(dto.getDirector());
        dvd.setAnoLanzamiento(dto.getAnoLanzamiento());  // ← AHORA FUNCIONA
        dvd.setGenero(dto.getGenero());
        dvd.setDuracion(dto.getDuracion());  // ← AHORA FUNCIONA
        dvd.setClasificacion(dto.getClasificacion());
        dvd.setActores(dto.getActores());  // ← AHORA FUNCIONA
        dvd.setSinopsis(dto.getSinopsis());  // ← AHORA FUNCIONA
        dvd.setPrecio(dto.getPrecio());
        dvd.setDisponible(dto.getDisponible());
    }
}