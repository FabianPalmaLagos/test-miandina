Mi Andina E-Commerce
Bienvenido al repositorio de Mi Andina, una moderna aplicación de e-commerce diseñada para ofrecer una experiencia de compra fluida, rápida y personalizada. Este proyecto se está construyendo desde cero utilizando las mejores prácticas del desarrollo Front-End con React.

Tabla de Contenidos
Visión del Proyecto

Pila Tecnológica (Tech Stack)

Características Principales

Estructura del Proyecto

Primeros Pasos (Getting Started)

Flujos de Aplicación Clave

Manejo de Estado

Visión del Proyecto
El objetivo de "Mi Andina" es crear una interfaz de usuario (UI) de alto rendimiento, responsiva y mantenible, basada en los diseños de Figma proporcionados. La aplicación se centrará en una experiencia de usuario intuitiva, permitiendo a los clientes realizar sus compras de manera eficiente, con funcionalidades clave como la recompra rápida y notificaciones personalizadas.

Este es un proyecto puramente Front-End. No se asume la existencia de un backend; toda la lógica de negocio y la persistencia de datos (como el carrito de compras) se simularán en el lado del cliente, utilizando sessionStorage del navegador.

Pila Tecnológica (Tech Stack)
La selección de tecnologías se ha realizado para garantizar un desarrollo rápido, un rendimiento óptimo y una base de código escalable.

Framework Principal: React 18+ para la construcción de la interfaz de usuario.

Herramienta de Build: Vite para un entorno de desarrollo y compilación extremadamente rápido.

Librería de Componentes: Material-UI (MUI) para la maquetación y estandarización de componentes. Se utilizará exclusivamente la librería gratuita MUI Core.

Gestión de Dependencias: npm o yarn.

Fuente de Datos (Simulada): Un fichero local products.json que contendrá la información de los productos disponibles.

Características Principales
La aplicación se estructura en torno a varios conceptos clave del dominio:

Home: La página de aterrizaje principal que actúa como centro de operaciones para el usuario. Contiene:

Un carrusel de banners promocionales.

Pedido Purete: Una sección para la recompra inteligente y masiva de productos frecuentes.

Listados de productos destacados y en promoción.

Repetir Pedido: Acceso directo para replicar el último pedido realizado por el usuario.

Producto Card: El componente atómico y reutilizable para mostrar cada producto. Incluye imagen, nombre, precio, un selector de cantidad y el botón "Agregar" para interactuar con el carrito.

Carrito (Cart): Un estado global que persiste en sessionStorage. Almacena los productos que el usuario desea comprar y es accesible desde toda la aplicación.

Notificaciones: Una vista dedicada a mostrar mensajes relevantes para el usuario, como promociones especiales o actualizaciones.

Modal de Notificación: Una ventana emergente que proporciona detalles sobre una notificación específica, ofreciendo a menudo una llamada a la acción (CTA) directa.

Estructura del Proyecto
Para mantener el código organizado, escalable y fácil de navegar, propondremos la siguiente estructura de carpetas:

/src/
|-- /assets/              # Imágenes, fuentes, y otros archivos estáticos
|-- /components/          # Componentes de UI reutilizables
|   |-- /common/          # Componentes genéricos (Button, Input, Modal)
|   |-- /layout/          # Componentes de estructura (Header, Footer, Sidebar)
|   |-- /ProductoCard/    # Componente específico del Producto Card
|   `-- ...
|-- /contexts/            # Contextos de React para el manejo de estado global
|   `-- CartContext.jsx   # Lógica y estado del Carrito de Compras
|-- /data/                # Archivos JSON con datos mock (simulados)
|   `-- products.json     # Base de datos de productos
|-- /hooks/               # Hooks personalizados
|   `-- useCart.js        # Hook para interactuar con CartContext
|-- /pages/               # Componentes que actúan como vistas/pantallas completas
|   |-- Home.jsx
|   |-- Notifications.jsx
|   `-- Cart.jsx
|-- /styles/              # Estilos globales o temas de MUI
|   `-- theme.js          # Definición del tema de Material-UI
|-- App.jsx               # Componente raíz y configuración de rutas
`-- main.jsx              # Punto de entrada de la aplicación
Primeros Pasos (Getting Started)
Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno de desarrollo local.

Prerrequisitos:

Node.js (versión 18 o superior)

npm o yarn

Instalación:

Clona el repositorio (cuando exista):

Bash
git clone <URL_DEL_REPOSITORIO>
cd mi-andina-app
Instala las dependencias:

Bash
npm install
o si usas yarn:

Bash
yarn install
Ejecuta el servidor de desarrollo:

Bash
npm run dev
o si usas yarn:

Bash
yarn dev
Abre tu navegador y visita http://localhost:5173 (o el puerto que Vite indique) para ver la aplicación en funcionamiento.

Flujos de Aplicación Clave
1. Adición de un Producto al Carrito

El usuario navega por la Home y localiza un Producto Card de su interés.

Utiliza el selector de cantidad dentro del Producto Card para definir cuántas unidades desea.

Al hacer clic en el botón "Agregar", el producto y su cantidad se añaden al estado del Carrito.

El estado del Carrito se actualiza inmediatamente en sessionStorage.

El ícono del carrito en la cabecera (Header) actualiza su contador para reflejar el nuevo número de ítems.

2. Repetir un Pedido Anterior

En la Home, el usuario encuentra la sección "Mi último pedido".

Al hacer clic en el botón "Repetir pedido", la aplicación lee una lista simulada de productos del pedido anterior.

Todos los productos de esa lista se agregan masivamente al Carrito actual.

Se notifica al usuario (por ejemplo, con un toast/snackbar) que los productos han sido añadidos exitosamente.

Manejo de Estado
Para el estado global, principalmente el Carrito de Compras, utilizaremos la API Context de React. Este enfoque nos permite compartir el estado entre componentes sin necesidad de "prop drilling".

CartContext.jsx: Centralizará el array de productos del carrito (cartItems), así como las funciones para manipularlo (addProduct, removeProduct, updateQuantity, clearCart).

Inicialización desde sessionStorage: El CartProvider leerá el sessionStorage al montarse para recuperar un carrito existente, garantizando la persistencia durante la sesión del usuario.

Hook useCart(): Se creará un hook personalizado useCart para proporcionar un acceso limpio y sencillo al contexto desde cualquier componente que lo necesite.
