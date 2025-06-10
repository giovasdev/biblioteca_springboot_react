import api from './api';
import { ENDPOINTS } from '../utils/constants';

export const revistaService = {
    // Obtener todas las revistas
    getAll: () => api.get(ENDPOINTS.REVISTAS),

    // Obtener revista por ID
    getById: (id) => api.get(`${ENDPOINTS.REVISTAS}/${id}`),

    // Crear nueva revista
    create: (revista) => api.post(ENDPOINTS.REVISTAS, revista),

    // Actualizar revista
    update: (id, revista) => api.put(`${ENDPOINTS.REVISTAS}/${id}`, revista),

    // Eliminar revista
    delete: (id) => api.delete(`${ENDPOINTS.REVISTAS}/${id}`),

    // Buscar revistas
    search: (query) => api.get(`${ENDPOINTS.REVISTAS}/search?query=${encodeURIComponent(query)}`),

    // Buscar por categoría
    getByCategoria: (categoria) => api.get(`${ENDPOINTS.REVISTAS}/categoria?categoria=${encodeURIComponent(categoria)}`),

    // Buscar por periodicidad
    getByPeriodicidad: (periodicidad) => api.get(`${ENDPOINTS.REVISTAS}/periodicidad?periodicidad=${encodeURIComponent(periodicidad)}`),

    // Buscar por editorial
    getByEditorial: (editorial) => api.get(`${ENDPOINTS.REVISTAS}/editorial?editorial=${encodeURIComponent(editorial)}`),

    // Buscar por autor
    getByAutor: (autor) => api.get(`${ENDPOINTS.REVISTAS}/autor?autor=${encodeURIComponent(autor)}`),

    // Obtener revistas disponibles
    getDisponibles: () => api.get(`${ENDPOINTS.REVISTAS}/disponibles`)
};