import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';

const GlassPaper = styled(Paper)({
  padding: '24px',
  marginBottom: '24px',
  background: 'rgba(255, 255, 255, 0.1)',   
  borderRadius: '16px',
  backdropFilter: 'blur(10px)',  
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)', 
  border: '1px solid rgba(255, 255, 255, 0.3)', 
  color: '#fff', 
});

const ConfirmButton = styled(Button)({
  backgroundColor: '#ffc107',
  color: '#000',
  '&:hover': {
    backgroundColor: '#ffb300',
  },
  marginTop: '16px',
});

const services = [
  { id: 'repas', name: 'Repas', prix: 200 },
  { id: 'bagages', name: 'Bagages supplémentaires', prix: 500 },
  { id: 'siege', name: 'Siège premium', prix: 1000 },
  { id: 'wifi', name: 'Wifi-à-bord', prix: 150 },
];

const FlightDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const flight = useSelector((state) =>
    state.vols.list.find((vol) => vol.id === id)
  );
  const [selectedServices, setSelectedServices] = useState([]);

  if (!flight) {
    return (
      <Typography color="error" align="center" sx={{ mt: 3 }}>
        Vol non trouvé
      </Typography>
    );
  }

  const handleServiceChange = (service) => {
    const isSelected = selectedServices.some((s) => s.id === service.id);
    if (isSelected) {
      setSelectedServices(selectedServices.filter((s) => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleConfirm = () => {
    dispatch({
      type: 'AJOUTER_SERVICE',
      payload: {
        volId: id,
        service: selectedServices,
      },
    });
    navigate(`/reservation/${id}`);
  };

  const totalServices = selectedServices.reduce(
    (sum, service) => sum + service.prix,
    0
  );
  const totalPrice = flight.prix + totalServices;

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg,rgb(243, 244, 245),rgb(242, 245, 248))',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 3,
      }}
    >
      <Box sx={{ maxWidth: '800px', width: '100%' }}>
        <GlassPaper>
          <Typography variant="h5" gutterBottom align="center">
            Détails du vol {flight.id}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>
                <strong>De :</strong> {flight.villeDepart}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>À :</strong> {flight.villeArrivee}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Date :</strong> {flight.date}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Prix de base :</strong> {flight.prix} DH
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Services disponibles
              </Typography>
              <FormGroup>
                {services.map((service) => (
                  <FormControlLabel
                    key={service.id}
                    control={
                      <Checkbox
                        checked={selectedServices.some(
                          (s) => s.id === service.id
                        )}
                        onChange={() => handleServiceChange(service)}
                      />
                    }
                    label={`${service.name} (+${service.prix} DH)`}
                  />
                ))}
              </FormGroup>
            </Grid>
          </Grid>
        </GlassPaper>

        <GlassPaper>
          <Typography variant="h6" gutterBottom>
            Récapitulatif
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Prix du vol :</strong> {flight.prix} DH
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Services additionnels :</strong> {totalServices} DH
          </Typography>
          <Typography variant="h6" gutterBottom>
            <strong>Total à payer :</strong> {totalPrice} DH
          </Typography>
          <ConfirmButton
            variant="contained"
            fullWidth
            onClick={handleConfirm}
          >
            Confirmer la réservation
          </ConfirmButton>
        </GlassPaper>
      </Box>
    </Box>
  );
};

export default FlightDetails;
