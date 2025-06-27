import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  IconButton,
  Chip,
  Stack
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import useCart from '../../hooks/useCart';

const ProductoCard = ({ product, compact = false }) => {
  const [quantity, setQuantity] = useState(product.previousQuantity || 1);
  const { addProduct } = useCart();

  const handleQuantityChange = (delta) => {
    setQuantity(prev => {
      const currentQty = typeof prev === 'number' ? prev : 1;
      return Math.max(1, currentQty + delta);
    });
  };

  const handleAddToCart = () => {
    const finalQuantity = typeof quantity === 'number' ? quantity : parseInt(quantity) || 1;
    addProduct(product, finalQuantity);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <Card
      component="article"
      sx={{
        width: '100%',
        maxWidth: compact ? 160 : 400,
        borderRadius: 2,
        border: '1px solid #e3e3e3',
        boxShadow: 'none',
        mb: compact ? 0 : 2,
        '&:hover': {
          boxShadow: 1
        }
      }}
    >
      {/* Imagen del producto */}
      <Box sx={{ p: compact ? 1.5 : 3, display: 'flex', justifyContent: 'center', backgroundColor: '#f8f8f8' }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{
            width: compact ? 80 : 120,
            height: compact ? 80 : 120,
            objectFit: 'contain'
          }}
        />
      </Box>

      <CardContent sx={{ p: compact ? 1.5 : 3, pt: compact ? 1 : 2, '&:last-child': { pb: compact ? 1.5 : 3 } }}>
        {/* Nombre y descripción */}
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Gotham',
            fontWeight: 700,
            fontSize: compact ? 12 : 14,
            lineHeight: compact ? '16px' : '22px',
            color: '#1a1a1a',
            mb: 0.5
          }}
        >
          {product.name}
        </Typography>

        {!compact && (
          <Typography
            variant="body2"
            sx={{
              fontFamily: 'Gotham',
              fontWeight: 325,
              fontSize: 14,
              lineHeight: '22px',
              color: '#1a1a1a',
              mb: 1
            }}
          >
            {product.description}
          </Typography>
        )}

        {/* Tag de promoción */}
        {product.hasPromotion && (
          <Chip
            label="Promoción"
            sx={{
              backgroundColor: '#ffdf01',
              color: '#3c3c3c',
              fontFamily: 'Gotham',
              fontWeight: 325,
              fontSize: 12,
              height: 26,
              borderRadius: 4,
              mb: 1,
              '& .MuiChip-label': {
                px: 1.5
              }
            }}
          />
        )}

        {/* Precios */}
        <Box sx={{ mb: 1 }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: 'Gotham',
              fontWeight: 700,
              fontSize: compact ? 16 : 24,
              lineHeight: compact ? '20px' : '28px',
              letterSpacing: '-0.48px',
              color: '#1a1a1a',
              mb: compact ? 0.25 : 0.5
            }}
          >
            {formatPrice(product.price)}
          </Typography>

          {!compact && (product.originalPrice || product.oldPrice) && (
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'TCCC-UnityText',
                fontWeight: 400,
                fontSize: 16,
                lineHeight: '24px',
                color: '#818181',
                textDecoration: 'line-through',
                mb: 0.5
              }}
            >
              {formatPrice(product.originalPrice || product.oldPrice)}
            </Typography>
          )}

          {!compact && (
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'Gotham',
                fontWeight: 700,
                fontSize: 16,
                lineHeight: '24px',
                color: '#1a1a1a'
              }}
            >
              {formatPrice(product.unitPrice)} <span style={{ fontWeight: 325, color: '#3c3c3c' }}>C/U</span>
            </Typography>
          )}
        </Box>

        {/* Selector de cantidad y botón agregar */}
        <Box sx={{ display: 'flex', gap: compact ? 1 : 2, alignItems: 'center', mt: compact ? 1 : 2 }}>
          {/* Selector de cantidad */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #e5e5e5',
              borderRadius: 1,
              height: compact ? 36 : 48,
              minWidth: compact ? 80 : 120
            }}
          >
            <IconButton
              onClick={() => handleQuantityChange(-1)}
              aria-label="decrementar cantidad"
              sx={{
                width: compact ? 28 : 40,
                height: compact ? 36 : 48,
                borderRadius: 0,
                borderRight: '1px solid #e5e5e5',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              <Remove sx={{ fontSize: compact ? 16 : 24 }} />
            </IconButton>

            <input
              type="number"
              value={quantity}
              onChange={(e) => {
                const value = e.target.value === '' ? '' : parseInt(e.target.value);
                if (value === '' || (!isNaN(value) && value >= 1)) {
                  setQuantity(value === '' ? '' : value);
                }
              }}
              onBlur={(e) => {
                const value = parseInt(e.target.value) || 1;
                setQuantity(Math.max(1, value));
              }}
              style={{
                flex: 1,
                textAlign: 'center',
                fontFamily: 'Gotham',
                fontWeight: 700,
                fontSize: compact ? 12 : 16,
                color: '#3c3c3c',
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
                minWidth: 0
              }}
            />

            <IconButton
              onClick={() => handleQuantityChange(1)}
              aria-label="incrementar cantidad"
              sx={{
                width: compact ? 28 : 40,
                height: compact ? 36 : 48,
                borderRadius: 0,
                borderLeft: '1px solid #e5e5e5',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              <Add sx={{ fontSize: compact ? 16 : 24, color: '#de0b1c' }} />
            </IconButton>
          </Box>

          {/* Botón Agregar */}
          <Button
            variant="contained"
            onClick={handleAddToCart}
            sx={{
              flex: 1,
              height: compact ? 36 : 48,
              borderRadius: 1,
              backgroundColor: '#de0b1c',
              color: '#ffffff',
              fontFamily: 'Gotham',
              fontWeight: 500,
              fontSize: compact ? 12 : 14,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#b8090f'
              }
            }}
          >
            Agregar
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductoCard; 