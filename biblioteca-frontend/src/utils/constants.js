// API Endpoints
export const API_BASE_URL = 'http://localhost:8080/api';

export const ENDPOINTS = {
    LIBROS: '/libros',
    REVISTAS: '/revistas',
    DVDS: '/dvds'
};

// Routes
export const ROUTES = {
    DASHBOARD: '/dashboard',
    LIBROS: '/libros',
    REVISTAS: '/revistas',
    DVDS: '/dvds'
};

// Navigation items
export const NAVIGATION_ITEMS = [
    {
        text: 'Dashboard',
        path: ROUTES.DASHBOARD,
        icon: 'dashboard'
    },
    {
        text: 'Libros',
        path: ROUTES.LIBROS,
        icon: 'book'
    },
    {
        text: 'Revistas',
        path: ROUTES.REVISTAS,
        icon: 'magazine'
    },
    {
        text: 'DVDs',
        path: ROUTES.DVDS,
        icon: 'movie'
    }
];

// Theme colors
export const THEME_COLORS = {
    primary: '#1976d2',
    secondary: '#dc004e',
    success: '#2e7d32',
    error: '#d32f2f',
    warning: '#ed6c02',
    info: '#0288d1'
};