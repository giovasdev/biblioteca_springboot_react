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
import { dvdSchema } from '../../utils/validationSchemas';
import { dvdService } from '../../services/dvdService';

const DVDForm = ({ open, onClose, dvd }) => {
    const isEditing = Boolean(dvd);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(dvdSchema),
        defaultValues: {
            titulo: '',
            director: '',
            anoLanzamiento: new Date().getFullYear(),
            genero: '',
            duracion: '',
            clasificacion: '',
            actores: '',
            sinopsis: '',
            precio: '',
            disponible: true
        }
    });

    useEffect(() => {
        if (dvd) {
            reset({
                titulo: dvd.titulo || '',
                director: dvd.director || '',
                anoLanzamiento: dvd.anoLanzamiento || new Date().getFullYear(),
                genero: dvd.genero || '',
                duracion: dvd.duracion || '',
                clasificacion: dvd.clasificacion || '',
                actores: dvd.actores || '',
                sinopsis: dvd.sinopsis || '',
                precio: dvd.precio || '',
                disponible: dvd.disponible !== undefined ? dvd.disponible : true
            });
        } else {
            reset({
                titulo: '',
                director: '',
                anoLanzamiento: new Date().getFullYear(),
                genero: '',
                duracion: '',
                clasificacion: '',
                actores: '',
                sinopsis: '',
                precio: '',
                disponible: true
            });
        }
    }, [dvd, reset]);

    const onSubmit = async (data) => {
        try {
            const formattedData = {
                ...data,
                anoLanzamiento: parseInt(data.anoLanzamiento),
                duracion: data.duracion ? parseInt(data.duracion) : null,
                precio: data.precio ? parseFloat(data.precio) : null
            };

            if (isEditing) {
                await dvdService.update(dvd.id, formattedData);
                toast.success('DVD actualizado exitosamente');
            } else {
                await dvdService.create(formattedData);
                toast.success('DVD creado exitosamente');
            }

            onClose();
        } catch (error) {
            console.error('Error saving DVD:', error);
            toast.error(error.response?.data?.message || 'Error al guardar el DVD');
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
                        {isEditing ? 'Editar DVD' : 'Nuevo DVD'}
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
                                name="anoLanzamiento"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Año de Lanzamiento *"
                                        type="number"
                                        fullWidth
                                        error={!!errors.anoLanzamiento}
                                        helperText={errors.anoLanzamiento?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                name="director"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Director"
                                        fullWidth
                                        error={!!errors.director}
                                        helperText={errors.director?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                name="genero"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Género"
                                        fullWidth
                                        error={!!errors.genero}
                                        helperText={errors.genero?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Controller
                                name="duracion"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Duración (minutos)"
                                        type="number"
                                        fullWidth
                                        error={!!errors.duracion}
                                        helperText={errors.duracion?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Controller
                                name="clasificacion"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Clasificación"
                                        fullWidth
                                        placeholder="Ej: PG-13, R, G"
                                        error={!!errors.clasificacion}
                                        helperText={errors.clasificacion?.message}
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
                                name="actores"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Actores Principales"
                                        fullWidth
                                        placeholder="Separados por comas"
                                        error={!!errors.actores}
                                        helperText={errors.actores?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="sinopsis"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Sinopsis"
                                        multiline
                                        rows={4}
                                        fullWidth
                                        error={!!errors.sinopsis}
                                        helperText={errors.sinopsis?.message}
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

export default DVDForm;