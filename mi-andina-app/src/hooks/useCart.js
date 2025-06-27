import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

/**
 * Hook personalizado para acceder al contexto del carrito
 * Proporciona acceso a todas las funciones y datos del carrito
 * 
 * @returns {Object} Objeto con todas las funciones y datos del carrito
 */
const useCart = () => {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  
  return context;
};

export { useCart };
export default useCart; 