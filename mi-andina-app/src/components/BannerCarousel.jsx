import React, { useState, useEffect } from 'react';
import { Box, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const BannerCarousel = ({ banners = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Auto-play functionality
  useEffect(() => {
    if (banners.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === banners.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [banners.length]);

  const handlePrevious = () => {
    setCurrentIndex(currentIndex === 0 ? banners.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex === banners.length - 1 ? 0 : currentIndex + 1);
  };

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  if (!banners.length) {
    return null;
  }

  return (
    <Box sx={{ position: 'relative', width: '100%', height: 180 }}>
      {/* Banner Image */}
      <Box
        component="img"
        src={banners[currentIndex]?.image}
        alt={banners[currentIndex]?.alt || `Banner ${currentIndex + 1}`}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: 0,
        }}
      />

      {/* Navigation Arrows */}
      {banners.length > 1 && !isMobile && (
        <>
          <IconButton
            onClick={handlePrevious}
            sx={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              },
            }}
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              },
            }}
          >
            <ChevronRight />
          </IconButton>
        </>
      )}

      {/* Indicators */}
      {banners.length > 1 && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1,
            alignItems: 'center',
          }}
        >
          {banners.map((_, index) => (
            <Box
              key={index}
              onClick={() => handleIndicatorClick(index)}
              sx={{
                width: index === currentIndex ? 24 : 8,
                height: 8,
                borderRadius: index === currentIndex ? 4 : '50%',
                backgroundColor: index === currentIndex ? '#de0b1c' : '#d9d9d9',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default BannerCarousel; 