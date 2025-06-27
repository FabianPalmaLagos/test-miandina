import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          textAlign: 'center',
        }}
      >
        <Typography variant="h1" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Página no encontrada
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Lo sentimos, la página que buscas no existe.
        </Typography>
        <Button 
          component={Link} 
          to="/" 
          variant="contained" 
          color="primary"
        >
          Volver al Inicio
        </Button>
      </Box>
    </Container>
  );
}

export default NotFound; 