import { createContext, useContext, useReducer, useEffect } from 'react';

// Crear el contexto
export const CartContext = createContext();

// Tipos de acciones para el reducer
const CART_ACTIONS = {
  LOAD_CART: 'LOAD_CART',
  ADD_PRODUCT: 'ADD_PRODUCT',
  REMOVE_PRODUCT: 'REMOVE_PRODUCT',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART'
};

// Reducer para manejar el estado del carrito
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.LOAD_CART:
      return action.payload;

    case CART_ACTIONS.ADD_PRODUCT: {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.findIndex(item => item.id === product.id);

      if (existingItemIndex >= 0) {
        // Si el producto ya existe, incrementar la cantidad
        const updatedCart = [...state];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantity
        };
        return updatedCart;
      } else {
        // Si es un producto nuevo, agregarlo al carrito
        return [...state, { ...product, quantity }];
      }
    }

    case CART_ACTIONS.REMOVE_PRODUCT: {
      const { productId } = action.payload;
      return state.filter(item => item.id !== productId);
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { productId, newQuantity } = action.payload;
      if (newQuantity <= 0) {
        return state.filter(item => item.id !== productId);
      }
      
      return state.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      );
    }

    case CART_ACTIONS.CLEAR_CART:
      return [];

    default:
      return state;
  }
};

// Clave para sessionStorage
const STORAGE_KEY = 'miAndina_cart';

// Hook personalizado para usar el contexto del carrito
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext debe usarse dentro de CartProvider');
  }
  return context;
};

// Provider del contexto
export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  // Cargar carrito desde sessionStorage al montar el componente
  useEffect(() => {
    try {
      const savedCart = sessionStorage.getItem(STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: parsedCart });
      }
    } catch (error) {
      console.error('Error al cargar el carrito desde sessionStorage:', error);
    }
  }, []);

  // Guardar carrito en sessionStorage cada vez que cambie
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error al guardar el carrito en sessionStorage:', error);
    }
  }, [cartItems]);

  // Funciones del carrito
  const addProduct = (product, quantity = 1) => {
    dispatch({
      type: CART_ACTIONS.ADD_PRODUCT,
      payload: { product, quantity }
    });
  };

  const removeProduct = (productId) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_PRODUCT,
      payload: { productId }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { productId, newQuantity }
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((count, item) => {
      return count + item.quantity;
    }, 0);
  };

  // Valor del contexto
  const contextValue = {
    cartItems,
    addProduct,
    removeProduct,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};
