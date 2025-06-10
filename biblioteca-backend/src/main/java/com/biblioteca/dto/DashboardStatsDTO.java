package com.biblioteca.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDTO {
    private Long totalLibros;
    private Long totalRevistas;
    private Long totalDVDs;
    private Long totalElementos;
    private Long elementosDisponibles;
    private Long elementosNoDisponibles;
}