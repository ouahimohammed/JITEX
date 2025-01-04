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
import { fetchVols } from '../actions/volsActions';
import React from 'react';
import ReactDOM from 'react-dom/client';

const VolsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredFlights, setFilteredFlights] = useState([]);
  const { list: flights, loading, error } = useSelector(state => state.vols);

  useEffect(() => {
    dispatch(fetchVols());
  }, [dispatch]);

  useEffect(() => {
    if (flights) {
      filterFlights();
    }
  }, [flights, startDate, endDate]);

  const filterFlights = () => {
    if (!startDate && !endDate) {
      setFilteredFlights(flights);
      return;
    }

    const filtered = flights.filter(flight => {
      const flightDate = new Date(flight.date.split('-').reverse().join('-'));
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && end) {
        return flightDate >= start && flightDate <= end;
      } else if (start) {
        return flightDate >= start;
      } else if (end) {
        return flightDate <= end;
      }
      return true;
    });

    setFilteredFlights(filtered);
  };

  const handleSearch = () => {
    filterFlights();
  };

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
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ 
        p: 3, 
        mb: 4, 
        bgcolor: 'rgba(255, 255, 255, 0.1)', 
        backdropFilter: 'blur(10px)', 
        borderRadius: '8px', 
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' 
      }}>
        <Typography variant="h5" sx={{ mb: 3, color: '#000' }}>
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
              sx={{ input: { color: '#000' }, '& .MuiInputLabel-root': { color: '#000' } }}
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
              sx={{ input: { color: '#000' }, '& .MuiInputLabel-root': { color: '#000' } }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              fullWidth
              variant="contained"
              sx={{ 
                height: '56px', 
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', 
                color: '#fff',
                '&:hover': { 
                  background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)' 
                } 
              }}
              onClick={handleSearch}
            >
              Rechercher
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {filteredFlights.length > 0 ? (
          filteredFlights.map((flight) => (
            <Grid item xs={12} sm={6} md={4} key={flight.id}>
              <Card sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'rgba(255, 255, 255, 0.1)', 
                backdropFilter: 'blur(10px)', 
                borderRadius: '8px', 
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={'/vol.png'}
                  alt={`Vol ${flight.id}`}
                />
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#000' }}>
                    {flight.villeDepart} → {flight.villeArrivee}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" gutterBottom>
                    Prix : {flight.prix} DH
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Date : {flight.date}
                  </Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ 
                      mt: 2,
                      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                      color: '#fff',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)'
                      }
                    }}
                    onClick={() => handleReserve(flight.id)}
                  >
                    Réserver
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Alert severity="info" sx={{ color: '#fff' }}>
              Aucun vol disponible pour les dates sélectionnées.
            </Alert>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default VolsList;
