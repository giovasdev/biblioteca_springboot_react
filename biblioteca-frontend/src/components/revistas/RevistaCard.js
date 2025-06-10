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
    Article as MagazineIcon,
    CalendarToday as CalendarIcon,
    Person as PersonIcon,
    Business as BusinessIcon,
    Category as CategoryIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const RevistaCard = ({ revista, onEdit, onDelete }) => {
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
                            onClick={() => onEdit(revista)}
                            sx={{ backgroundColor: 'rgba(255,255,255,0.9)', mr: 1 }}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                        <IconButton
                            size="small"
                            onClick={() => onDelete(revista)}
                            sx={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
                            color="error"
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>

                <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <MagazineIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="h6" component="h2" noWrap>
                            {revista.titulo}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <PersonIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary" noWrap>
                            {revista.autor}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CalendarIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                            {revista.anoPublicacion}
                        </Typography>
                    </Box>

                    {revista.editorial && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <BusinessIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary" noWrap>
                                {revista.editorial}
                            </Typography>
                        </Box>
                    )}

                    <Box sx={{ mt: 2, mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Edición:</strong> #{revista.numeroEdicion}
                        </Typography>
                        {revista.issn && (
                            <Typography variant="body2" color="text.secondary">
                                <strong>ISSN:</strong> {revista.issn}
                            </Typography>
                        )}
                        {revista.periodicidad && (
                            <Typography variant="body2" color="text.secondary">
                                <strong>Periodicidad:</strong> {revista.periodicidad}
                            </Typography>
                        )}
                        {revista.precio && (
                            <Typography variant="body2" color="text.secondary">
                                <strong>Precio:</strong> {formatPrice(revista.precio)}
                            </Typography>
                        )}
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
                        {revista.categoria && (
                            <Chip
                                label={revista.categoria}
                                size="small"
                                color="primary"
                                variant="outlined"
                                icon={<CategoryIcon />}
                            />
                        )}
                        <Chip
                            label={revista.disponible ? 'Disponible' : 'No disponible'}
                            size="small"
                            color={revista.disponible ? 'success' : 'error'}
                            variant="filled"
                        />
                    </Box>
                </CardContent>

                <CardActions sx={{ pt: 0, justifyContent: 'space-between' }}>
                    <Button
                        size="small"
                        onClick={() => onEdit(revista)}
                        startIcon={<EditIcon />}
                    >
                        Editar
                    </Button>
                    <Button
                        size="small"
                        color="error"
                        onClick={() => onDelete(revista)}
                        startIcon={<DeleteIcon />}
                    >
                        Eliminar
                    </Button>
                </CardActions>
            </Card>
        </motion.div>
    );
};

export default RevistaCard;