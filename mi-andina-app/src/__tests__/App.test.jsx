import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { CartProvider } from '../contexts/CartContext';
import Header from '../components/layout/Header';
import Home from '../pages/Home';
import Notifications from '../pages/Notifications';
import Cart from '../pages/Cart';
import NotFound from '../pages/NotFound';
import theme from '../styles/theme';

// Componente de prueba que simula App pero sin el Router wrapper
const TestApp = () => (
  <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/notificaciones" element={<Notifications />} />
      <Route path="/carrito" element={<Cart />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Box>
);

// Helper para renderizar con router y theme
const renderWithRouter = (initialEntries = ['/']) => {
  return render(
    <CartProvider>
      <MemoryRouter initialEntries={initialEntries}>
        <ThemeProvider theme={theme}>
          <TestApp />
        </ThemeProvider>
      </MemoryRouter>
    </CartProvider>
  );
};

describe('App Routing', () => {
  test('debe navegar a Home por defecto', () => {
    renderWithRouter(['/']);
    
    // Verificar que estamos en la página Home
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  test('debe navegar a /notificaciones', () => {
    renderWithRouter(['/notificaciones']);
    
    // Verificar que estamos en la página de notificaciones
    expect(screen.getByTestId('notifications-page')).toBeInTheDocument();
  });

  test('debe navegar a /carrito', () => {
    renderWithRouter(['/carrito']);
    
    // Verificar que estamos en la página del carrito
    expect(screen.getByTestId('cart-page')).toBeInTheDocument();
  });

  test('debe mantener el Header en todas las rutas', () => {
    renderWithRouter(['/']);
    
    // Verificar que el Header está presente
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    
    // Verificar elementos específicos del header
    expect(screen.getByTestId('menu-button')).toBeInTheDocument();
    expect(screen.getByTestId('notifications-button')).toBeInTheDocument();
    expect(screen.getByTestId('cart-button')).toBeInTheDocument();
  });

  test('debe mostrar página 404 para rutas no encontradas', () => {
    renderWithRouter(['/ruta-inexistente']);
    
    // Verificar que se muestra la página 404
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText(/página no encontrada/i)).toBeInTheDocument();
  });
}); 