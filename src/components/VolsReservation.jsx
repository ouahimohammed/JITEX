import React from 'react';
import ReactDOM from 'react-dom/client';
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
  Stack,
} from '@mui/material';
import { Download, Check } from '@mui/icons-material';
import { jsPDF } from 'jspdf';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)({
  padding: '24px',
  marginBottom: '24px',
  background: 'rgba(255, 255, 255, 0.1)',  
  borderRadius: '16px',
  backdropFilter: 'blur(10px)', 
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',  
  border: '1px solid rgba(255, 255, 255, 0.3)',  
  color: '#000',  
});

const VolsReservation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const flight = useSelector((state) =>
    state.vols.list.find((vol) => vol.id === id)
  );

  if (!flight) {
    return (
      <Typography color="error" align="center" sx={{ mt: 3 }}>
        Réservation non trouvée
      </Typography>
    );
  }

  const totalServices = flight.services.reduce(
    (sum, service) => sum + service.prix,
    0
  );
  const totalPrice = flight.prix + totalServices;

  const handlePrint = () => {
    const doc = new jsPDF();
    const logoUrl = '/logoo.png';
    
    // Add logo
    doc.addImage(logoUrl, 'PNG', 20, 10, 50, 20);
    
    // Header
    doc.setFontSize(24);
    doc.setTextColor(0, 114, 255); // Blue color for "Invoice"
    doc.text('Invoice', 20, 50);
    
    // Billing info
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100); // Gray color for labels
    doc.text('Billing to:', 20, 65);
    doc.setTextColor(0, 0, 0); // Black color for values
    doc.text('JETEX Airlines', 20, 70);
    doc.text('Service de Réservation', 20, 75);
    
    // Invoice details
    doc.setTextColor(100, 100, 100);
    doc.text('Invoice number', 140, 65);
    doc.text('Date', 140, 75);
    
    doc.setTextColor(0, 0, 0);
    doc.text(`#${flight.id}-${Date.now().toString().slice(-4)}`, 140, 70);
    doc.text(flight.date, 140, 80);
    
    // Table headers
    doc.setFillColor(249, 250, 251); // Light gray background
    doc.rect(20, 90, 170, 10, 'F');
    doc.setTextColor(100, 100, 100);
    doc.text('Description', 25, 96);
    doc.text('Prix', 100, 96);
    doc.text('Qty.', 130, 96);
    doc.text('Total', 160, 96);
    
    // Flight details
    let yPos = 106;
    doc.setTextColor(0, 0, 0);
    
    // Vol de base
    doc.text(`Vol: ${flight.villeDepart} → ${flight.villeArrivee}`, 25, yPos);
    doc.text(`${flight.prix} DH`, 100, yPos);
    doc.text('1', 130, yPos);
    doc.text(`${flight.prix} DH`, 160, yPos);
    
    // Services
    if (flight.services && flight.services.length > 0) {
      flight.services.forEach((service) => {
        yPos += 10;
        doc.text(service.name, 25, yPos);
        doc.text(`${service.prix} DH`, 100, yPos);
        doc.text('1', 130, yPos);
        doc.text(`${service.prix} DH`, 160, yPos);
      });
    }
    
    // Totals section
    yPos += 20;
    doc.setDrawColor(230, 230, 230);
    doc.line(100, yPos, 190, yPos);
    
    // Subtotal
    yPos += 10;
    doc.setTextColor(100, 100, 100);
    doc.text('Subtotal', 100, yPos);
    doc.setTextColor(0, 0, 0);
    doc.text(`${flight.prix} DH`, 160, yPos);
    
    // Services total
    yPos += 10;
    doc.setTextColor(100, 100, 100);
    doc.text('Services', 100, yPos);
    doc.setTextColor(0, 0, 0);
    const servicesTotal = flight.services.reduce((sum, service) => sum + service.prix, 0);
    doc.text(`${servicesTotal} DH`, 160, yPos);
    
    // Total
    yPos += 15;
    doc.setFontSize(14);
    doc.setTextColor(0, 114, 255);
    doc.text('Total', 100, yPos);
    doc.text(`${totalPrice} DH`, 160, yPos);
    
    // Payment info
    yPos += 30;
    doc.setFontSize(14);
    doc.setTextColor(0, 114, 255);
    doc.text('Payment info.', 20, yPos);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    yPos += 10;
    doc.text('Mode de paiement: Carte bancaire', 20, yPos);
    yPos += 5;
    doc.text('Statut: Payé', 20, yPos);
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('Merci de votre confiance - JETEX Airlines', 20, 280);
    
    // Save the PDF
    doc.save(`JETEX_Invoice_${flight.id}.pdf`);
  };
  const handleConfirm = () => {
    alert('Réservation confirmée avec succès !');
    navigate('/');
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg,rgb(244, 244, 244),rgb(238, 240, 243))',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 3,
      }}
    >
      <StyledPaper>
        <Typography variant="h5" gutterBottom align="center">
          JETEX - Confirmation de Réservation
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          align="center"
          sx={{ mb: 4 }}
        >
          Numéro de réservation: {flight.id}-{Date.now().toString().slice(-4)}
        </Typography>

        <List>
          <ListItem>
            <ListItemText
              primary="Détails du vol"
              secondary={`${flight.villeDepart} → ${flight.villeArrivee}`}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Date" secondary={flight.date} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Prix du billet"
              secondary={`${flight.prix} DH`}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Services sélectionnés" />
          </ListItem>
          {flight.services.map((service, index) => (
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

        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<Check />}
            sx={{ bgcolor: '#4caf50', '&:hover': { bgcolor: '#45a049' } }}
            onClick={handleConfirm}
          >
            Confirmer la réservation
          </Button>
          <Button
            variant="contained"
            fullWidth
            startIcon={<Download />}
            onClick={handlePrint}
            sx={{
              bgcolor: '#2196f3',
              '&:hover': { bgcolor: '#1976d2' },
            }}
          >
            Imprimer le reçu
          </Button>
        </Stack>
      </StyledPaper>
    </Box>
  );
};

export default VolsReservation;
