import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Paper, Typography, Grid, CircularProgress } from '@mui/material';
import VolsServices from './VolsServices';
import React from 'react';
import ReactDOM from 'react-dom/client';

const VolsDetails = () => {
  const { id } = useParams();
  const { list: flights, loading, error } = useSelector((state) => state.vols);
  const flight = flights.find((vol) => vol.id === id);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography color="error" variant="h6">
          Une erreur sest produite : {error}
        </Typography>
      </Box>
    );
  }

  if (!flight) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography color="textSecondary" variant="h6">
          Vol non trouvé. ID: {id}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg,rgb(239, 242, 244),rgb(240, 242, 246))',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 3,
      }}
    >
      <Box sx={{ maxWidth: '800px', width: '100%' }}>
        <Paper
          sx={{
            p: 3,
            mb: 3,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            color: '#000',
          }}
        >
          <Typography variant="h5" gutterBottom align="center">
            Détails du vol {flight.id}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography gutterBottom>
                <strong>De :</strong> {flight.villeDepart}
              </Typography>
              <Typography gutterBottom>
                <strong>À :</strong> {flight.villeArrivee}
              </Typography>
              <Typography gutterBottom>
                <strong>Date :</strong> {flight.date}
              </Typography>
              <Typography gutterBottom>
                <strong>Prix de base :</strong> {flight.prix} DH
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <VolsServices volId={id} />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default VolsDetails;
