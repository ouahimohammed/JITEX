import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
} from '@mui/material';
import { Check } from '@mui/icons-material';
import React from 'react';
import ReactDOM from 'react-dom/client';
const services = [
  { id: 'repas', name: 'Repas', prix: 200 },
  { id: 'bagages', name: 'Bagages supplémentaires', prix: 500 },
  { id: 'siege', name: 'Siège premium', prix: 1000 },
  { id: 'wifi', name: 'Wifi-à-bord', prix: 150 },
];

const VolsServices = ({ volId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedServices, setSelectedServices] = useState([]);

  const handleServiceChange = (serviceId) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(serviceId)
        ? prevSelected.filter((id) => id !== serviceId)
        : [...prevSelected, serviceId]
    );
  };

  const handleConfirm = () => {
    const servicesToAdd = selectedServices.map(serviceId => 
      services.find(service => service.id === serviceId)
    );
    
    dispatch({
      type: 'AJOUTER_SERVICES',
      payload: {
        volId,
        services: servicesToAdd,
      },
    });
    navigate(`/reservation/${volId}`);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Services disponibles
      </Typography>
      <FormGroup>
        {services.map(({ id, name, prix }) => (
          <FormControlLabel
            key={id}
            control={
              <Checkbox
                checked={selectedServices.includes(id)}
                onChange={() => handleServiceChange(id)}
              />
            }
            label={`${name} (+${prix} DH)`}
          />
        ))}
      </FormGroup>

      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 2,
          background: 'linear-gradient(to right, #2196f3, #21cbf3)',
          '&:hover': {
            background: 'linear-gradient(to right, #1976d2, #0288d1)',
          },
        }}
        onClick={handleConfirm}
        startIcon={<Check />}
      >
        Confirmer la sélection
      </Button>
    </Box>
  );
};

export default VolsServices;

