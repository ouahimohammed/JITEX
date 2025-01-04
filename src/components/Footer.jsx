import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'rgba(255, 255, 255, 0.3)', 
        backdropFilter: 'blur(10px)', 
        borderTop: '1px solid #80cbc4', 
        py: 4, 
        mt: 4, 
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center">
          <Typography variant="body2" sx={{ color: '#00796b' }}>
            © 2024 JETEX. Tous droits réservés.
          </Typography>
          <Typography variant="body2" sx={{ color: '#004d40', mt: 1 }}>
             Mohamed Ouahi
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
