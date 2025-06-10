import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Box
} from '@mui/material';
import {
    Menu as MenuIcon,
    LibraryBooks as LibraryIcon
} from '@mui/icons-material';

const Navbar = ({ onMenuClick }) => {
    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onMenuClick}
                    edge="start"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>

                <LibraryIcon sx={{ mr: 2 }} />

                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    Biblioteca Digital
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ mr: 2 }}>
                        Sistema de Gestión
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;