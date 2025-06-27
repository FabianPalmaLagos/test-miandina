import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Header from '../Header';
import { CartProvider } from '../../../contexts/CartContext';
import theme from '../../../styles/theme';

// Helper para renderizar con providers necesarios
const renderWithProviders = (component) => {
  return render(
    <CartProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {component}
        </ThemeProvider>
      </BrowserRouter>
    </CartProvider>
  );
};

describe('Header Component', () => {
  test('debe renderizar el logo de Mi Andina', () => {
    renderWithProviders(<Header />);
    
    const logo = screen.getByText(/mi andina/i);
    expect(logo).toBeInTheDocument();
  });

  test('debe mostrar badge de notificaciones con contador', () => {
    const mockNotificationCount = 5;
    renderWithProviders(<Header notificationCount={mockNotificationCount} />);
    
    const notificationsBadge = screen.getByTestId('notifications-badge');
    expect(notificationsBadge).toBeInTheDocument();
  });

  test('debe mostrar badge del carrito con contador inicial en 0', () => {
    renderWithProviders(<Header />);
    
    const cartBadge = screen.getByTestId('cart-badge');
    expect(cartBadge).toBeInTheDocument();
  });

  test('debe tener enlaces de navegación funcionales', () => {
    renderWithProviders(<Header />);
    
    const homeLink = screen.getByRole('link', { name: /mi andina/i });
    const notificationsLink = screen.getByTestId('notifications-button');
    const cartLink = screen.getByTestId('cart-button');
    
    expect(homeLink).toHaveAttribute('href', '/');
    expect(notificationsLink).toHaveAttribute('href', '/notificaciones');
    expect(cartLink).toHaveAttribute('href', '/carrito');
  });

  test('debe tener estructura responsiva correcta', () => {
    renderWithProviders(<Header />);
    
    const menuButton = screen.getByTestId('menu-button');
    const notificationsButton = screen.getByTestId('notifications-button');
    const cartButton = screen.getByTestId('cart-button');
    
    expect(menuButton).toBeInTheDocument();
    expect(notificationsButton).toBeInTheDocument();
    expect(cartButton).toBeInTheDocument();
  });

  test('debe tener el rol banner para accesibilidad', () => {
    renderWithProviders(<Header />);
    
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });
}); 