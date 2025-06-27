import React, { useState, useMemo } from 'react';
import {
  Box,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import ProductoCard from '../ProductoCard/ProductoCard';

const ProductCarousel = ({ 
  products = [], 
  itemsPerPage = 2, 
  enableMobileScroll = false 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [currentPage, setCurrentPage] = useState(0);

  // Calcular el número total de páginas
  const totalPages = useMemo(() => {
    if (products.length === 0) return 0;
    return Math.ceil(products.length / itemsPerPage);
  }, [products.length, itemsPerPage]);

  // Obtener productos de la página actual
  const currentProducts = useMemo(() => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return products.slice(startIndex, endIndex);
  }, [products, currentPage, itemsPerPage]);

  // Funciones de navegación
  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  };

  const goToPage = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  // Si no hay productos, mostrar contenedor vacío
  if (products.length === 0) {
    return (
      <Box 
        data-testid="product-carousel"
        sx={{ width: '100%' }}
      />
    );
  }

  return (
    <Box 
      data-testid="product-carousel"
      sx={{ 
        width: '100%',
        position: 'relative',
        ...(enableMobileScroll && {
          overflowX: 'auto'
        })
      }}
    >
      {/* Contenedor principal del carrusel */}
      <Box sx={{ position: 'relative' }}>
        {/* Botón anterior */}
        {totalPages > 1 && (
          <IconButton
            onClick={goToPrevPage}
            disabled={currentPage === 0}
            aria-label="anterior"
            sx={{
              position: 'absolute',
              left: -20,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              backgroundColor: 'white',
              boxShadow: 1,
              '&:hover': {
                backgroundColor: 'grey.100'
              },
              '&:disabled': {
                backgroundColor: 'grey.200',
                color: 'grey.400'
              }
            }}
          >
            <ChevronLeft />
          </IconButton>
        )}

        {/* Contenedor de productos */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflow: 'hidden',
            px: totalPages > 1 ? 3 : 0, // Padding para los botones
            ...(enableMobileScroll && {
              overflowX: 'auto',
              scrollBehavior: 'smooth',
              '&::-webkit-scrollbar': {
                display: 'none'
              },
              msOverflowStyle: 'none',
              scrollbarWidth: 'none'
            })
          }}
        >
          {enableMobileScroll ? (
            // En móvil con scroll, mostrar todos los productos
            products.map((product) => (
              <Box
                key={product.id}
                sx={{
                  flexShrink: 0,
                  width: 193
                }}
              >
                <ProductoCard product={product} />
              </Box>
            ))
          ) : (
            // En desktop o sin scroll móvil, mostrar productos paginados
            currentProducts.map((product) => (
              <Box
                key={product.id}
                sx={{
                  flexShrink: 0,
                  width: 193
                }}
              >
                <ProductoCard product={product} />
              </Box>
            ))
          )}
        </Box>

        {/* Botón siguiente */}
        {totalPages > 1 && (
          <IconButton
            onClick={goToNextPage}
            disabled={currentPage === totalPages - 1}
            aria-label="siguiente"
            sx={{
              position: 'absolute',
              right: -20,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              backgroundColor: 'white',
              boxShadow: 1,
              '&:hover': {
                backgroundColor: 'grey.100'
              },
              '&:disabled': {
                backgroundColor: 'grey.200',
                color: 'grey.400'
              }
            }}
          >
            <ChevronRight />
          </IconButton>
        )}
      </Box>

      {/* Indicadores de página */}
      {totalPages > 1 && !enableMobileScroll && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            mt: 2
          }}
        >
          {Array.from({ length: totalPages }, (_, index) => (
            <Box
              key={index}
              data-testid={`page-indicator-${index}`}
              onClick={() => goToPage(index)}
              className={currentPage === index ? 'active' : ''}
              sx={{
                width: currentPage === index ? 24 : 8,
                height: 8,
                borderRadius: currentPage === index ? 4 : '50%',
                backgroundColor: currentPage === index ? '#de0b1c' : '#d9d9d9',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: currentPage === index ? '#de0b1c' : '#bdbdbd'
                }
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ProductCarousel; 