import React from 'react';
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Box,
    Chip,
    IconButton,
    Tooltip
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Movie as MovieIcon,
    CalendarToday as CalendarIcon,
    Person as PersonIcon,
    AccessTime as TimeIcon,
    Category as CategoryIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const DVDCard = ({ dvd, onEdit, onDelete }) => {
    const formatDuration = (duration) => {
        if (!duration) return 'No especificado';
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        return hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;
    };

    const formatPrice = (price) => {
        return price ? `$${price.toLocaleString()}` : 'No especificado';
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <Card
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    '&:hover': {
                        '& .card-actions': {
                            opacity: 1,
                        },
                    },
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        opacity: 0,
                        transition: 'opacity 0.2s',
                    }}
                    className="card-actions"
                >
                    <Tooltip title="Editar">
                        <IconButton
                            size="small"
                            onClick={() => onEdit(dvd)}
                            sx={{ backgroundColor: 'rgba(255,255,255,0.9)', mr: 1 }}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                        <IconButton
                            size="small"
                            onClick={() => onDelete(dvd)}
                            sx={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
                            color="error"
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>

                <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <MovieIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="h6" component="h2" noWrap>
                            {dvd.titulo}
                        </Typography>
                    </Box>

                    {dvd.director && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <PersonIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary" noWrap>
                                <strong>Director:</strong> {dvd.director}
                            </Typography>
                        </Box>
                    )}

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CalendarIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                            {dvd.anoLanzamiento}
                        </Typography>
                    </Box>

                    {dvd.duracion && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <TimeIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                                {formatDuration(dvd.duracion)}
                            </Typography>
                        </Box>
                    )}

                    {dvd.actores && (
                        <Box sx={{ mt: 2, mb: 1 }}>
                            <Typography variant="body2" color="text.secondary" noWrap>
                                <strong>Actores:</strong> {dvd.actores}
                            </Typography>
                        </Box>
                    )}

                    {dvd.precio && (
                        <Typography variant="body2" color="text.secondary">
                            <strong>Precio:</strong> {formatPrice(dvd.precio)}
                        </Typography>
                    )}

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
                        {dvd.genero && (
                            <Chip
                                label={dvd.genero}
                                size="small"
                                color="primary"
                                variant="outlined"
                                icon={<CategoryIcon />}
                            />
                        )}
                        {dvd.clasificacion && (
                            <Chip
                                label={dvd.clasificacion}
                                size="small"
                                color="secondary"
                                variant="outlined"
                            />
                        )}
                        <Chip
                            label={dvd.disponible ? 'Disponible' : 'No disponible'}
                            size="small"
                            color={dvd.disponible ? 'success' : 'error'}
                            variant="filled"
                        />
                    </Box>
                </CardContent>

                <CardActions sx={{ pt: 0, justifyContent: 'space-between' }}>
                    <Button
                        size="small"
                        onClick={() => onEdit(dvd)}
                        startIcon={<EditIcon />}
                    >
                        Editar
                    </Button>
                    <Button
                        size="small"
                        color="error"
                        onClick={() => onDelete(dvd)}
                        startIcon={<DeleteIcon />}
                    >
                        Eliminar
                    </Button>
                </CardActions>
            </Card>
        </motion.div>
    );
};

export default DVDCard;