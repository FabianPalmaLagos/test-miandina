import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Header from '../Header';
import theme from '../../../styles/theme';

// Helper para renderizar con providers necesarios
const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('Header Component', () => {
  test('debe renderizar el logo de Mi Andina', () => {
    renderWithProviders(<Header />);
    
    const logo = screen.getByText(/mi andina/i);
    expect(logo).toBeInTheDocument();
  });

  test('debe mostrar badge de notificaciones con contador', () => {
    const mockNotificationCount = 3;
    renderWithProviders(<Header notificationCount={mockNotificationCount} />);
    
    const notificationBadge = screen.getByTestId('notification-badge');
    expect(notificationBadge).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('debe mostrar badge del carrito con contador', () => {
    const mockCartCount = 5;
    renderWithProviders(<Header cartCount={mockCartCount} />);
    
    const cartBadge = screen.getByTestId('cart-badge');
    expect(cartBadge).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('debe mostrar icono de menú hamburguesa', () => {
    renderWithProviders(<Header />);
    
    const menuButton = screen.getByTestId('menu-button');
    expect(menuButton).toBeInTheDocument();
  });

  test('debe ser responsivo en móvil', () => {
    renderWithProviders(<Header />);
    
    const header = screen.getByRole('banner');
    expect(header).toHaveStyle({
      position: 'sticky',
      top: '0'
    });
  });

  test('debe navegar al hacer clic en el logo', () => {
    renderWithProviders(<Header />);
    
    const logoButton = screen.getByTestId('logo-button');
    expect(logoButton).toHaveAttribute('href', '/');
  });
}); 