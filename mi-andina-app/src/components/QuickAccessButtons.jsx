import React from 'react';
import { Box, Card, CardContent, Typography, Grid2 as Grid, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  FlashOn,
  Add,
  History,
} from '@mui/icons-material';

const QuickAccessButtons = () => {
  const navigate = useNavigate();

  const buttons = [
    {
      id: 'pedido-purete',
      title: 'Pedido Purete',
      icon: <FlashOn sx={{ fontSize: 40, color: '#3c3c3c' }} />,
      isBestOption: true,
      onClick: () => navigate('/pedido-purete'),
    },
    {
      id: 'nuevo-pedido',
      title: 'Nuevo\npedido',
      icon: <Add sx={{ fontSize: 40, color: '#3c3c3c' }} />,
      isBestOption: false,
      onClick: () => navigate('/productos'),
    },
    {
      id: 'mis-pedidos',
      title: 'Mis pedidos',
      icon: <History sx={{ fontSize: 40, color: '#3c3c3c' }} />,
      isBestOption: false,
      onClick: () => navigate('/mis-pedidos'),
    },
  ];

  return (
    <Box sx={{ px: 2, py: 2 }}>
      <Grid container spacing={2}>
        {buttons.map((button) => (
          <Grid xs={4} key={button.id}>
            <Card
              onClick={button.onClick}
              sx={{
                position: 'relative',
                cursor: 'pointer',
                border: button.isBestOption ? '2px solid #2e9a2e' : '1px solid #e3e3e3',
                borderRadius: 2,
                height: 124,
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 3,
                },
              }}
            >
              {/* Best Option Badge */}
              {button.isBestOption && (
                <Chip
                  label="Mejor opción"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: '#2e9a2e',
                    color: 'white',
                    fontSize: 12,
                    fontWeight: 500,
                    borderRadius: '8px 8px 0 0',
                    height: 22,
                    '& .MuiChip-label': {
                      px: 1,
                    },
                  }}
                />
              )}

              <CardContent
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pt: button.isBestOption ? 3 : 2,
                  pb: 2,
                  px: 1,
                }}
              >
                {/* Icon */}
                <Box sx={{ mb: 1 }}>
                  {button.icon}
                </Box>

                {/* Title */}
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: 'center',
                    fontWeight: 500,
                    fontSize: 14,
                    lineHeight: 1.4,
                    color: '#1a1a1a',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {button.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default QuickAccessButtons; 