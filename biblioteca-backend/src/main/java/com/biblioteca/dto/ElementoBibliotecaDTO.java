package com.biblioteca.dto;

import com.biblioteca.model.ElementoBiblioteca.TipoElemento;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ElementoBibliotecaDTO {
    private Long id;
    private String titulo;
    private String autor;
    private Integer anoPublicacion;
    private String descripcion;
    private Boolean disponible;
    private TipoElemento tipo;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaActualizacion;
}