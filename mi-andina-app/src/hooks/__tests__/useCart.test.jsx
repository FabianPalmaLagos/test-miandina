import { renderHook, act } from '@testing-library/react';
import { CartProvider } from '../../contexts/CartContext';
import useCart from '../useCart';

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

Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage
});

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

describe('useCart Hook', () => {
  beforeEach(() => {
    mockSessionStorage.clear();
  });

  test('debe exponer todas las funciones del contexto', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current).toHaveProperty('cartItems');
    expect(result.current).toHaveProperty('addProduct');
    expect(result.current).toHaveProperty('removeProduct');
    expect(result.current).toHaveProperty('updateQuantity');
    expect(result.current).toHaveProperty('clearCart');
    expect(result.current).toHaveProperty('getCartTotal');
    expect(result.current).toHaveProperty('getCartItemsCount');
  });

  test('debe actualizar contador en tiempo real', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    // Inicialmente debe ser 0
    expect(result.current.getCartItemsCount()).toBe(0);

    // Agregar producto
    act(() => {
      result.current.addProduct(
        { id: 1, name: 'Test Product', price: 1000 },
        3
      );
    });

    // Debe actualizar el contador
    expect(result.current.getCartItemsCount()).toBe(3);
    expect(result.current.getCartTotal()).toBe(3000);
  });

  test('debe manejar múltiples productos correctamente', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addProduct(
        { id: 1, name: 'Product 1', price: 1000 },
        2
      );
      result.current.addProduct(
        { id: 2, name: 'Product 2', price: 500 },
        4
      );
    });

    expect(result.current.getCartItemsCount()).toBe(6); // 2 + 4
    expect(result.current.getCartTotal()).toBe(4000); // (1000*2) + (500*4)
    expect(result.current.cartItems).toHaveLength(2);
  });
}); 