import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';

const StyledPaper = styled(Paper)({
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
  backgroundColor: '#4caf50',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#45a049',
  },
});

const Reservation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const flight = useSelector(state => 
    state.vols.list.find(vol => vol.id === id)
  );

  if (!flight) {
    return <Typography>Réservation non trouvée</Typography>;
  }

  // Calcul du total des services sélectionnés
  const totalServices = flight.services ? flight.services.reduce((sum, service) => sum + service.prix, 0) : 0;
  const totalPrice = flight.prix + totalServices;

  const handleConfirm = () => {
    alert('Réservation confirmée avec succès !');
    navigate('/');
  };

  return (
    <Box sx={{ background: 'linear-gradient(135deg, #1e3c72, #2a5298)', minHeight: '100vh', p: 3 }}>
      <StyledPaper>
        <Typography variant="h5" gutterBottom>
          Récapitulatif de la réservation
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Détails du vol"
              secondary={`${flight.villeDepart} → ${flight.villeArrivee}`}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Date"
              secondary={flight.date}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Prix du billet"
              secondary={`${flight.prix} DH`}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Services sélectionnés"
            />
          </ListItem>
          {flight.services && flight.services.map((service, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={service.name}
                secondary={`${service.prix} DH`}
              />
            </ListItem>
          ))}
          <Divider />
          <ListItem>
            <ListItemText
              primary="Total à payer"
              secondary={`${totalPrice} DH`}
            />
          </ListItem>
        </List>
        <Box sx={{ mt: 3 }}>
          <ConfirmButton
            variant="contained"
            fullWidth
            onClick={handleConfirm}
          >
            Confirmer la réservation
          </ConfirmButton>
        </Box>
      </StyledPaper>
    </Box>
  );
};

export default Reservation;
