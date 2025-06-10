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
import { dvdService } from '../../services/dvdService';
import DVDCard from './DVDCard';
import DVDForm from './DVDForm';
import ConfirmDialog from '../common/ConfirmDialog';

const DVDsList = () => {
    const [dvds, setDvds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredDvds, setFilteredDvds] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [editingDvd, setEditingDvd] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState({ open: false, dvd: null });

    useEffect(() => {
        loadDvds();
    }, []);

    useEffect(() => {
        filterDvds();
    }, [dvds, searchTerm]);

    const loadDvds = async () => {
        try {
            setLoading(true);
            const response = await dvdService.getAll();
            setDvds(response.data);
        } catch (error) {
            console.error('Error loading DVDs:', error);
            toast.error('Error al cargar los DVDs');
        } finally {
            setLoading(false);
        }
    };

    const filterDvds = () => {
        if (!searchTerm.trim()) {
            setFilteredDvds(dvds);
        } else {
            const filtered = dvds.filter(dvd =>
                dvd.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                dvd.director?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                dvd.genero?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                dvd.clasificacion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                dvd.actores?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredDvds(filtered);
        }
    };

    const handleEdit = (dvd) => {
        setEditingDvd(dvd);
        setOpenForm(true);
    };

    const handleDelete = (dvd) => {
        setDeleteDialog({ open: true, dvd });
    };

    const confirmDelete = async () => {
        try {
            await dvdService.delete(deleteDialog.dvd.id);
            toast.success('DVD eliminado exitosamente');
            loadDvds();
        } catch (error) {
            console.error('Error deleting DVD:', error);
            toast.error('Error al eliminar el DVD');
        } finally {
            setDeleteDialog({ open: false, dvd: null });
        }
    };

    const handleFormClose = () => {
        setOpenForm(false);
        setEditingDvd(null);
        loadDvds();
    };

    const handleAddNew = () => {
        setEditingDvd(null);
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
                        Gestión de DVDs
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
                        <TextField
                            fullWidth
                            placeholder="Buscar DVDs por título, director, género, clasificación o actores..."
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
                            Nuevo DVD
                        </Button>
                    </Box>
                </Box>

                {filteredDvds.length === 0 ? (
                    <Alert severity="info" sx={{ mt: 2 }}>
                        {searchTerm ? 'No se encontraron DVDs que coincidan con la búsqueda' : 'No hay DVDs registrados'}
                    </Alert>
                ) : (
                    <Grid container spacing={3}>
                        <AnimatePresence>
                            {filteredDvds.map((dvd, index) => (
                                <Grid item xs={12} sm={6} md={4} key={dvd.id}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                    >
                                        <DVDCard
                                            dvd={dvd}
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

                <DVDForm
                    open={openForm}
                    onClose={handleFormClose}
                    dvd={editingDvd}
                />

                <ConfirmDialog
                    open={deleteDialog.open}
                    title="Confirmar eliminación"
                    message={`¿Estás seguro de que deseas eliminar el DVD "${deleteDialog.dvd?.titulo}"?`}
                    onConfirm={confirmDelete}
                    onCancel={() => setDeleteDialog({ open: false, dvd: null })}
                />
            </motion.div>
        </Container>
    );
};

export default DVDsList;