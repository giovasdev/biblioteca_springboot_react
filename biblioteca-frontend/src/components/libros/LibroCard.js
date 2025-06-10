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
    MenuBook as BookIcon,
    CalendarToday as CalendarIcon,
    Person as PersonIcon,
    Business as BusinessIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const LibroCard = ({ libro, onEdit, onDelete }) => {
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
                            onClick={() => onEdit(libro)}
                            sx={{ backgroundColor: 'rgba(255,255,255,0.9)', mr: 1 }}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                        <IconButton
                            size="small"
                            onClick={() => onDelete(libro)}
                            sx={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
                            color="error"
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>

                <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <BookIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="h6" component="h2" noWrap>
                            {libro.titulo}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <PersonIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary" noWrap>
                            {libro.autor}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CalendarIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                            {libro.anoPublicacion}
                        </Typography>
                    </Box>

                    {libro.editorial && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <BusinessIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary" noWrap>
                                {libro.editorial}
                            </Typography>
                        </Box>
                    )}

                    <Box sx={{ mt: 2, mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            <strong>ISBN:</strong> {libro.isbn}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Páginas:</strong> {libro.numeroPaginas}
                        </Typography>
                        {libro.precio && (
                            <Typography variant="body2" color="text.secondary">
                                <strong>Precio:</strong> {formatPrice(libro.precio)}
                            </Typography>
                        )}
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
                        {libro.genero && (
                            <Chip
                                label={libro.genero}
                                size="small"
                                color="primary"
                                variant="outlined"
                            />
                        )}
                        <Chip
                            label={libro.disponible ? 'Disponible' : 'No disponible'}
                            size="small"
                            color={libro.disponible ? 'success' : 'error'}
                            variant="filled"
                        />
                        {libro.stock && libro.stock > 0 && (
                            <Chip
                                label={`Stock: ${libro.stock}`}
                                size="small"
                                color="info"
                                variant="outlined"
                            />
                        )}
                    </Box>
                </CardContent>

                <CardActions sx={{ pt: 0, justifyContent: 'space-between' }}>
                    <Button
                        size="small"
                        onClick={() => onEdit(libro)}
                        startIcon={<EditIcon />}
                    >
                        Editar
                    </Button>
                    <Button
                        size="small"
                        color="error"
                        onClick={() => onDelete(libro)}
                        startIcon={<DeleteIcon />}
                    >
                        Eliminar
                    </Button>
                </CardActions>
            </Card>
        </motion.div>
    );
};

export default LibroCard;