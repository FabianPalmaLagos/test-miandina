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

function Header({ notificationCount = 0, cartCount = 0 }) {
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
        >
          <MenuIcon />
        </IconButton>

        {/* Logo centrado */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            data-testid="logo-button"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
              fontWeight: 'bold',
              '&:hover': {
                textDecoration: 'none',
              },
            }}
          >
            🛒 Mi Andina
          </Typography>
        </Box>

        {/* Iconos de la derecha */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          {/* Badge de notificaciones */}
          <IconButton
            color="inherit"
            component={Link}
            to="/notificaciones"
            data-testid="notification-badge"
          >
            <Badge badgeContent={notificationCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Badge del carrito */}
          <IconButton
            color="inherit"
            component={Link}
            to="/carrito"
            data-testid="cart-badge"
          >
            <Badge badgeContent={cartCount} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header; 