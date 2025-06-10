import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    Typography,
    Box,
    Card,
    CardContent,
    Paper
} from '@mui/material';
import {
    MenuBook as BookIcon,
    Article as MagazineIcon,
    Movie as DVDIcon,
    LibraryBooks as TotalIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import StatsCard from './StatsCard';
import { libroService } from '../../services/libroService';
import { revistaService } from '../../services/revistaService';
import { dvdService } from '../../services/dvdService';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalLibros: 0,
        totalRevistas: 0,
        totalDVDs: 0,
        totalElementos: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            setLoading(true);

            // Cargar estadísticas de todos los elementos
            const [librosResponse, revistasResponse, dvdsResponse] = await Promise.all([
                libroService.getAll().catch(() => ({ data: [] })),
                revistaService.getAll().catch(() => ({ data: [] })),
                dvdService.getAll().catch(() => ({ data: [] }))
            ]);

            const totalLibros = librosResponse.data.length;
            const totalRevistas = revistasResponse.data.length;
            const totalDVDs = dvdsResponse.data.length;

            setStats({
                totalLibros,
                totalRevistas,
                totalDVDs,
                totalElementos: totalLibros + totalRevistas + totalDVDs
            });
        } catch (error) {
            console.error('Error loading stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const statsData = [
        {
            title: 'Total Libros',
            value: stats.totalLibros,
            icon: <BookIcon />,
            color: '#1976d2',
            path: '/libros'
        },
        {
            title: 'Total Revistas',
            value: stats.totalRevistas,
            icon: <MagazineIcon />,
            color: '#388e3c',
            path: '/revistas'
        },
        {
            title: 'Total DVDs',
            value: stats.totalDVDs,
            icon: <DVDIcon />,
            color: '#f57c00',
            path: '/dvds'
        },
        {
            title: 'Total Elementos',
            value: stats.totalElementos,
            icon: <TotalIcon />,
            color: '#7b1fa2',
            path: '/'
        }
    ];

    return (
        <Container maxWidth="lg">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                        Dashboard
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Resumen general del sistema de biblioteca
                    </Typography>
                </Box>

                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {statsData.map((stat, index) => (
                        <Grid item xs={12} sm={6} md={3} key={stat.title}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <StatsCard
                                    title={stat.title}
                                    value={stat.value}
                                    icon={stat.icon}
                                    color={stat.color}
                                    loading={loading}
                                    path={stat.path}
                                />
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Paper sx={{ p: 3, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Actividad Reciente
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Próximamente: Historial de actividades del sistema
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Acciones Rápidas
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Próximamente: Enlaces rápidos a funciones comunes
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </motion.div>
        </Container>
    );
};

export default Dashboard;