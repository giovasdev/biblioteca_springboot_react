import * as yup from 'yup';

// Schema para Libros
export const libroSchema = yup.object({
    titulo: yup.string().required('El título es requerido').max(255, 'Máximo 255 caracteres'),
    autor: yup.string().required('El autor es requerido').max(255, 'Máximo 255 caracteres'),
    anoPublicacion: yup.number()
        .required('El año de publicación es requerido')
        .min(1000, 'Año inválido')
        .max(new Date().getFullYear() + 1, 'El año no puede ser futuro'),
    isbn: yup.string().required('El ISBN es requerido').max(20, 'Máximo 20 caracteres'),
    numeroPaginas: yup.number()
        .required('El número de páginas es requerido')
        .min(1, 'Debe tener al menos 1 página'),
    genero: yup.string().max(100, 'Máximo 100 caracteres'),
    editorial: yup.string().max(255, 'Máximo 255 caracteres'),
    idioma: yup.string().max(50, 'Máximo 50 caracteres'),
    precio: yup.number().min(0, 'El precio no puede ser negativo'),
    stock: yup.number().min(0, 'El stock no puede ser negativo'),
    descripcion: yup.string().max(1000, 'Máximo 1000 caracteres'),
    disponible: yup.boolean()
});

// Schema para Revistas
export const revistaSchema = yup.object({
    titulo: yup.string().required('El título es requerido').max(255, 'Máximo 255 caracteres'),
    autor: yup.string().required('El autor es requerido').max(255, 'Máximo 255 caracteres'),
    anoPublicacion: yup.number()
        .required('El año de publicación es requerido')
        .min(1000, 'Año inválido')
        .max(new Date().getFullYear() + 1, 'El año no puede ser futuro'),
    numeroEdicion: yup.number()
        .required('El número de edición es requerido')
        .min(1, 'Debe ser al menos la edición 1'),
    categoria: yup.string().max(100, 'Máximo 100 caracteres'),
    periodicidad: yup.string().max(50, 'Máximo 50 caracteres'),
    issn: yup.string().max(20, 'Máximo 20 caracteres'),
    precio: yup.number().min(0, 'El precio no puede ser negativo'),
    numeroPaginas: yup.number().min(1, 'Debe tener al menos 1 página'),
    editorial: yup.string().max(255, 'Máximo 255 caracteres'),
    descripcion: yup.string().max(1000, 'Máximo 1000 caracteres'),
    disponible: yup.boolean()
});

// Schema para DVDs
export const dvdSchema = yup.object({
    titulo: yup.string().required('El título es requerido').max(255, 'Máximo 255 caracteres'),
    director: yup.string().max(255, 'Máximo 255 caracteres'),
    anoLanzamiento: yup.number()
        .required('El año de lanzamiento es requerido')
        .min(1888, 'Año inválido') // Primer película
        .max(new Date().getFullYear() + 5, 'El año no puede ser muy futuro'),
    genero: yup.string().max(100, 'Máximo 100 caracteres'),
    duracion: yup.number().min(1, 'La duración debe ser al menos 1 minuto'),
    clasificacion: yup.string().max(10, 'Máximo 10 caracteres'),
    actores: yup.string().max(500, 'Máximo 500 caracteres'),
    sinopsis: yup.string().max(2000, 'Máximo 2000 caracteres'),
    precio: yup.number().min(0, 'El precio no puede ser negativo'),
    disponible: yup.boolean()
});