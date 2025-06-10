package com.biblioteca.service;

import java.util.List;
import java.util.Optional;

public interface ElementoBibliotecaService<T, D> {
    List<D> findAll();
    Optional<D> findById(Long id);
    D save(D dto);
    D update(Long id, D dto);
    void deleteById(Long id);
    List<D> search(String query);
    List<D> findByDisponible(Boolean disponible);
}