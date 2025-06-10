package com.biblioteca.controller;

import com.biblioteca.dto.DVDDTO;
import com.biblioteca.service.DVDService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dvds")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
public class DVDController {

    private final DVDService dvdService;

    @Autowired
    public DVDController(DVDService dvdService) {
        this.dvdService = dvdService;
    }

    @GetMapping
    public ResponseEntity<List<DVDDTO>> getAllDVDs() {
        List<DVDDTO> dvds = dvdService.findAll();
        return ResponseEntity.ok(dvds);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DVDDTO> getDVDById(@PathVariable Long id) {
        return dvdService.findById(id)
                .map(dvd -> ResponseEntity.ok(dvd))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<DVDDTO> createDVD(@Valid @RequestBody DVDDTO dvdDTO) {
        DVDDTO savedDVD = dvdService.save(dvdDTO);
        return new ResponseEntity<>(savedDVD, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DVDDTO> updateDVD(@PathVariable Long id, @Valid @RequestBody DVDDTO dvdDTO) {
        DVDDTO updatedDVD = dvdService.update(id, dvdDTO);
        return ResponseEntity.ok(updatedDVD);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDVD(@PathVariable Long id) {
        dvdService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<DVDDTO>> searchDVDs(@RequestParam String query) {
        List<DVDDTO> dvds = dvdService.search(query);
        return ResponseEntity.ok(dvds);
    }

    @GetMapping("/genero")
    public ResponseEntity<List<DVDDTO>> getDVDsByGenero(@RequestParam String genero) {
        List<DVDDTO> dvds = dvdService.findByGenero(genero);
        return ResponseEntity.ok(dvds);
    }

    @GetMapping("/director")
    public ResponseEntity<List<DVDDTO>> getDVDsByDirector(@RequestParam String director) {
        List<DVDDTO> dvds = dvdService.findByDirector(director);
        return ResponseEntity.ok(dvds);
    }

    @GetMapping("/clasificacion")
    public ResponseEntity<List<DVDDTO>> getDVDsByClasificacion(@RequestParam String clasificacion) {
        List<DVDDTO> dvds = dvdService.findByClasificacion(clasificacion);
        return ResponseEntity.ok(dvds);
    }

    @GetMapping("/duracion")
    public ResponseEntity<List<DVDDTO>> getDVDsByDuracion(
            @RequestParam Integer minDuracion,
            @RequestParam Integer maxDuracion) {
        List<DVDDTO> dvds = dvdService.findByDuracionBetween(minDuracion, maxDuracion);
        return ResponseEntity.ok(dvds);
    }

    @GetMapping("/disponibles")
    public ResponseEntity<List<DVDDTO>> getDVDsDisponibles() {
        List<DVDDTO> dvds = dvdService.findByDisponible(true);
        return ResponseEntity.ok(dvds);
    }
}