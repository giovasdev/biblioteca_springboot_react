import api from './api';
import { ENDPOINTS } from '../utils/constants';

export const dvdService = {
    // Obtener todos los DVDs
    getAll: () => api.get(ENDPOINTS.DVDS),

    // Obtener DVD por ID
    getById: (id) => api.get(`${ENDPOINTS.DVDS}/${id}`),

    // Crear nuevo DVD
    create: (dvd) => api.post(ENDPOINTS.DVDS, dvd),

    // Actualizar DVD
    update: (id, dvd) => api.put(`${ENDPOINTS.DVDS}/${id}`, dvd),

    // Eliminar DVD
    delete: (id) => api.delete(`${ENDPOINTS.DVDS}/${id}`),

    // Buscar DVDs
    search: (query) => api.get(`${ENDPOINTS.DVDS}/search?query=${encodeURIComponent(query)}`),

    // Buscar por género
    getByGenero: (genero) => api.get(`${ENDPOINTS.DVDS}/genero?genero=${encodeURIComponent(genero)}`),

    // Buscar por director
    getByDirector: (director) => api.get(`${ENDPOINTS.DVDS}/director?director=${encodeURIComponent(director)}`),

    // Buscar por clasificación
    getByClasificacion: (clasificacion) => api.get(`${ENDPOINTS.DVDS}/clasificacion?clasificacion=${encodeURIComponent(clasificacion)}`),

    // Buscar por duración
    getByDuracion: (minDuracion, maxDuracion) => api.get(`${ENDPOINTS.DVDS}/duracion?minDuracion=${minDuracion}&maxDuracion=${maxDuracion}`),

    // Obtener DVDs disponibles
    getDisponibles: () => api.get(`${ENDPOINTS.DVDS}/disponibles`)
};