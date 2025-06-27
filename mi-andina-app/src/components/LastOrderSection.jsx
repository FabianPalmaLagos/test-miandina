import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Link,
  Skeleton,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getLastOrder } from '../services/productService';
import { useCart } from '../hooks/useCart';
import ProductoCard from './ProductoCard/ProductoCard';

const LastOrderSection = () => {
  const [lastOrder, setLastOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [repeatingOrder, setRepeatingOrder] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const loadLastOrder = async () => {
      try {
        setLoading(true);
        const data = await getLastOrder();
        setLastOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadLastOrder();
  }, []);

  const handleRepeatOrder = async () => {
    if (!lastOrder?.products) return;

    try {
      setRepeatingOrder(true);
      
      // Add all products from last order to cart
      for (const item of lastOrder.products) {
        addToCart(item.product, item.quantity);
      }
      
      const totalItems = lastOrder.products.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = lastOrder.products.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      
      setSnackbar({
        open: true,
        message: `Pedido repetido: ${totalItems} productos agregados por $${totalPrice.toLocaleString()}`,
        severity: 'success',
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Error al repetir el pedido',
        severity: 'error',
      });
    } finally {
      setRepeatingOrder(false);
    }
  };

  const handleViewCompleteOrder = () => {
    navigate('/mis-pedidos');
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: 'success' });
  };

  if (loading) {
    return (
      <Box sx={{ px: 2, py: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Skeleton variant="text" width={150} height={32} />
          <Skeleton variant="text" width={120} height={20} />
        </Box>
        <Skeleton variant="text" width={250} height={20} sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2, mb: 2 }}>
          {[...Array(3)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width={160}
              height={200}
              sx={{ borderRadius: 2, flexShrink: 0 }}
            />
          ))}
        </Box>
        <Skeleton variant="rectangular" width="100%" height={48} sx={{ borderRadius: 1 }} />
      </Box>
    );
  }

  if (error || !lastOrder) {
    return (
      <Box sx={{ px: 2, py: 3 }}>
        <Typography color="error" variant="body2">
          {error || 'No se pudo cargar el último pedido'}
        </Typography>
      </Box>
    );
  }

  const totalPrice = lastOrder.products.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <Box sx={{ px: 2, py: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: 18,
            color: '#1a1a1a',
          }}
        >
          Mi último pedido
        </Typography>

        <Link
          component="button"
          onClick={handleViewCompleteOrder}
          sx={{
            color: '#de0b1c',
            fontSize: 14,
            fontWeight: 500,
            textDecoration: 'none',
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Ver pedido completo
        </Link>
      </Box>

      <Typography
        variant="body2"
        sx={{
          color: '#666',
          mb: 2,
          fontSize: 14,
        }}
      >
        Agiliza tu compra y repone tu negocio
      </Typography>

      {/* Products from Last Order */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          overflowX: 'auto',
          pb: 2,
          mb: 2,
          '&::-webkit-scrollbar': {
            height: 4,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ccc',
            borderRadius: 2,
          },
        }}
      >
        {lastOrder.products.map((item) => (
          <Box key={item.product.id} sx={{ flexShrink: 0, width: 160 }}>
            <ProductoCard 
              product={{
                ...item.product,
                previousQuantity: item.quantity
              }} 
              compact 
            />
          </Box>
        ))}
      </Box>

      {/* Repeat Order Button */}
      <Button
        variant="contained"
        fullWidth
        onClick={handleRepeatOrder}
        disabled={repeatingOrder}
        sx={{
          backgroundColor: '#de0b1c',
          color: 'white',
          fontWeight: 600,
          py: 1.5,
          '&:hover': {
            backgroundColor: '#c20a18',
          },
          '&:disabled': {
            backgroundColor: '#ccc',
          },
        }}
      >
        {repeatingOrder 
          ? 'Repitiendo pedido...' 
          : `Repetir pedido por $${totalPrice.toLocaleString()}`
        }
      </Button>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LastOrderSection; 