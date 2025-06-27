import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Link,
  Skeleton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getPromotedProducts } from '../services/productService';
import ProductoCard from './ProductoCard/ProductoCard';

const PromotionsSection = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const loadPromotions = async () => {
      try {
        setLoading(true);
        const data = await getPromotedProducts();
        setPromotions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPromotions();
  }, []);

  const handleViewAll = () => {
    navigate('/promociones');
  };

  if (loading) {
    return (
      <Box sx={{ px: 2, py: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Skeleton variant="text" width={200} height={32} />
          <Skeleton variant="text" width={120} height={20} />
        </Box>
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
          Error al cargar promociones: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ px: 2, py: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: 18,
            color: '#1a1a1a',
          }}
        >
          Promociones destacadas
        </Typography>

        <Link
          component="button"
          onClick={handleViewAll}
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
          Ver lista completa
        </Link>
      </Box>

      {/* Promotions Carousel */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          overflowX: 'auto',
          pb: 2,
          '&::-webkit-scrollbar': {
            height: 4,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ccc',
            borderRadius: 2,
          },
        }}
      >
        {promotions.map((product) => (
          <Box key={product.id} sx={{ flexShrink: 0, width: 160 }}>
            <ProductoCard product={product} compact />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PromotionsSection; 