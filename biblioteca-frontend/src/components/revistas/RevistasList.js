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
import { revistaService } from '../../services/revistaService';
import RevistaCard from './RevistaCard';
import RevistaForm from './RevistaForm';
import ConfirmDialog from '../common/ConfirmDialog';

const RevistasList = () => {
    const [revistas, setRevistas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRevistas, setFilteredRevistas] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [editingRevista, setEditingRevista] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState({ open: false, revista: null });

    useEffect(() => {
        loadRevistas();
    }, []);

    useEffect(() => {
        filterRevistas();
    }, [revistas, searchTerm]);

    const loadRevistas = async () => {
        try {
            setLoading(true);
            const response = await revistaService.getAll();
            setRevistas(response.data);
        } catch (error) {
            console.error('Error loading revistas:', error);
            toast.error('Error al cargar las revistas');
        } finally {
            setLoading(false);
        }
    };

    const filterRevistas = () => {
        if (!searchTerm.trim()) {
            setFilteredRevistas(revistas);
        } else {
            const filtered = revistas.filter(revista =>
                revista.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                revista.autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                revista.categoria?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                revista.editorial?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                revista.issn?.includes(searchTerm)
            );
            setFilteredRevistas(filtered);
        }
    };

    const handleEdit = (revista) => {
        setEditingRevista(revista);
        setOpenForm(true);
    };

    const handleDelete = (revista) => {
        setDeleteDialog({ open: true, revista });
    };

    const confirmDelete = async () => {
        try {
            await revistaService.delete(deleteDialog.revista.id);
            toast.success('Revista eliminada exitosamente');
            loadRevistas();
        } catch (error) {
            console.error('Error deleting revista:', error);
            toast.error('Error al eliminar la revista');
        } finally {
            setDeleteDialog({ open: false, revista: null });
        }
    };

    const handleFormClose = () => {
        setOpenForm(false);
        setEditingRevista(null);
        loadRevistas();
    };

    const handleAddNew = () => {
        setEditingRevista(null);
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
                        Gestión de Revistas
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
                        <TextField
                            fullWidth
                            placeholder="Buscar revistas por título, autor, categoría, editorial o ISSN..."
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
                            Nueva Revista
                        </Button>
                    </Box>
                </Box>

                {filteredRevistas.length === 0 ? (
                    <Alert severity="info" sx={{ mt: 2 }}>
                        {searchTerm ? 'No se encontraron revistas que coincidan con la búsqueda' : 'No hay revistas registradas'}
                    </Alert>
                ) : (
                    <Grid container spacing={3}>
                        <AnimatePresence>
                            {filteredRevistas.map((revista, index) => (
                                <Grid item xs={12} sm={6} md={4} key={revista.id}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                    >
                                        <RevistaCard
                                            revista={revista}
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

                <RevistaForm
                    open={openForm}
                    onClose={handleFormClose}
                    revista={editingRevista}
                />

                <ConfirmDialog
                    open={deleteDialog.open}
                    title="Confirmar eliminación"
                    message={`¿Estás seguro de que deseas eliminar la revista "${deleteDialog.revista?.titulo}"?`}
                    onConfirm={confirmDelete}
                    onCancel={() => setDeleteDialog({ open: false, revista: null })}
                />
            </motion.div>
        </Container>
    );
};

export default RevistasList;