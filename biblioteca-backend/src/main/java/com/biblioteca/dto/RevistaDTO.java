package com.biblioteca.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class RevistaDTO extends ElementoBibliotecaDTO {
    private Integer numeroEdicion;
    private String categoria;
    private String periodicidad;
    private String issn;
    private Double precio;
    private Integer numeroPaginas;
    private String editorial;
}