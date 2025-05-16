# 🎮 LostBot Games - Plataforma de Juegos

## 📝 Descripción General

LostBot Games es una plataforma web para compra, gestión y descubrimiento de videojuegos. La aplicación cuenta con características como:

- 🛒 Tienda de juegos con categorías, filtros y búsquedas
- 🔐 Sistema de autenticación de usuarios
- 📚 Biblioteca de juegos para usuarios registrados
- 🌟 Carrusel de destacados y secciones de juegos recomendados
- ☁️ Acceso a juegos en la nube directamente desde el navegador
- 📱 Diseño responsive que se adapta a diferentes dispositivos
- 💳 Flujo completo de compra de juegos
- 👤 Perfil de usuario personalizado
- 🌙 Interfaz moderna con tema oscuro

---

## 🏗️ Estructura de la Aplicación

La aplicación está construida utilizando React con Vite como bundler, y utiliza React Router para la navegación. La estructura principal es:

- **Rutas Públicas**: Accesibles por cualquier visitante (Home, Login, Registro, Tienda)
- **Rutas Protegidas**: Solo disponibles para usuarios autenticados (Biblioteca, Perfil, Compras)
- **Componentes de Layout**: Definen la estructura general de las páginas (PublicLayout, OutletContent)
- **Contexto de Autenticación**: Gestiona el estado de autenticación del usuario en toda la app

---

## ⚙️ Funcionalidades Principales

### 🔑 Sistema de Autenticación

- Login con email y contraseña
- Mantenimiento de sesión mediante localStorage
- Protección de rutas privadas con redirección a login
- Pantalla de carga durante la verificación de autenticación
- Función de logout con eliminación de datos de sesión

### 🧭 Navegación

- Barra de navegación adaptativa que muestra diferentes opciones según el estado de autenticación
- Menú para usuarios no autenticados: Tienda, Categorías, Login
- Menú para usuarios autenticados: Tienda, Biblioteca, Mi Cuenta, Logout
- Manejo de errores con página 404 personalizada
- Layouts anidados para diferentes secciones de la aplicación

### 🏪 Tienda de Juegos (GameSection)

- Visualización de juegos en grid con información detallada
- Filtros por categoría y ofertas
- Carrusel interactivo de juegos destacados
- Banner promocional
- Diseño responsive para diferentes dispositivos

### 💰 Flujo de Compra

- Formulario de compra optimizado (CompraForm)
- Página de confirmación de compra exitosa (CompraSuccess)
- Integración con biblioteca de juegos del usuario

### 👤 Perfil de Usuario

- Visualización y edición de información personal
- Historial de compras
- Configuración de cuenta
- Gestión de métodos de pago

### 📚 Biblioteca de Juegos (ZonaJuego)

- Acceso a juegos adquiridos por el usuario
- Filtrado por categoría de juego
- Visualización de detalles de juegos
- Enlaces directos para jugar

### 🎨 Interfaz de Usuario

- Tema oscuro moderno optimizado para gaming
- Integración con Bootstrap y Bootstrap Icons
- Componentes reutilizables (Footer, Navbar, Carousel)
- Diseño responsive con media queries
- Imágenes de fondo personalizadas
- Efectos de transición para mejorar la experiencia de usuario

---

## 🔄 Cómo funciona la aplicación

### Flujo del Usuario

1. Un visitante puede navegar por la tienda y ver los juegos disponibles
2. Para comprar o acceder a su biblioteca, debe iniciar sesión
3. Al hacer login, se validan las credenciales y se almacenan en localStorage
4. Una vez autenticado, el usuario tiene acceso a funciones adicionales como su biblioteca y perfil
5. El usuario puede realizar compras a través del flujo de compra integrado
6. El usuario puede cerrar sesión en cualquier momento

### Protección de Rutas

Utilizamos un componente `ProtectedRoute` que verifica si el usuario está autenticado:

- Si está autenticado, permite el acceso a la ruta solicitada
- Si no está autenticado, redirige al usuario a la página de login
- Durante la verificación, muestra un indicador de carga

### Estado de Autenticación

El estado de autenticación se gestiona a través de un contexto de React (`AuthContext`), que proporciona:

- Información sobre el usuario actual
- Funciones para login y cerrar sesión
- Función para verificar si el usuario está autenticado
- Persistencia de sesión mediante localStorage

---

## 🚀 Cómo ejecutar el proyecto

1. Clona el repositorio:
   ```
   git clone http://https://github.com/IvanRamiro-05/LostBot-Games.git
   ```

2. Instala las dependencias:
   ```
   cd myapp
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```
   npm run dev
   ```

4. Abre el navegador en la dirección indicada (normalmente http://localhost:5173)

## 🔑 Credenciales de prueba

Para probar la aplicación, puedes utilizar las siguientes credenciales:

- **Email**: usuario@ejemplo.com
- **Contraseña**: contraseña123

---

## 💻 Tecnologías utilizadas

- React 19
- React Router v7
- Vite
- CSS Modules
- Bootstrap y Bootstrap Icons
- Local Storage para persistencia de sesión

---

## 👥 Autores

- Snheider Alejandro Olarte Saavedra - 2224656
- Alejandro Salazar Rincón - 2224640
- Juan Esteban Huertas - 2214231
- Iván Ramiro Suarez Diaz - 2224654
- Julian Javier Lizcano - 2224647

