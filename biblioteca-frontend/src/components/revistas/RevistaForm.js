import React, { useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Grid,
    Box,
    Switch,
    FormControlLabel,
    Typography,
    IconButton
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { revistaSchema } from '../../utils/validationSchemas';
import { revistaService } from '../../services/revistaService';

const RevistaForm = ({ open, onClose, revista }) => {
    const isEditing = Boolean(revista);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(revistaSchema),
        defaultValues: {
            titulo: '',
            autor: '',
            anoPublicacion: new Date().getFullYear(),
            numeroEdicion: '',
            categoria: '',
            periodicidad: '',
            issn: '',
            precio: '',
            numeroPaginas: '',
            editorial: '',
            descripcion: '',
            disponible: true
        }
    });

    useEffect(() => {
        if (revista) {
            reset({
                titulo: revista.titulo || '',
                autor: revista.autor || '',
                anoPublicacion: revista.anoPublicacion || new Date().getFullYear(),
                numeroEdicion: revista.numeroEdicion || '',
                categoria: revista.categoria || '',
                periodicidad: revista.periodicidad || '',
                issn: revista.issn || '',
                precio: revista.precio || '',
                numeroPaginas: revista.numeroPaginas || '',
                editorial: revista.editorial || '',
                descripcion: revista.descripcion || '',
                disponible: revista.disponible !== undefined ? revista.disponible : true
            });
        } else {
            reset({
                titulo: '',
                autor: '',
                anoPublicacion: new Date().getFullYear(),
                numeroEdicion: '',
                categoria: '',
                periodicidad: '',
                issn: '',
                precio: '',
                numeroPaginas: '',
                editorial: '',
                descripcion: '',
                disponible: true
            });
        }
    }, [revista, reset]);

    const onSubmit = async (data) => {
        try {
            const formattedData = {
                ...data,
                anoPublicacion: parseInt(data.anoPublicacion),
                numeroEdicion: parseInt(data.numeroEdicion),
                precio: data.precio ? parseFloat(data.precio) : null,
                numeroPaginas: data.numeroPaginas ? parseInt(data.numeroPaginas) : null
            };

            if (isEditing) {
                await revistaService.update(revista.id, formattedData);
                toast.success('Revista actualizada exitosamente');
            } else {
                await revistaService.create(formattedData);
                toast.success('Revista creada exitosamente');
            }

            onClose();
        } catch (error) {
            console.error('Error saving revista:', error);
            toast.error(error.response?.data?.message || 'Error al guardar la revista');
        }
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: { borderRadius: 2 }
            }}
        >
            <DialogTitle sx={{ pb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">
                        {isEditing ? 'Editar Revista' : 'Nueva Revista'}
                    </Typography>
                    <IconButton onClick={handleClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <Controller
                                name="titulo"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Título *"
                                        fullWidth
                                        error={!!errors.titulo}
                                        helperText={errors.titulo?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Controller
                                name="numeroEdicion"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Número de Edición *"
                                        type="number"
                                        fullWidth
                                        error={!!errors.numeroEdicion}
                                        helperText={errors.numeroEdicion?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                name="autor"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Autor *"
                                        fullWidth
                                        error={!!errors.autor}
                                        helperText={errors.autor?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                name="anoPublicacion"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Año de Publicación *"
                                        type="number"
                                        fullWidth
                                        error={!!errors.anoPublicacion}
                                        helperText={errors.anoPublicacion?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                name="categoria"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Categoría"
                                        fullWidth
                                        error={!!errors.categoria}
                                        helperText={errors.categoria?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                name="periodicidad"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Periodicidad"
                                        fullWidth
                                        placeholder="Ej: Mensual, Semanal, Trimestral"
                                        error={!!errors.periodicidad}
                                        helperText={errors.periodicidad?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                name="issn"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="ISSN"
                                        fullWidth
                                        error={!!errors.issn}
                                        helperText={errors.issn?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                name="editorial"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Editorial"
                                        fullWidth
                                        error={!!errors.editorial}
                                        helperText={errors.editorial?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Controller
                                name="numeroPaginas"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Número de Páginas"
                                        type="number"
                                        fullWidth
                                        error={!!errors.numeroPaginas}
                                        helperText={errors.numeroPaginas?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Controller
                                name="precio"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Precio"
                                        type="number"
                                        fullWidth
                                        error={!!errors.precio}
                                        helperText={errors.precio?.message}
                                        InputProps={{
                                            startAdornment: '$'
                                        }}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="descripcion"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Descripción"
                                        multiline
                                        rows={3}
                                        fullWidth
                                        error={!!errors.descripcion}
                                        helperText={errors.descripcion?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="disponible"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={field.value}
                                                onChange={field.onChange}
                                                color="primary"
                                            />
                                        }
                                        label="Disponible"
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button onClick={handleClose} color="inherit">
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear')}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default RevistaForm;