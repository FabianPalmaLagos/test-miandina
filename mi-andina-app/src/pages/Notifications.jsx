import { Container, Typography, Box } from '@mui/material';

function Notifications() {
  return (
    <Container maxWidth="lg" data-testid="notifications-page">
      <Box sx={{ py: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          🔔 Notificaciones
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Página de notificaciones de Mi Andina E-Commerce
        </Typography>
      </Box>
    </Container>
  );
}

export default Notifications; 