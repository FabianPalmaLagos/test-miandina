import { Container, Typography, Box } from '@mui/material';

function Cart() {
  return (
    <Container maxWidth="lg" data-testid="cart-page">
      <Box sx={{ py: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          🛒 Carrito de Compras
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Página del carrito de Mi Andina E-Commerce
        </Typography>
      </Box>
    </Container>
  );
}

export default Cart; 