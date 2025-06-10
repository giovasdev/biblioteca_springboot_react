import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Skeleton,
    IconButton
} from '@mui/material';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon, color, loading, path }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (path && path !== '/') {
            navigate(path);
        }
    };

    if (loading) {
        return (
            <Card sx={{ borderRadius: 2 }}>
                <CardContent>
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="40%" height={40} />
                </CardContent>
            </Card>
        );
    }

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <Card
                sx={{
                    borderRadius: 2,
                    cursor: path && path !== '/' ? 'pointer' : 'default',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        boxShadow: path && path !== '/' ? 4 : 2,
                    },
                }}
                onClick={handleClick}
            >
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box>
                            <Typography variant="h4" component="div" fontWeight="bold" color={color}>
                                {value.toLocaleString()}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                {title}
                            </Typography>
                        </Box>
                        <IconButton
                            sx={{
                                backgroundColor: `${color}20`,
                                color: color,
                                '&:hover': {
                                    backgroundColor: `${color}30`,
                                },
                            }}
                        >
                            {icon}
                        </IconButton>
                    </Box>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default StatsCard;