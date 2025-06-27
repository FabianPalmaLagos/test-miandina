import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Badge, 
  Box 
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Notifications as NotificationsIcon, 
  ShoppingCart as ShoppingCartIcon 
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';

function Header({ notificationCount = 0 }) {
  const { getCartItemsCount } = useCart();
  const cartCount = getCartItemsCount();

  return (
    <AppBar 
      position="sticky" 
      role="banner"
      sx={{ 
        backgroundColor: 'white',
        color: 'text.primary',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Menú hamburguesa */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          data-testid="menu-button"
          sx={{ color: 'primary.main' }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo centrado */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'center' }}>
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'none'
              }
            }}
          >
            Mi Andina
          </Typography>
        </Box>

        {/* Iconos a la derecha */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Badge de notificaciones */}
          <IconButton
            component={Link}
            to="/notificaciones"
            color="inherit"
            aria-label="notificaciones"
            data-testid="notifications-button"
            sx={{ color: 'text.primary' }}
          >
            <Badge 
              badgeContent={notificationCount} 
              color="error"
              data-testid="notifications-badge"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Badge del carrito */}
          <IconButton
            component={Link}
            to="/carrito"
            color="inherit"
            aria-label="carrito"
            data-testid="cart-button"
            sx={{ color: 'text.primary' }}
          >
            <Badge 
              badgeContent={cartCount} 
              color="primary"
              data-testid="cart-badge"
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header; 