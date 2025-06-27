import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { CartProvider } from './contexts/CartContext';
import Header from './components/layout/Header';
import Home from './pages/Home';
import Notifications from './pages/Notifications';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

function App() {
  return (
    <CartProvider>
      <Router>
        <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
          <Header notificationCount={3} cartCount={5} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notificaciones" element={<Notifications />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </Router>
    </CartProvider>
  );
}

export default App;
