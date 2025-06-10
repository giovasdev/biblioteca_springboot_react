import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/common/Layout';
import Dashboard from './components/dashboard/Dashboard';
import LibrosList from './components/libros/LibrosList';
import RevistasList from './components/revistas/RevistasList';
import DVDsList from './components/dvds/DVDsList';
import { ROUTES } from './utils/constants';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
                    <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                    <Route path={ROUTES.LIBROS} element={<LibrosList />} />
                    <Route path={ROUTES.REVISTAS} element={<RevistasList />} />
                    <Route path={ROUTES.DVDS} element={<DVDsList />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;