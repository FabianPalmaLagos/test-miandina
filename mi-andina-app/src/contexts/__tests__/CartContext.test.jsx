import { render, screen, act } from '@testing-library/react';
import { CartProvider, CartContext } from '../CartContext';
import { useContext } from 'react';

// Componente de prueba para acceder al contexto
const TestComponent = () => {
  const {
    cartItems,
    addProduct,
    removeProduct,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount
  } = useContext(CartContext);

  return (
    <div>
      <div data-testid="cart-items-count">{getCartItemsCount()}</div>
      <div data-testid="cart-total">{getCartTotal()}</div>
      <div data-testid="cart-items">{JSON.stringify(cartItems)}</div>
      <button 
        data-testid="add-product" 
        onClick={() => addProduct({ id: 1, name: 'Test Product', price: 1000 }, 2)}
      >
        Add Product
      </button>
      <button 
        data-testid="remove-product" 
        onClick={() => removeProduct(1)}
      >
        Remove Product
      </button>
      <button 
        data-testid="update-quantity" 
        onClick={() => updateQuantity(1, 5)}
      >
        Update Quantity
      </button>
      <button 
        data-testid="clear-cart" 
        onClick={() => clearCart()}
      >
        Clear Cart
      </button>
    </div>
  );
};

const renderWithCartProvider = () => {
  return render(
    <CartProvider>
      <TestComponent />
    </CartProvider>
  );
};

// Mock de sessionStorage
const mockSessionStorage = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

// Reemplazar sessionStorage global
Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage
});

describe('CartContext', () => {
  beforeEach(() => {
    // Limpiar sessionStorage antes de cada test
    mockSessionStorage.clear();
  });

  test('debe inicializar con carrito vacío', () => {
    renderWithCartProvider();
    
    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-items')).toHaveTextContent('[]');
  });

  test('addProduct debe agregar nuevo producto correctamente', () => {
    renderWithCartProvider();
    
    act(() => {
      screen.getByTestId('add-product').click();
    });

    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('2');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('2000');
    
    const cartItems = JSON.parse(screen.getByTestId('cart-items').textContent);
    expect(cartItems).toHaveLength(1);
    expect(cartItems[0]).toEqual({
      id: 1,
      name: 'Test Product',
      price: 1000,
      quantity: 2
    });
  });

  test('addProduct debe incrementar cantidad si producto existe', () => {
    renderWithCartProvider();
    
    // Agregar producto dos veces
    act(() => {
      screen.getByTestId('add-product').click();
      screen.getByTestId('add-product').click();
    });

    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('4');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('4000');
    
    const cartItems = JSON.parse(screen.getByTestId('cart-items').textContent);
    expect(cartItems).toHaveLength(1);
    expect(cartItems[0].quantity).toBe(4);
  });

  test('removeProduct debe eliminar producto del carrito', () => {
    renderWithCartProvider();
    
    // Primero agregar un producto
    act(() => {
      screen.getByTestId('add-product').click();
    });

    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('2');

    // Luego eliminarlo
    act(() => {
      screen.getByTestId('remove-product').click();
    });

    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-items')).toHaveTextContent('[]');
  });

  test('updateQuantity debe actualizar cantidad correctamente', () => {
    renderWithCartProvider();
    
    // Primero agregar un producto
    act(() => {
      screen.getByTestId('add-product').click();
    });

    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('2');

    // Actualizar cantidad
    act(() => {
      screen.getByTestId('update-quantity').click();
    });

    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('5');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('5000');
  });

  test('clearCart debe limpiar todo el carrito', () => {
    renderWithCartProvider();
    
    // Agregar producto
    act(() => {
      screen.getByTestId('add-product').click();
    });

    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('2');

    // Limpiar carrito
    act(() => {
      screen.getByTestId('clear-cart').click();
    });

    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-items')).toHaveTextContent('[]');
  });

  test('debe persistir cambios en sessionStorage', () => {
    renderWithCartProvider();
    
    // Agregar producto
    act(() => {
      screen.getByTestId('add-product').click();
    });

    // Verificar que se guardó en sessionStorage
    const storedCart = JSON.parse(mockSessionStorage.getItem('miAndina_cart'));
    expect(storedCart).toHaveLength(1);
    expect(storedCart[0]).toEqual({
      id: 1,
      name: 'Test Product',
      price: 1000,
      quantity: 2
    });
  });

  test('debe recuperar carrito de sessionStorage al montar', () => {
    // Pre-poblar sessionStorage
    const initialCart = [
      { id: 1, name: 'Existing Product', price: 500, quantity: 3 }
    ];
    mockSessionStorage.setItem('miAndina_cart', JSON.stringify(initialCart));

    renderWithCartProvider();

    // Verificar que se cargó desde sessionStorage
    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('3');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('1500');
    
    const cartItems = JSON.parse(screen.getByTestId('cart-items').textContent);
    expect(cartItems).toEqual(initialCart);
  });
});
