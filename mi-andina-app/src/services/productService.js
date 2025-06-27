// Simulación de latencia de red
const simulateNetworkDelay = (ms = 300) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Datos de productos con imágenes reales
const products = [
  {
    id: 1,
    name: 'Coca-Cola Sin Azúcar 1,5 LT',
    description: 'Botella Plástico No Retornable 1.5 Lts 1X6',
    price: 10129,
    oldPrice: 11005,
    unitPrice: 1688,
    hasPromotion: true,
    image: '/assets/coca-sin-azucar.png',
    category: 'gaseosa',
    suggested: true,
    suggestedQuantity: 5
  },
  {
    id: 2,
    name: 'Sprite Sin Azúcar 2 Litros',
    description: 'Bebida gaseosa sabor lima-limón',
    price: 2890,
    oldPrice: 3200,
    unitPrice: 1445,
    hasPromotion: true,
    image: '/assets/sprite-sin-azucar.png',
    category: 'gaseosa',
    suggested: true,
    suggestedQuantity: 3
  },
  {
    id: 3,
    name: 'Corona Extra 355ml',
    description: 'Cerveza premium mexicana',
    price: 1850,
    unitPrice: 1850,
    hasPromotion: false,
    image: '/assets/corona.png',
    category: 'cerveza',
    suggested: false
  },
  {
    id: 4,
    name: 'Fanta Sin Azúcar 2 Litros',
    description: 'Bebida gaseosa sabor naranja',
    price: 2650,
    oldPrice: 2890,
    unitPrice: 1325,
    hasPromotion: true,
    image: '/assets/fanta-sin-azucar.png',
    category: 'gaseosa',
    suggested: false
  },
  {
    id: 5,
    name: 'Stella Artois 330ml',
    description: 'Cerveza premium belga',
    price: 2100,
    unitPrice: 2100,
    hasPromotion: false,
    image: '/assets/stella-artois.png',
    category: 'cerveza',
    suggested: false
  },
  {
    id: 6,
    name: 'Aquarius Manzana 500ml',
    description: 'Bebida isotónica sabor manzana',
    price: 1200,
    unitPrice: 1200,
    hasPromotion: false,
    image: '/assets/aquarius-manzana.png',
    category: 'deportiva',
    suggested: false
  },
  {
    id: 7,
    name: 'Del Valle Naranja Sin Azúcar',
    description: 'Jugo natural de naranja sin azúcar añadida',
    price: 1850,
    oldPrice: 2100,
    unitPrice: 1850,
    hasPromotion: true,
    image: '/assets/del-valle-naranaja-sin-azucar.png',
    category: 'jugos',
    suggested: false
  },
  {
    id: 8,
    name: 'Vital Con Gas 500ml',
    description: 'Agua mineral natural con gas',
    price: 950,
    unitPrice: 950,
    hasPromotion: false,
    image: '/assets/vital-con-gas.png',
    category: 'agua',
    suggested: false
  },
  {
    id: 9,
    name: 'Alto del Carmen Pisco',
    description: 'Pisco premium chileno 40°',
    price: 8500,
    unitPrice: 8500,
    hasPromotion: false,
    image: '/assets/alto-del-carmen.png',
    category: 'licores',
    suggested: false
  }
];

// Datos de categorías
const categories = [
  { 
    id: 1, 
    name: 'Promos', 
    icon: 'promo', 
    isNew: false,
    color: '#ffffff'
  },
  { 
    id: 2, 
    name: 'Sugeridos', 
    icon: 'suggested', 
    isNew: true,
    color: '#de0b1c'
  },
  { 
    id: 3, 
    name: 'Gaseosa', 
    icon: 'soda', 
    isNew: false,
    color: '#ffffff'
  },
  { 
    id: 4, 
    name: 'Jugos', 
    icon: 'juice', 
    isNew: false,
    color: '#ffffff'
  },
  { 
    id: 5, 
    name: 'Agua', 
    icon: 'water', 
    isNew: false,
    color: '#ffffff'
  },
  { 
    id: 6, 
    name: 'Piscos y licores', 
    icon: 'liquor', 
    isNew: false,
    color: '#ffffff'
  },
  { 
    id: 7, 
    name: 'Energéticas', 
    icon: 'energy', 
    isNew: false,
    color: '#ffffff'
  }
];

// Datos del último pedido
const lastOrder = {
  id: 'ORD-2024-001',
  date: '2024-01-15',
  total: 25038,
  products: [
    {
      product: {
        id: 1,
        name: 'Coca-Cola Sin Azúcar 1,5 LT',
        description: 'Botella Plástico No Retornable 1.5 Lts 1X6',
        price: 10129,
        oldPrice: 11005,
        unitPrice: 1688,
        hasPromotion: true,
        image: '/assets/coca-sin-azucar.png',
        category: 'gaseosa'
      },
      quantity: 2
    },
    {
      product: {
        id: 2,
        name: 'Sprite Sin Azúcar 2 Litros',
        description: 'Bebida gaseosa sabor lima-limón',
        price: 2890,
        oldPrice: 3200,
        unitPrice: 1445,
        hasPromotion: true,
        image: '/assets/sprite-sin-azucar.png',
        category: 'gaseosa'
      },
      quantity: 1
    }
  ]
};

// Datos de banners
const banners = [
  {
    id: 1,
    title: 'Alto del Carmen',
    image: '/assets/banner-alto-carmen.png',
    link: '/categoria/licores'
  },
  {
    id: 2,
    title: 'Acompaña Mundial de Clubes',
    image: '/assets/banner-acompaña-mundial-clubes.png',
    link: '/promociones/mundial'
  },
  {
    id: 3,
    title: '50% OFF',
    image: '/assets/banner-50-off.png',
    link: '/promociones/50-off'
  }
];

/**
 * Obtiene todos los productos
 * @returns {Promise<Array>} Lista de productos
 */
export const getProducts = async () => {
  await simulateNetworkDelay();
  return products;
};

/**
 * Obtiene productos promocionales
 * @returns {Promise<Array>} Lista de productos en promoción
 */
export const getPromotedProducts = async () => {
  await simulateNetworkDelay();
  return products.filter(product => product.hasPromotion);
};

/**
 * Obtiene productos sugeridos para Pedido Purete
 * @returns {Promise<Array>} Lista de productos sugeridos
 */
export const getSuggestedProducts = async () => {
  await simulateNetworkDelay();
  return products.filter(product => product.suggested);
};

/**
 * Obtiene productos por categoría
 * @param {string} categoryName - Nombre de la categoría
 * @returns {Promise<Array>} Lista de productos de la categoría
 */
export const getProductsByCategory = async (categoryName) => {
  await simulateNetworkDelay();
  if (categoryName === 'promos') {
    return products.filter(product => product.hasPromotion);
  }
  if (categoryName === 'sugeridos') {
    return products.filter(product => product.suggested);
  }
  return products.filter(product => product.category === categoryName.toLowerCase());
};

/**
 * Obtiene las categorías disponibles
 * @returns {Promise<Array>} Lista de categorías
 */
export const getCategories = async () => {
  await simulateNetworkDelay();
  return categories;
};

/**
 * Obtiene los datos del último pedido
 * @returns {Promise<Object>} Datos del último pedido
 */
export const getLastOrder = async () => {
  await simulateNetworkDelay();
  return lastOrder;
};

/**
 * Obtiene los banners para el carrusel
 * @returns {Promise<Array>} Lista de banners
 */
export const getBanners = async () => {
  await simulateNetworkDelay(150); // Menor latencia para banners
  return banners;
};

/**
 * Calcula el total de productos sugeridos
 * @returns {Promise<number>} Precio total de productos sugeridos
 */
export const getSuggestedProductsTotal = async () => {
  await simulateNetworkDelay(100);
  const suggestedProducts = products.filter(product => product.suggested);
  return suggestedProducts.reduce((total, product) => {
    const quantity = product.suggestedQuantity || 1;
    return total + (product.price * quantity);
  }, 0);
};

/**
 * Simula agregar todos los productos sugeridos al carrito
 * @returns {Promise<Object>} Resultado de la operación
 */
export const addAllSuggestedToCart = async () => {
  await simulateNetworkDelay(200);
  const suggestedProducts = products.filter(product => product.suggested);
  return {
    success: true,
    products: suggestedProducts.map(product => ({
      ...product,
      quantity: product.suggestedQuantity || 1
    })),
    total: await getSuggestedProductsTotal()
  };
};

/**
 * Simula repetir el último pedido
 * @returns {Promise<Object>} Resultado de la operación
 */
export const repeatLastOrder = async () => {
  await simulateNetworkDelay(250);
  return {
    success: true,
    order: lastOrder,
    products: lastOrder.products
  };
};

// Función de utilidad para formatear precios
export const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0
  }).format(price);
}; 