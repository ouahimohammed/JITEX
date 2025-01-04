import { Outlet } from 'react-router-dom'; 
import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
const Layout = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4,gap: 30 }}>
        <img 
          src="/logoo.png" 
          alt="Logo" 
          style={{ width: '100px', height: '40px', marginRight: '16px', marginLeft: '40px' }} 
        />

          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              color: '#333',
              fontWeight: 'bold'
            }}
          >
            JETEX - Gestion des vols
          </Typography>
        </Box>
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layout;
