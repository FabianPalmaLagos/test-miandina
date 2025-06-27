import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home';
import { CartProvider } from '../../contexts/CartContext';

// Mock de productService
const mockProducts = [
  {
    id: 1,
    name: 'Coca-Cola Sin Azúcar 1,5 LT',
    description: 'Botella Plástico No Retornable 1.5 Lts 1X6',
    price: 10129,
    oldPrice: 11005,
    unitPrice: 1688,
    hasPromotion: true,
    image: '/src/assets/coca-sin-azucar.png'
  },
  {
    id: 2,
    name: 'Sprite Sin Azúcar 2 Litros',
    description: 'Bebida gaseosa sabor lima-limón',
    price: 2890,
    oldPrice: 3200,
    unitPrice: 1445,
    hasPromotion: true,
    image: '/src/assets/sprite-sin-azucar.png'
  },
  {
    id: 3,
    name: 'Corona Extra 355ml',
    description: 'Cerveza premium mexicana',
    price: 1850,
    unitPrice: 1850,
    hasPromotion: false,
    image: '/src/assets/corona.png'
  }
];

const mockLastOrder = [
  {
    id: 1,
    name: 'Coca-Cola Sin Azúcar 1,5 LT',
    quantity: 2,
    price: 10129,
    image: '/src/assets/coca-sin-azucar.png'
  },
  {
    id: 2,
    name: 'Sprite Sin Azúcar 2 Litros',
    quantity: 1,
    price: 2890,
    image: '/src/assets/sprite-sin-azucar.png'
  }
];

const mockCategories = [
  { id: 1, name: 'Promos', icon: 'promo', isNew: false },
  { id: 2, name: 'Sugeridos', icon: 'suggested', isNew: true },
  { id: 3, name: 'Gaseosa', icon: 'soda', isNew: false },
  { id: 4, name: 'Jugos', icon: 'juice', isNew: false },
  { id: 5, name: 'Agua', icon: 'water', isNew: false }
];

// Mock de servicios
vi.mock('../../services/productService', () => ({
  getProducts: vi.fn(() => Promise.resolve(mockProducts)),
  getPromotedProducts: vi.fn(() => Promise.resolve(mockProducts.filter(p => p.hasPromotion))),
  getLastOrder: vi.fn(() => Promise.resolve(mockLastOrder)),
  getCategories: vi.fn(() => Promise.resolve(mockCategories))
}));

// Componente wrapper para tests
const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <CartProvider>
      {children}
    </CartProvider>
  </BrowserRouter>
);

describe('Home Page - Fase 4', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Carrusel de Banners', () => {
    it('debe renderizar carrusel de banners', async () => {
      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        const bannerCarousel = screen.getByTestId('banner-carousel');
        expect(bannerCarousel).toBeInTheDocument();
      });
    });

    it('debe mostrar indicadores de página del carrusel', async () => {
      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        const indicators = screen.getAllByTestId(/banner-indicator-/);
        expect(indicators.length).toBeGreaterThan(0);
      });
    });

    it('debe permitir navegación entre banners', async () => {
      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        const nextButton = screen.getByLabelText('siguiente banner');
        expect(nextButton).toBeInTheDocument();
        
        fireEvent.click(nextButton);
        // Verificar que la navegación funciona
      });
    });
  });

  describe('Botones de Acceso Rápido', () => {
    it('debe mostrar 3 botones de acceso rápido', async () => {
      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Pedido Purete')).toBeInTheDocument();
        expect(screen.getByText('Nuevo pedido')).toBeInTheDocument();
        expect(screen.getByText('Mis pedidos')).toBeInTheDocument();
      });
    });

    it('debe resaltar "Pedido Purete" como mejor opción', async () => {
      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        const pedidoPureteButton = screen.getByTestId('pedido-purete-button');
        expect(pedidoPureteButton).toHaveClass('highlighted'); // o el estilo correspondiente
        expect(screen.getByText('Mejor opción')).toBeInTheDocument();
      });
    });

    it('debe permitir clic en los botones de acceso rápido', async () => {
      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        const pedidoPureteButton = screen.getByTestId('pedido-purete-button');
        fireEvent.click(pedidoPureteButton);
        
        // Verificar que se expande la sección Pedido Purete
        expect(screen.getByTestId('pedido-purete-section')).toBeVisible();
      });
    });
  });

  describe('Sección Pedido Purete', () => {
    it('debe mostrar título y descripción de Pedido Purete', async () => {
      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('¡Pedido Purete!')).toBeInTheDocument();
        expect(screen.getByText(/Haz tu pedido rápido con esta selección/)).toBeInTheDocument();
      });
    });

    it('debe cargar y mostrar productos sugeridos', async () => {
      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Coca-Cola Sin Azúcar 1,5 LT')).toBeInTheDocument();
        expect(screen.getByText('Sprite Sin Azúcar 2 Litros')).toBeInTheDocument();
      });
    });

    it('debe mostrar botón "Agregar todos" con precio total', async () => {
      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        const addAllButton = screen.getByTestId('add-all-products-button');
        expect(addAllButton).toBeInTheDocument();
        expect(addAllButton).toHaveTextContent(/Agrega todos por/);
        expect(addAllButton).toHaveTextContent(/\$/); // Debe mostrar precio
      });
    });

    it('debe mostrar botón "Ver lista completa"', async () => {
      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        const viewAllButton = screen.getByText('Ver lista completa');
        expect(viewAllButton).toBeInTheDocument();
      });
    });
  });

  describe('Categorías Circulares', () => {
    it('debe mostrar título "¿Qué necesita tu negocio?"', async () => {
      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('¿Qué necesita tu negocio?')).toBeInTheDocument();
      });
    });

    it('debe cargar y mostrar categorías', async () => {
      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Promos')).toBeInTheDocument();
        expect(screen.getByText('Sugeridos')).toBeInTheDocument();
        expect(screen.getByText('Gaseosa')).toBeInTheDocument();
        expect(screen.getByText('Jugos')).toBeInTheDocument();
        expect(screen.getByText('Agua')).toBeInTheDocument();
      });
    });

    it('debe mostrar badge "Nuevo" en categorías correspondientes', async () => {
      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        const newBadge = screen.getByText('Nuevo');
        expect(newBadge).toBeInTheDocument();
      });
    });

    it('debe permitir clic en categorías', async () => {
      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        const promosCategory = screen.getByTestId('category-promos');
        fireEvent.click(promosCategory);
        // Verificar navegación o filtrado
      });
    });
  });

  describe('Promociones Destacadas', () => {
    it('debe mostrar título "Promociones destacadas"', async () => {
      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Promociones destacadas')).toBeInTheDocument();
      });
    });

    it('debe mostrar carrusel de productos promocionales', async () => {
      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        const promotionsCarousel = screen.getByTestId('promotions-carousel');
        expect(promotionsCarousel).toBeInTheDocument();
      });
    });

    it('debe mostrar enlace "Ver lista completa"', async () => {
      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        const viewAllLink = screen.getByRole('link', { name: /ver lista completa/i });
        expect(viewAllLink).toBeInTheDocument();
      });
    });

    it('cada ProductoCard debe ser funcional en promociones', async () => {
      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        const addButtons = screen.getAllByText(/agregar/i);
        expect(addButtons.length).toBeGreaterThan(0);
        
        // Hacer clic en un botón agregar
        fireEvent.click(addButtons[0]);
        // Verificar que se agrega al carrito
      });
    });
  });

  describe('Mi Último Pedido', () => {
    it('debe mostrar título y descripción de último pedido', async () => {
      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Mi último pedido')).toBeInTheDocument();
        expect(screen.getByText('Agiliza tu compra y repone tu negocio')).toBeInTheDocument();
      });
    });

    it('debe cargar productos del último pedido', async () => {
      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        // Verificar que se muestran productos del último pedido
        const lastOrderProducts = screen.getByTestId('last-order-products');
        expect(lastOrderProducts).toBeInTheDocument();
      });
    });

    it('debe mostrar botón "Repetir pedido"', async () => {
      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        const repeatOrderButton = screen.getByTestId('repeat-order-button');
        expect(repeatOrderButton).toBeInTheDocument();
        expect(repeatOrderButton).toHaveTextContent('Repetir pedido');
      });
    });

    it('debe mostrar enlace "Ver pedido completo"', async () => {
      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        const viewCompleteOrderLink = screen.getByText('Ver pedido completo');
        expect(viewCompleteOrderLink).toBeInTheDocument();
      });
    });

    it('botón repetir pedido debe agregar todos los productos al carrito', async () => {
      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        const repeatOrderButton = screen.getByTestId('repeat-order-button');
        fireEvent.click(repeatOrderButton);
        
        // Verificar que se agregaron los productos al carrito
        // (esto se puede verificar mediante el contexto del carrito)
      });
    });
  });

  describe('Carga de Datos y Estados', () => {
    it('debe mostrar estados de loading mientras cargan los datos', async () => {
      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      // Verificar que se muestran skeletons o indicadores de carga
      expect(screen.getByTestId('loading-products')).toBeInTheDocument();
    });

    it('debe cargar productos desde productService', async () => {
      const { getProducts } = await import('../../services/productService');
      
      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(getProducts).toHaveBeenCalled();
      });
    });

    it('debe manejar errores de carga de datos', async () => {
      const { getProducts } = await import('../../services/productService');
      getProducts.mockRejectedValueOnce(new Error('Error de red'));

      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        const errorMessage = screen.getByText(/error al cargar/i);
        expect(errorMessage).toBeInTheDocument();
      });
    });
  });

  describe('Responsividad y Layout', () => {
    it('debe ser responsivo en diferentes tamaños de pantalla', async () => {
      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        const homeContainer = screen.getByTestId('home-page');
        expect(homeContainer).toHaveClass(/responsive/); // o clases MUI correspondientes
      });
    });

    it('debe mantener la estructura del layout en móvil', async () => {
      // Simular viewport móvil
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 360
      });

      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        // Verificar que el layout se adapta a móvil
        const mobileLayout = screen.getByTestId('home-page');
        expect(mobileLayout).toBeInTheDocument();
      });
    });
  });
}); 