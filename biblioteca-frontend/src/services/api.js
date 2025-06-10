import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        console.log(`Response received:`, response.status);
        return response;
    },
    (error) => {
        console.error('API Error:', error);

        if (error.code === 'ECONNABORTED') {
            error.message = 'La solicitud ha tardado demasiado tiempo';
        } else if (error.response?.status === 404) {
            error.message = 'Recurso no encontrado';
        } else if (error.response?.status >= 500) {
            error.message = 'Error interno del servidor';
        } else if (!error.response) {
            error.message = 'Error de conexión. Verifique que el servidor esté ejecutándose';
        }

        return Promise.reject(error);
    }
);

export default api;