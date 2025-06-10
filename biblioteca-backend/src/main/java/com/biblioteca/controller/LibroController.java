package com.biblioteca.controller;

import com.biblioteca.dto.LibroDTO;
import com.biblioteca.service.LibroService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/libros")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
public class LibroController {

    private final LibroService libroService;

    @Autowired
    public LibroController(LibroService libroService) {
        this.libroService = libroService;
    }

    @GetMapping
    public ResponseEntity<List<LibroDTO>> getAllLibros() {
        List<LibroDTO> libros = libroService.findAll();
        return ResponseEntity.ok(libros);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LibroDTO> getLibroById(@PathVariable Long id) {
        return libroService.findById(id)
                .map(libro -> ResponseEntity.ok(libro))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<LibroDTO> createLibro(@Valid @RequestBody LibroDTO libroDTO) {
        LibroDTO savedLibro = libroService.save(libroDTO);
        return new ResponseEntity<>(savedLibro, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LibroDTO> updateLibro(@PathVariable Long id, @Valid @RequestBody LibroDTO libroDTO) {
        LibroDTO updatedLibro = libroService.update(id, libroDTO);
        return ResponseEntity.ok(updatedLibro);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLibro(@PathVariable Long id) {
        libroService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<LibroDTO>> searchLibros(@RequestParam String query) {
        List<LibroDTO> libros = libroService.search(query);
        return ResponseEntity.ok(libros);
    }

    @GetMapping("/genero")
    public ResponseEntity<List<LibroDTO>> getLibrosByGenero(@RequestParam String genero) {
        List<LibroDTO> libros = libroService.findByGenero(genero);
        return ResponseEntity.ok(libros);
    }

    @GetMapping("/editorial")
    public ResponseEntity<List<LibroDTO>> getLibrosByEditorial(@RequestParam String editorial) {
        List<LibroDTO> libros = libroService.findByEditorial(editorial);
        return ResponseEntity.ok(libros);
    }

    @GetMapping("/autor")
    public ResponseEntity<List<LibroDTO>> getLibrosByAutor(@RequestParam String autor) {
        List<LibroDTO> libros = libroService.findByAutor(autor);
        return ResponseEntity.ok(libros);
    }

    @GetMapping("/isbn/{isbn}")
    public ResponseEntity<LibroDTO> getLibroByIsbn(@PathVariable String isbn) {
        return libroService.findByIsbn(isbn)
                .map(libro -> ResponseEntity.ok(libro))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/disponibles")
    public ResponseEntity<List<LibroDTO>> getLibrosDisponibles() {
        List<LibroDTO> libros = libroService.findByDisponible(true);
        return ResponseEntity.ok(libros);
    }
}