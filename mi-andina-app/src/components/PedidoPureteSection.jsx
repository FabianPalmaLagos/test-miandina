import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Skeleton,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getSuggestedProducts } from '../services/productService';
import { useCart } from '../hooks/useCart';
import ProductoCard from './ProductoCard/ProductoCard';

const PedidoPureteSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingAll, setAddingAll] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await getSuggestedProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddAll = async () => {
    try {
      setAddingAll(true);
      
      // Add all products to cart with quantity 1
      for (const product of products) {
        addToCart(product, 1);
      }
      
      const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
      
      setSnackbar({
        open: true,
        message: `${products.length} productos agregados al carrito por $${totalPrice.toLocaleString()}`,
        severity: 'success',
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Error al agregar productos al carrito',
        severity: 'error',
      });
    } finally {
      setAddingAll(false);
    }
  };

  const handleViewComplete = () => {
    navigate('/pedido-purete');
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: 'success' });
  };

  if (loading) {
    return (
      <Box sx={{ px: 2, py: 3 }}>
        <Skeleton variant="text" width={200} height={32} sx={{ mb: 1 }} />
        <Skeleton variant="text" width={300} height={20} sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2 }}>
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
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ px: 2, py: 3 }}>
        <Typography color="error" variant="body2">
          Error al cargar productos sugeridos: {error}
        </Typography>
      </Box>
    );
  }

  const totalPrice = products.reduce((sum, product) => sum + product.price, 0);

  return (
    <Box sx={{ px: 2, py: 3 }}>
      {/* Header */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          fontSize: 18,
          color: '#1a1a1a',
          mb: 1,
        }}
      >
        Pedido Purete
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: '#666',
          mb: 2,
          fontSize: 14,
        }}
      >
        Los productos más pedidos por negocios como el tuyo
      </Typography>

      {/* Products Carousel */}
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
        {products.map((product) => (
          <Box key={product.id} sx={{ flexShrink: 0, width: 160 }}>
            <ProductoCard product={product} compact />
          </Box>
        ))}
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleAddAll}
          disabled={addingAll || products.length === 0}
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
          {addingAll 
            ? 'Agregando...' 
            : `Agregar todos por $${totalPrice.toLocaleString()}`
          }
        </Button>

        <Button
          variant="outlined"
          fullWidth
          onClick={handleViewComplete}
          sx={{
            borderColor: '#de0b1c',
            color: '#de0b1c',
            fontWeight: 500,
            py: 1,
            '&:hover': {
              borderColor: '#c20a18',
              backgroundColor: 'rgba(222, 11, 28, 0.04)',
            },
          }}
        >
          Ver lista completa
        </Button>
      </Box>

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

export default PedidoPureteSection; 