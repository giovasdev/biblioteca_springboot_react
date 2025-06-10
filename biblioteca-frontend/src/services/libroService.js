import api from './api';
import { ENDPOINTS } from '../utils/constants';

export const libroService = {
    // Obtener todos los libros
    getAll: () => api.get(ENDPOINTS.LIBROS),

    // Obtener libro por ID
    getById: (id) => api.get(`${ENDPOINTS.LIBROS}/${id}`),

    // Crear nuevo libro
    create: (libro) => api.post(ENDPOINTS.LIBROS, libro),

    // Actualizar libro
    update: (id, libro) => api.put(`${ENDPOINTS.LIBROS}/${id}`, libro),

    // Eliminar libro
    delete: (id) => api.delete(`${ENDPOINTS.LIBROS}/${id}`),

    // Buscar libros
    search: (query) => api.get(`${ENDPOINTS.LIBROS}/search?query=${encodeURIComponent(query)}`),

    // Buscar por género
    getByGenero: (genero) => api.get(`${ENDPOINTS.LIBROS}/genero?genero=${encodeURIComponent(genero)}`),

    // Buscar por editorial
    getByEditorial: (editorial) => api.get(`${ENDPOINTS.LIBROS}/editorial?editorial=${encodeURIComponent(editorial)}`),

    // Buscar por autor
    getByAutor: (autor) => api.get(`${ENDPOINTS.LIBROS}/autor?autor=${encodeURIComponent(autor)}`),

    // Buscar por ISBN
    getByIsbn: (isbn) => api.get(`${ENDPOINTS.LIBROS}/isbn/${isbn}`),

    // Obtener libros disponibles
    getDisponibles: () => api.get(`${ENDPOINTS.LIBROS}/disponibles`)
};