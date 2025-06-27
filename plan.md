# 🚀 Plan de Desarrollo TDD - Mi Andina E-Commerce

## 📋 Resumen Ejecutivo

Este plan de desarrollo define **8 fases incrementales** para construir la aplicación "Mi Andina" siguiendo una metodología **TDD (Test-Driven Development)** estricta. Cada fase construye sobre la anterior y requiere la superación de pruebas específicas antes de avanzar.

---

## 🎯 FASE 0: Configuración Inicial del Proyecto

### Objetivo
Establecer la base técnica del proyecto con todas las herramientas y configuraciones necesarias para desarrollo con TDD.

### Pasos a seguir
1. **Crear proyecto con Vite:**
   ```bash
   npm create vite@latest mi-andina-app -- --template react
   cd mi-andina-app
   ```

2. **Instalar dependencias principales:**
   ```bash
   npm install @mui/material @emotion/react @emotion/styled
   npm install react-router-dom
   ```

3. **Instalar herramientas de desarrollo:**
   ```bash
   npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event
   npm install -D eslint prettier eslint-plugin-react eslint-plugin-react-hooks
   npm install -D husky lint-staged
   ```

4. **Crear estructura de carpetas:**
   ```
   src/
   ├── assets/
   ├── components/
   │   ├── common/
   │   ├── layout/
   │   └── ProductoCard/
   ├── contexts/
   ├── data/
   ├── hooks/
   ├── pages/
   └── styles/
   ```

5. **Configurar archivos base:**
   - `.eslintrc.json` con reglas para React
   - `.prettierrc` con formato consistente
   - `vite.config.js` con configuración para Vitest
   - `src/styles/theme.js` con tema MUI personalizado

### Pruebas TDD
N/A - Fase de configuración

### Entregable Visual
- Aplicación React básica ejecutándose en `http://localhost:5173`
- Página mostrando "Mi Andina" con tema MUI aplicado

---

## 🏗️ FASE 1: Estructura Base y Layout Principal

### Objetivo
Implementar la estructura visual base de la aplicación con Header, sistema de rutas y componentes de layout.

### Pasos a seguir
1. **Crear test para Header:**
   - Archivo: `src/components/layout/__tests__/Header.test.jsx`
   
2. **Implementar Header según diseño Figma:**
   - Logo centrado
   - Icono menú hamburguesa a la izquierda
   - Iconos notificaciones y carrito a la derecha
   - Badges con contadores

3. **Configurar React Router:**
   - Rutas: `/`, `/notificaciones`, `/carrito`
   
4. **Crear componente Layout wrapper**

### Pruebas TDD (Puerta para Fase 2)

**Archivo:** `src/components/layout/__tests__/Header.test.jsx`
```javascript
describe('Header Component', () => {
  test('debe renderizar el logo de Mi Andina', () => {})
  test('debe mostrar badge de notificaciones con contador', () => {})
  test('debe mostrar badge del carrito con contador', () => {})
  test('debe ser responsivo en móvil', () => {})
})
```

**Archivo:** `src/__tests__/App.test.jsx`
```javascript
describe('App Routing', () => {
  test('debe navegar a Home por defecto', () => {})
  test('debe navegar a /notificaciones', () => {})
  test('debe mantener el Header en todas las rutas', () => {})
})
```

### Entregable Visual
- Header completo con logo y badges visibles
- Navegación funcional entre rutas vacías
- Layout responsivo adaptándose a móvil/desktop

---

## 💾 FASE 2: CartContext con SessionStorage

### Objetivo
Implementar el sistema de estado global del carrito con persistencia en sessionStorage.

### Pasos a seguir
1. **Crear tests para CartContext:**
   - Archivo: `src/contexts/__tests__/CartContext.test.jsx`

2. **Implementar CartContext con funciones:**
   - `addProduct(product, quantity)`
   - `removeProduct(productId)`
   - `updateQuantity(productId, newQuantity)`
   - `clearCart()`
   - `getCartTotal()`

3. **Implementar persistencia en sessionStorage**

4. **Crear hook personalizado useCart**

5. **Integrar contador en Header**

### Pruebas TDD (Puerta para Fase 3)

**Archivo:** `src/contexts/__tests__/CartContext.test.jsx`
```javascript
describe('CartContext', () => {
  test('debe inicializar con carrito vacío', () => {})
  test('addProduct debe agregar nuevo producto correctamente', () => {})
  test('addProduct debe incrementar cantidad si producto existe', () => {})
  test('removeProduct debe eliminar producto del carrito', () => {})
  test('updateQuantity debe actualizar cantidad correctamente', () => {})
  test('debe persistir cambios en sessionStorage', () => {})
  test('debe recuperar carrito de sessionStorage al montar', () => {})
})
```

**Archivo:** `src/hooks/__tests__/useCart.test.jsx`
```javascript
describe('useCart Hook', () => {
  test('debe exponer todas las funciones del contexto', () => {})
  test('debe actualizar contador en tiempo real', () => {})
})
```

### Entregable Visual
- Badge del carrito en Header mostrando cantidad de items
- Contador actualizándose al manipular sessionStorage
- Persistencia verificable al recargar la página

---

## 🃏 FASE 3: Componente ProductoCard Interactivo

### Objetivo
Crear el componente ProductoCard completamente funcional e integrado con el carrito.

### Pasos a seguir
1. **Crear tests para ProductoCard:**
   - Archivo: `src/components/ProductoCard/__tests__/ProductoCard.test.jsx`

2. **Maquetar ProductoCard según Figma:**
   - Imagen del producto
   - Nombre y descripción
   - Tag de promoción (si aplica)
   - Precio actual y precio tachado
   - Precio por unidad
   - Selector de cantidad (+/-)
   - Botón "Agregar"

3. **Implementar lógica de cantidad local**

4. **Integrar con CartContext usando useCart**

5. **Añadir feedback visual al agregar**

### Pruebas TDD (Puerta para Fase 4)

**Archivo:** `src/components/ProductoCard/__tests__/ProductoCard.test.jsx`
```javascript
describe('ProductoCard Component', () => {
  const mockProduct = {
    id: 1,
    name: 'Coca-cola sin azúcar 1,5 LT',
    description: 'Botella Plastico No Retornable 1.5 Lts 1X6',
    price: 10129,
    oldPrice: 11005,
    unitPrice: 1688,
    hasPromotion: true,
    image: '/path/to/image.jpg'
  }

  test('debe renderizar toda la información del producto', () => {})
  test('selector cantidad debe iniciar en 1', () => {})
  test('botón + debe incrementar cantidad', () => {})
  test('botón - debe decrementar cantidad (mínimo 1)', () => {})
  test('debe mostrar tag promoción cuando hasPromotion=true', () => {})
  test('botón Agregar debe llamar a addProduct con cantidad correcta', () => {})
  test('debe mostrar feedback visual al agregar al carrito', () => {})
})
```

### Entregable Visual
- ProductoCard renderizado con todos sus elementos
- Selector de cantidad funcional
- Al agregar, el badge del carrito se actualiza
- Feedback visual (snackbar o animación) al agregar

---

## 🏠 FASE 4: Vista Home Completa

### Objetivo
Implementar la página Home con todas sus secciones según el diseño de Figma.

### Pasos a seguir
1. **Crear archivo de datos:**
   - `src/data/products.json` con productos de ejemplo

2. **Implementar secciones del Home:**
   - Carrusel de banners (puede ser estático inicialmente)
   - Botones de acceso rápido (Pedido Purete, Nuevo pedido, Mis pedidos)
   - Sección "¿Qué necesita tu negocio?" con categorías circulares
   - Grid de "Promociones destacadas"
   - Sección "Mi último pedido"

3. **Crear servicio para simular API:**
   - `src/services/productService.js`

### Pruebas TDD (Puerta para Fase 5)

**Archivo:** `src/pages/__tests__/Home.test.jsx`
```javascript
describe('Home Page', () => {
  test('debe renderizar carrusel de banners', () => {})
  test('debe mostrar 3 botones de acceso rápido', () => {})
  test('debe cargar y mostrar categorías', () => {})
  test('debe cargar productos desde productService', () => {})
  test('grid de productos debe ser scrolleable horizontalmente', () => {})
  test('cada ProductoCard debe ser funcional', () => {})
})
```

**Archivo:** `src/services/__tests__/productService.test.js`
```javascript
describe('Product Service', () => {
  test('getProducts debe retornar array de productos', async () => {})
  test('debe simular latencia de red', async () => {})
  test('getProductsByCategory debe filtrar correctamente', async () => {})
})
```

### Entregable Visual
- Home completo con todas las secciones visibles
- Productos cargándose con estado de loading
- ProductoCards funcionales agregando al carrito
- Diseño responsivo y fiel a Figma

---

## ⚡ FASE 5: Funcionalidad Pedido Purete

### Objetivo
Implementar la funcionalidad de compra masiva rápida de productos frecuentes.

### Pasos a seguir
1. **Crear componente PedidoPurete:**
   - Vista con productos sugeridos
   - Mostrar cantidad sugerida para cada producto
   - Precio total calculado dinámicamente

2. **Implementar lógica de selección múltiple**

3. **Botón "Agregar todos por $XXX.XXX"**

4. **Integrar con CartContext para agregar masivamente**

### Pruebas TDD (Puerta para Fase 6)

**Archivo:** `src/components/PedidoPurete/__tests__/PedidoPurete.test.jsx`
```javascript
describe('Pedido Purete', () => {
  test('debe mostrar productos frecuentes del usuario', () => {})
  test('debe mostrar cantidad sugerida para cada producto', () => {})
  test('precio total debe calcularse correctamente', () => {})
  test('debe actualizar precio al cambiar cantidades', () => {})
  test('botón agregar todos debe añadir múltiples productos', () => {})
  test('debe mostrar notificación de éxito tras agregar', () => {})
  test('debe navegar al carrito después de agregar', () => {})
})
```

### Entregable Visual
- Sección Pedido Purete expandida mostrando productos
- Precio total visible y actualizable
- Al agregar todos, el badge del carrito muestra suma total
- Feedback de éxito y redirección opcional

---

## 🔄 FASE 6: Funcionalidad Repetir Pedido

### Objetivo
Implementar la capacidad de reordenar el último pedido completo.

### Pasos a seguir
1. **Simular datos del último pedido:**
   - `src/data/lastOrder.json`

2. **Crear servicio getLastOrder**

3. **Mostrar preview en sección Home**

4. **Implementar botón "Repetir pedido"**

5. **Agregar todos los items al carrito**

### Pruebas TDD (Puerta para Fase 7)

**Archivo:** `src/components/RepetirPedido/__tests__/RepetirPedido.test.jsx`
```javascript
describe('Repetir Pedido', () => {
  test('debe mostrar productos del último pedido', () => {})
  test('debe mostrar fecha y total del pedido anterior', () => {})
  test('botón repetir debe estar visible y activo', () => {})
  test('debe agregar todos los productos con cantidades originales', () => {})
  test('debe mostrar confirmación tras repetir pedido', () => {})
  test('badge carrito debe actualizarse con suma total', () => {})
})
```

### Entregable Visual
- Sección "Mi último pedido" mostrando productos
- Botón "Repetir pedido" prominente
- Al hacer clic, todos los items se agregan al carrito
- Notificación de confirmación

---

## 🔔 FASE 7: Sistema de Notificaciones con Modal

### Objetivo
Implementar vista de notificaciones y modal interactivo para promociones.

### Pasos a seguir
1. **Crear página Notificaciones:**
   - Lista de notificaciones con título y preview
   - Indicador visual de no leídas

2. **Implementar Modal de detalle:**
   - Diseño según Figma (Promo Digital)
   - Imagen/ilustración
   - Descripción completa
   - Botones de acción

3. **Gestionar estado leído/no leído**

4. **Implementar acciones del modal**

### Pruebas TDD (Puerta para Finalización)

**Archivo:** `src/pages/__tests__/Notifications.test.jsx`
```javascript
describe('Notifications Page', () => {
  test('debe mostrar lista de notificaciones', () => {})
  test('debe mostrar indicador de no leídas', () => {})
  test('click en notificación debe abrir modal', () => {})
  test('modal debe mostrar información completa', () => {})
  test('botón "Comenzar pedido" debe cerrar modal y navegar', () => {})
  test('debe marcar notificación como leída al abrir', () => {})
})
```

### Entregable Visual
- Lista de notificaciones con diferentes estados
- Modal de promoción totalmente funcional
- Navegación desde modal hacia acciones específicas
- Badge de notificaciones actualizado en Header

---

## ✅ Criterios de Finalización

El proyecto se considera completo cuando:

1. **Todas las pruebas pasan** (comando: `npm test`)
2. **Cobertura de código > 80%** (comando: `npm run coverage`)
3. **Sin errores de linting** (comando: `npm run lint`)
4. **Build de producción exitoso** (comando: `npm run build`)
5. **Todas las funcionalidades del README implementadas**
6. **Fidelidad visual con diseños de Figma**

## 📊 Estimación de Tiempo

| Fase | Duración Estimada |
|------|------------------|
| Fase 0 | 4 horas |
| Fase 1 | 6 horas |
| Fase 2 | 8 horas |
| Fase 3 | 6 horas |
| Fase 4 | 10 horas |
| Fase 5 | 8 horas |
| Fase 6 | 6 horas |
| Fase 7 | 8 horas |
| **Total** | **56 horas** |

---

Este plan garantiza un desarrollo incremental, testeable y de alta calidad, donde cada fase construye sobre la anterior y ningún código se escribe sin su prueba correspondiente. ¡Éxito en el desarrollo! 🚀 