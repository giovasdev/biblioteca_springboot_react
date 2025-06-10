package com.biblioteca.controller;

import com.biblioteca.dto.RevistaDTO;
import com.biblioteca.service.RevistaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/revistas")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
public class RevistaController {

    private final RevistaService revistaService;

    @Autowired
    public RevistaController(RevistaService revistaService) {
        this.revistaService = revistaService;
    }

    @GetMapping
    public ResponseEntity<List<RevistaDTO>> getAllRevistas() {
        List<RevistaDTO> revistas = revistaService.findAll();
        return ResponseEntity.ok(revistas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RevistaDTO> getRevistaById(@PathVariable Long id) {
        return revistaService.findById(id)
                .map(revista -> ResponseEntity.ok(revista))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<RevistaDTO> createRevista(@Valid @RequestBody RevistaDTO revistaDTO) {
        RevistaDTO savedRevista = revistaService.save(revistaDTO);
        return new ResponseEntity<>(savedRevista, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RevistaDTO> updateRevista(@PathVariable Long id, @Valid @RequestBody RevistaDTO revistaDTO) {
        RevistaDTO updatedRevista = revistaService.update(id, revistaDTO);
        return ResponseEntity.ok(updatedRevista);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRevista(@PathVariable Long id) {
        revistaService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<RevistaDTO>> searchRevistas(@RequestParam String query) {
        List<RevistaDTO> revistas = revistaService.search(query);
        return ResponseEntity.ok(revistas);
    }

    @GetMapping("/categoria")
    public ResponseEntity<List<RevistaDTO>> getRevistasByCategoria(@RequestParam String categoria) {
        List<RevistaDTO> revistas = revistaService.findByCategoria(categoria);
        return ResponseEntity.ok(revistas);
    }

    @GetMapping("/periodicidad")
    public ResponseEntity<List<RevistaDTO>> getRevistasByPeriodicidad(@RequestParam String periodicidad) {
        List<RevistaDTO> revistas = revistaService.findByPeriodicidad(periodicidad);
        return ResponseEntity.ok(revistas);
    }

    @GetMapping("/editorial")
    public ResponseEntity<List<RevistaDTO>> getRevistasByEditorial(@RequestParam String editorial) {
        List<RevistaDTO> revistas = revistaService.findByEditorial(editorial);
        return ResponseEntity.ok(revistas);
    }

    @GetMapping("/autor")
    public ResponseEntity<List<RevistaDTO>> getRevistasByAutor(@RequestParam String autor) {
        List<RevistaDTO> revistas = revistaService.findByAutor(autor);
        return ResponseEntity.ok(revistas);
    }

    @GetMapping("/disponibles")
    public ResponseEntity<List<RevistaDTO>> getRevistasDisponibles() {
        List<RevistaDTO> revistas = revistaService.findByDisponible(true);
        return ResponseEntity.ok(revistas);
    }
}