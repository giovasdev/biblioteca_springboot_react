package com.biblioteca.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class LibroDTO extends ElementoBibliotecaDTO {
    private String isbn;
    private Integer numeroPaginas;
    private String genero;
    private String editorial;
    private String idioma;
    private Double precio;
    private Integer stock;
}