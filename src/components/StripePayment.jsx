import React, { useState } from "react";
import { CardElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import { Box, Button, Typography, TextField, Paper, CircularProgress } from "@mui/material";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

// Chargez votre clé publique Stripe ici
const stripePromise = loadStripe('pk_test_51QeNOfQGxVOBb8nPjIuoMIqD9VmEIySDJaPl65DNY8o36mLbK85nx6quIXbplhwoykp8eAvmyRVv1WfTClwBRfZp00x5zxvlq4'); // Remplacez par votre clé publique

const StripePayment = ({ clientSecret, onSuccess, totalPrice, flight }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [fullName, setFullName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  // Format the total price in MAD
  const formattedPrice = new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: 'MAD',
  }).format(totalPrice);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements || !fullName) {
      setError('Veuillez entrer votre nom complet');
      setIsProcessing(false);
      return;
    }

    try {
      // Envoyer le nom complet au backend avec le montant et la description
      const response = await axios.post('http://localhost:3000/api/checkout', {
        amount: totalPrice,
        currency: 'mad', // Vous pouvez ajuster la devise si nécessaire
        description: 'Vol réservé',
        fullName: fullName, // Nom complet de l'utilisateur
      });

      const { clientSecret } = response.data;

      // Confirmer le paiement avec Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: fullName,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        setIsProcessing(false);
      } else {
        setError(null);
        onSuccess();
      }
    } catch (err) {
      setError('Une erreur est survenue lors du paiement');
      setIsProcessing(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Paiement sécurisé
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Nom complet"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          margin="normal"
        />
        <Box sx={{ mt: 2, mb: 2 }}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </Box>
        <Typography variant="body1" gutterBottom>
          Total à payer: {formattedPrice}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Vol: {flight.villeDepart} → {flight.villeArrivee}
        </Typography>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={!stripe || isProcessing}
          sx={{ mt: 2 }}
        >
          {isProcessing ? 'Traitement...' : `Payer ${formattedPrice}`}
        </Button>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </form>
    </Paper>
  );
};

// Composant wrapper pour charger Stripe
const StripeWrapper = ({ clientSecret, onSuccess, totalPrice, flight }) => {
  return (
    <Elements stripe={stripePromise}>
      <StripePayment
        clientSecret={clientSecret}
        onSuccess={onSuccess}
        totalPrice={totalPrice}
        flight={flight}
      />
    </Elements>
  );
};

export default StripeWrapper;
