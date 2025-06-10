import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Grid,
    TextField,
    InputAdornment,
    Fab,
    Container,
    Alert,
    Skeleton
} from '@mui/material';
import {
    Add as AddIcon,
    Search as SearchIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { libroService } from '../../services/libroService';
import LibroCard from './LibroCard';
import LibroForm from './LibroForm';
import ConfirmDialog from '../common/ConfirmDialog';

const LibrosList = () => {
    const [libros, setLibros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredLibros, setFilteredLibros] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [editingLibro, setEditingLibro] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState({ open: false, libro: null });

    useEffect(() => {
        loadLibros();
    }, []);

    useEffect(() => {
        filterLibros();
    }, [libros, searchTerm]);

    const loadLibros = async () => {
        try {
            setLoading(true);
            const response = await libroService.getAll();
            setLibros(response.data);
        } catch (error) {
            console.error('Error loading libros:', error);
            toast.error('Error al cargar los libros');
        } finally {
            setLoading(false);
        }
    };

    const filterLibros = () => {
        if (!searchTerm.trim()) {
            setFilteredLibros(libros);
        } else {
            const filtered = libros.filter(libro =>
                libro.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                libro.autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                libro.genero?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                libro.editorial?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                libro.isbn.includes(searchTerm)
            );
            setFilteredLibros(filtered);
        }
    };

    const handleEdit = (libro) => {
        setEditingLibro(libro);
        setOpenForm(true);
    };

    const handleDelete = (libro) => {
        setDeleteDialog({ open: true, libro });
    };

    const confirmDelete = async () => {
        try {
            await libroService.delete(deleteDialog.libro.id);
            toast.success('Libro eliminado exitosamente');
            loadLibros();
        } catch (error) {
            console.error('Error deleting libro:', error);
            toast.error('Error al eliminar el libro');
        } finally {
            setDeleteDialog({ open: false, libro: null });
        }
    };

    const handleFormClose = () => {
        setOpenForm(false);
        setEditingLibro(null);
        loadLibros();
    };

    const handleAddNew = () => {
        setEditingLibro(null);
        setOpenForm(true);
    };

    if (loading) {
        return (
            <Container maxWidth="lg">
                <Box sx={{ mb: 4 }}>
                    <Skeleton variant="text" width={200} height={40} />
                    <Skeleton variant="rectangular" width="100%" height={56} sx={{ mt: 2 }} />
                </Box>
                <Grid container spacing={3}>
                    {[...Array(6)].map((_, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                        Gestión de Libros
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
                        <TextField
                            fullWidth
                            placeholder="Buscar libros por título, autor, género, editorial o ISBN..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ maxWidth: 600 }}
                        />
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleAddNew}
                            sx={{ minWidth: 140 }}
                        >
                            Nuevo Libro
                        </Button>
                    </Box>
                </Box>

                {filteredLibros.length === 0 ? (
                    <Alert severity="info" sx={{ mt: 2 }}>
                        {searchTerm ? 'No se encontraron libros que coincidan con la búsqueda' : 'No hay libros registrados'}
                    </Alert>
                ) : (
                    <Grid container spacing={3}>
                        <AnimatePresence>
                            {filteredLibros.map((libro, index) => (
                                <Grid item xs={12} sm={6} md={4} key={libro.id}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                    >
                                        <LibroCard
                                            libro={libro}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                        />
                                    </motion.div>
                                </Grid>
                            ))}
                        </AnimatePresence>
                    </Grid>
                )}

                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={handleAddNew}
                    sx={{
                        position: 'fixed',
                        bottom: 16,
                        right: 16,
                    }}
                >
                    <AddIcon />
                </Fab>

                <LibroForm
                    open={openForm}
                    onClose={handleFormClose}
                    libro={editingLibro}
                />

                <ConfirmDialog
                    open={deleteDialog.open}
                    title="Confirmar eliminación"
                    message={`¿Estás seguro de que deseas eliminar el libro "${deleteDialog.libro?.titulo}"?`}
                    onConfirm={confirmDelete}
                    onCancel={() => setDeleteDialog({ open: false, libro: null })}
                />
            </motion.div>
        </Container>
    );
};

export default LibrosList;