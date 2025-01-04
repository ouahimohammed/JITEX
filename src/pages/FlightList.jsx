import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button,
  TextField,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { CheckCircle } from '@mui/icons-material';  
import { fetchVols } from '../actions/volsActions';
import React from 'react';
import ReactDOM from 'react-dom/client';

const SearchButton = styled(Button)({
  backgroundColor: '#ffc107',
  color: '#000',
  '&:hover': {
    backgroundColor: '#ffb300',
  },
});

const ReserveButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(to right, #2196f3, #21cbf3)',  
  color: '#fff',
  '&:hover': {
    background: 'linear-gradient(to right, #1976d2, #0288d1)',  
  },
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px 20px',
}));

const FlightCard = styled(Card)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#fff',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

const FlightList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { list: flights, loading, error } = useSelector(state => state.vols);

  useEffect(() => {
    dispatch(fetchVols());
  }, [dispatch]);

  const handleReserve = (flightId) => {
    navigate(`/flight/${flightId}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Paper 
        sx={{ 
          p: 3, 
          mb: 4, 
          backgroundColor: '#e3f2fd',
          borderRadius: '8px' 
        }}
      >
        <Typography variant="h5" component="h2" sx={{ mb: 3, color: '#333' }}>
          Liste des vols
        </Typography>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              type="date"
              label="Date de début"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              type="date"
              label="Date de fin"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <SearchButton
              fullWidth
              variant="contained"
              sx={{ height: '56px' }}
            >
              Rechercher
            </SearchButton>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {flights.map((flight) => (
          <Grid item xs={12} sm={6} md={4} key={flight.id}>
            <FlightCard>
              <CardMedia
                component="img"
                height="140"
                image={flight.image || "/placeholder.svg?height=140&width=280"}
                alt={`Vol ${flight.id}`}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {flight.villeDepart} → {flight.villeArrivee}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  Prix : {flight.prix} DH
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Date : {flight.date}
                </Typography>
                <ReserveButton
                  fullWidth
                  variant="contained"
                  onClick={() => handleReserve(flight.id)}
                  startIcon={<CheckCircle />}  
                >
                  Réserver
                </ReserveButton>
              </CardContent>
            </FlightCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FlightList;
