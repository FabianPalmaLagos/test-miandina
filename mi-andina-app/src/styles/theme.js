import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#de0b1c', // Rojo Mi Andina
      light: '#ff5a6a',
      dark: '#a50000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#3c3c3c', // Gris oscuro
      light: '#6a6a6a',
      dark: '#1a1a1a',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f7f7f7',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#3c3c3c',
    },
    success: {
      main: '#2e9a2e',
    },
    warning: {
      main: '#ffdf01',
    },
  },
  typography: {
    fontFamily: '"Gotham", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 4,
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default theme; 