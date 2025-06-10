import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Box,
    Typography
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    MenuBook as BookIcon,
    Article as MagazineIcon,
    Movie as DVDIcon
} from '@mui/icons-material';
import { ROUTES } from '../../utils/constants';

const drawerWidth = 240;

const menuItems = [
    {
        text: 'Dashboard',
        icon: <DashboardIcon />,
        path: ROUTES.DASHBOARD
    },
    {
        text: 'Libros',
        icon: <BookIcon />,
        path: ROUTES.LIBROS
    },
    {
        text: 'Revistas',
        icon: <MagazineIcon />,
        path: ROUTES.REVISTAS
    },
    {
        text: 'DVDs',
        icon: <DVDIcon />,
        path: ROUTES.DVDS
    }
];

const Sidebar = ({ open, onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (path) => {
        navigate(path);
        onClose();
    };

    const drawer = (
        <Box>
            <Box sx={{ p: 2, mt: 8 }}>
                <Typography variant="h6" color="primary" fontWeight="bold">
                    Navegación
                </Typography>
            </Box>
            <Divider />
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            selected={location.pathname === item.path}
                            onClick={() => handleNavigation(item.path)}
                            sx={{
                                '&.Mui-selected': {
                                    backgroundColor: 'primary.light',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'primary.main',
                                    },
                                    '& .MuiListItemIcon-root': {
                                        color: 'white',
                                    },
                                },
                            }}
                        >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Drawer
            variant="temporary"
            open={open}
            onClose={onClose}
            ModalProps={{
                keepMounted: true,
            }}
            sx={{
                '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    width: drawerWidth,
                },
            }}
        >
            {drawer}
        </Drawer>
    );
};

export default Sidebar;