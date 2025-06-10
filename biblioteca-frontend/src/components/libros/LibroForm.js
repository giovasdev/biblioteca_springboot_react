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
import { libroSchema } from '../../utils/validationSchemas';
import { libroService } from '../../services/libroService';

const LibroForm = ({ open, onClose, libro }) => {
    const isEditing = Boolean(libro);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(libroSchema),
        defaultValues: {
            titulo: '',
            autor: '',
            anoPublicacion: new Date().getFullYear(),
            isbn: '',
            numeroPaginas: '',
            genero: '',
            editorial: '',
            idioma: '',
            precio: '',
            stock: 1,
            descripcion: '',
            disponible: true
        }
    });

    useEffect(() => {
        if (libro) {
            reset({
                titulo: libro.titulo || '',
                autor: libro.autor || '',
                anoPublicacion: libro.anoPublicacion || new Date().getFullYear(),
                isbn: libro.isbn || '',
                numeroPaginas: libro.numeroPaginas || '',
                genero: libro.genero || '',
                editorial: libro.editorial || '',
                idioma: libro.idioma || '',
                precio: libro.precio || '',
                stock: libro.stock || 1,
                descripcion: libro.descripcion || '',
                disponible: libro.disponible !== undefined ? libro.disponible : true
            });
        } else {
            reset({
                titulo: '',
                autor: '',
                anoPublicacion: new Date().getFullYear(),
                isbn: '',
                numeroPaginas: '',
                genero: '',
                editorial: '',
                idioma: '',
                precio: '',
                stock: 1,
                descripcion: '',
                disponible: true
            });
        }
    }, [libro, reset]);

    const onSubmit = async (data) => {
        try {
            const formattedData = {
                ...data,
                anoPublicacion: parseInt(data.anoPublicacion),
                numeroPaginas: parseInt(data.numeroPaginas),
                precio: data.precio ? parseFloat(data.precio) : null,
                stock: parseInt(data.stock)
            };

            if (isEditing) {
                await libroService.update(libro.id, formattedData);
                toast.success('Libro actualizado exitosamente');
            } else {
                await libroService.create(formattedData);
                toast.success('Libro creado exitosamente');
            }

            onClose();
        } catch (error) {
            console.error('Error saving libro:', error);
            toast.error(error.response?.data?.message || 'Error al guardar el libro');
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
                        {isEditing ? 'Editar Libro' : 'Nuevo Libro'}
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
                                name="isbn"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="ISBN *"
                                        fullWidth
                                        error={!!errors.isbn}
                                        helperText={errors.isbn?.message}
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
                                        label="Número de Páginas *"
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
                                name="idioma"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Idioma"
                                        fullWidth
                                        error={!!errors.idioma}
                                        helperText={errors.idioma?.message}
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

                        <Grid item xs={12} md={4}>
                            <Controller
                                name="stock"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Stock"
                                        type="number"
                                        fullWidth
                                        error={!!errors.stock}
                                        helperText={errors.stock?.message}
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

export default LibroForm;