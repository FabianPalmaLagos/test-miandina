import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid2 as Grid, Avatar, Chip, Skeleton } from '@mui/material';
import { getCategories } from '../services/productService';

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <Box sx={{ px: 2, py: 3 }}>
        <Skeleton variant="text" width={250} height={32} sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          {[...Array(6)].map((_, index) => (
            <Grid xs={4} sm={2} key={index}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Skeleton variant="circular" width={60} height={60} sx={{ mb: 1 }} />
                <Skeleton variant="text" width={80} height={20} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ px: 2, py: 3 }}>
        <Typography color="error" variant="body2">
          Error al cargar las categorías: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ px: 2, py: 3 }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          fontSize: 18,
          color: '#1a1a1a',
          mb: 2,
        }}
      >
        ¿Qué necesita tu negocio?
      </Typography>

      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid xs={4} sm={2} key={category.id}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
                position: 'relative',
              }}
            >
              {/* Category Icon */}
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  backgroundColor: '#f5f5f5',
                  border: '2px solid #e3e3e3',
                  mb: 1,
                  fontSize: 24,
                }}
              >
                {category.icon}
              </Avatar>

              {/* New Badge */}
              {category.isNew && (
                <Chip
                  label="Nuevo"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    backgroundColor: '#de0b1c',
                    color: 'white',
                    fontSize: 10,
                    height: 20,
                    '& .MuiChip-label': {
                      px: 1,
                    },
                  }}
                />
              )}

              {/* Category Name */}
              <Typography
                variant="caption"
                sx={{
                  textAlign: 'center',
                  fontSize: 12,
                  fontWeight: 500,
                  color: '#4a4a4a',
                  lineHeight: 1.2,
                  maxWidth: 80,
                }}
              >
                {category.name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoriesSection; 