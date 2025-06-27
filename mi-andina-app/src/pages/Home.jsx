import React, { useState, useEffect } from 'react';
import { Box, Container, Divider } from '@mui/material';
import { getBanners } from '../services/productService';
import BannerCarousel from '../components/BannerCarousel';
import QuickAccessButtons from '../components/QuickAccessButtons';
import PedidoPureteSection from '../components/PedidoPureteSection';
import CategoriesSection from '../components/CategoriesSection';
import PromotionsSection from '../components/PromotionsSection';
import LastOrderSection from '../components/LastOrderSection';

function Home() {
  const [banners, setBanners] = useState([]);
  const [bannersLoading, setBannersLoading] = useState(true);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        setBannersLoading(true);
        const data = await getBanners();
        setBanners(data);
      } catch (err) {
        console.error('Error loading banners:', err);
      } finally {
        setBannersLoading(false);
      }
    };

    loadBanners();
  }, []);

  return (
    <Box sx={{ pb: 8 }} data-testid="home-page">
      {/* Banner Carousel */}
      {!bannersLoading && banners.length > 0 && (
        <BannerCarousel banners={banners} />
      )}

      {/* Quick Access Buttons */}
      <QuickAccessButtons />

      <Divider sx={{ mx: 2 }} />

      {/* Pedido Purete Section */}
      <PedidoPureteSection />

      <Divider sx={{ mx: 2 }} />

      {/* Categories Section */}
      <CategoriesSection />

      <Divider sx={{ mx: 2 }} />

      {/* Promotions Section */}
      <PromotionsSection />

      <Divider sx={{ mx: 2 }} />

      {/* Last Order Section */}
      <LastOrderSection />
    </Box>
  );
}

export default Home; 