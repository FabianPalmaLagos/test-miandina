import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProductCarousel from '../ProductCarousel';
import { CartProvider } from '../../../contexts/CartContext';

// Mock de productos para las pruebas
const mockProducts = [
  {
    id: 1,
    name: 'Coca-Cola Sin Azúcar 1,5 LT',
    description: 'Botella Plástico No Retornable 1.5 Lts 1X6',
    price: 10129,
    oldPrice: 11005,
    unitPrice: 1688,
    hasPromotion: true,
    image: 'https://via.placeholder.com/113x113/ff0000/ffffff?text=Coca-Cola'
  },
  {
    id: 2,
    name: 'Agua Mineral Natural 500ml',
    description: 'Botella de agua mineral natural sin gas',
    price: 1500,
    unitPrice: 1500,
    hasPromotion: false,
    image: 'https://via.placeholder.com/113x113/0066cc/ffffff?text=Agua'
  },
  {
    id: 3,
    name: 'Sprite 2 Litros',
    description: 'Bebida gaseosa sabor lima-limón',
    price: 2890,
    oldPrice: 3200,
    unitPrice: 2890,
    hasPromotion: true,
    image: 'https://via.placeholder.com/113x113/00cc00/ffffff?text=Sprite'
  },
  {
    id: 4,
    name: 'Fanta Naranja 350ml',
    description: 'Bebida gaseosa sabor naranja',
    price: 890,
    unitPrice: 890,
    hasPromotion: false,
    image: 'https://via.placeholder.com/113x113/ff9900/ffffff?text=Fanta'
  }
];

// Wrapper con CartProvider para las pruebas
const TestWrapper = ({ children }) => (
  <CartProvider>
    {children}
  </CartProvider>
);

describe('ProductCarousel', () => {
  beforeEach(() => {
    // Limpiar localStorage antes de cada prueba
    window.sessionStorage.clear();
  });

  it('debe renderizar el carrusel con productos', () => {
    render(
      <TestWrapper>
        <ProductCarousel products={mockProducts} itemsPerPage={4} />
      </TestWrapper>
    );

    // Verificar que el contenedor del carrusel existe
    const carousel = screen.getByTestId('product-carousel');
    expect(carousel).toBeInTheDocument();

    // Verificar que se muestran las tarjetas de productos (primera página)
    expect(screen.getByText('Coca-Cola Sin Azúcar 1,5 LT')).toBeInTheDocument();
    expect(screen.getByText('Agua Mineral Natural 500ml')).toBeInTheDocument();
    expect(screen.getByText('Sprite 2 Litros')).toBeInTheDocument();
    expect(screen.getByText('Fanta Naranja 350ml')).toBeInTheDocument();
  });

  it('debe mostrar botones de navegación cuando hay múltiples productos', () => {
    render(
      <TestWrapper>
        <ProductCarousel products={mockProducts} />
      </TestWrapper>
    );

    // Verificar botones de navegación
    const prevButton = screen.getByLabelText('anterior');
    const nextButton = screen.getByLabelText('siguiente');
    
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it('debe deshabilitar el botón anterior en la primera página', () => {
    render(
      <TestWrapper>
        <ProductCarousel products={mockProducts} />
      </TestWrapper>
    );

    const prevButton = screen.getByLabelText('anterior');
    expect(prevButton).toBeDisabled();
  });

  it('debe navegar al siguiente conjunto de productos al hacer clic en siguiente', async () => {
    render(
      <TestWrapper>
        <ProductCarousel products={mockProducts} itemsPerPage={2} />
      </TestWrapper>
    );

    const nextButton = screen.getByLabelText('siguiente');
    
    // Hacer clic en siguiente
    fireEvent.click(nextButton);

    // Esperar a que se actualice la vista
    await waitFor(() => {
      // Verificar que ahora se muestran los productos de la segunda página
      expect(screen.getByText('Sprite 2 Litros')).toBeInTheDocument();
      expect(screen.getByText('Fanta Naranja 350ml')).toBeInTheDocument();
    });
  });

  it('debe navegar al conjunto anterior de productos al hacer clic en anterior', async () => {
    render(
      <TestWrapper>
        <ProductCarousel products={mockProducts} itemsPerPage={2} />
      </TestWrapper>
    );

    const nextButton = screen.getByLabelText('siguiente');
    const prevButton = screen.getByLabelText('anterior');
    
    // Ir a la segunda página primero
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText('Sprite 2 Litros')).toBeInTheDocument();
    });

    // Volver a la primera página
    fireEvent.click(prevButton);

    await waitFor(() => {
      expect(screen.getByText('Coca-Cola Sin Azúcar 1,5 LT')).toBeInTheDocument();
      expect(screen.getByText('Agua Mineral Natural 500ml')).toBeInTheDocument();
    });
  });

  it('debe deshabilitar el botón siguiente en la última página', async () => {
    render(
      <TestWrapper>
        <ProductCarousel products={mockProducts} itemsPerPage={2} />
      </TestWrapper>
    );

    const nextButton = screen.getByLabelText('siguiente');
    
    // Ir a la última página
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(nextButton).toBeDisabled();
    });
  });

  it('debe mostrar indicadores de página', () => {
    render(
      <TestWrapper>
        <ProductCarousel products={mockProducts} itemsPerPage={2} />
      </TestWrapper>
    );

    // Verificar que se muestran los indicadores de página
    const pageIndicators = screen.getAllByTestId(/page-indicator-/);
    expect(pageIndicators).toHaveLength(2); // 4 productos / 2 por página = 2 páginas
  });

  it('debe resaltar el indicador de página actual', () => {
    render(
      <TestWrapper>
        <ProductCarousel products={mockProducts} itemsPerPage={2} />
      </TestWrapper>
    );

    const firstIndicator = screen.getByTestId('page-indicator-0');
    expect(firstIndicator).toHaveClass('active'); // O el estilo que indique página activa
  });

  it('debe cambiar de página al hacer clic en un indicador', async () => {
    render(
      <TestWrapper>
        <ProductCarousel products={mockProducts} itemsPerPage={2} />
      </TestWrapper>
    );

    const secondIndicator = screen.getByTestId('page-indicator-1');
    
    // Hacer clic en el segundo indicador
    fireEvent.click(secondIndicator);

    await waitFor(() => {
      expect(screen.getByText('Sprite 2 Litros')).toBeInTheDocument();
      expect(screen.getByText('Fanta Naranja 350ml')).toBeInTheDocument();
    });
  });

  it('debe mostrar scroll horizontal en dispositivos móviles', () => {
    render(
      <TestWrapper>
        <ProductCarousel products={mockProducts} enableMobileScroll={true} />
      </TestWrapper>
    );

    const carousel = screen.getByTestId('product-carousel');
    expect(carousel).toHaveStyle('overflow-x: auto');
  });

  it('debe manejar lista vacía de productos', () => {
    render(
      <TestWrapper>
        <ProductCarousel products={[]} />
      </TestWrapper>
    );

    const carousel = screen.getByTestId('product-carousel');
    expect(carousel).toBeInTheDocument();
    
    // No debe mostrar botones de navegación si no hay productos
    expect(screen.queryByLabelText('anterior')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('siguiente')).not.toBeInTheDocument();
  });

  it('debe permitir personalizar el número de elementos por página', () => {
    render(
      <TestWrapper>
        <ProductCarousel products={mockProducts} itemsPerPage={1} />
      </TestWrapper>
    );

    // Con 1 elemento por página, debe haber 4 indicadores
    const pageIndicators = screen.getAllByTestId(/page-indicator-/);
    expect(pageIndicators).toHaveLength(4);
  });
}); 