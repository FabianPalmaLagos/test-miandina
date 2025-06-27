import { Container, Typography, Box } from '@mui/material';

function Home() {
  return (
    <Container maxWidth="lg" data-testid="home-page">
      <Box sx={{ py: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          🏠 Home - Mi Andina
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Página principal de Mi Andina E-Commerce
        </Typography>
      </Box>
    </Container>
  );
}

export default Home; 