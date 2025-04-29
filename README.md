# LostBot Games - Plataforma de Juegos

## Descripción General

LostBot Games es una plataforma web para compra, gestión y descubrimiento de videojuegos. La aplicación cuenta con características como:

- Tienda de juegos con categorías, filtros y búsquedas
- Sistema de autenticación de usuarios
- Biblioteca de juegos para usuarios registrados
- Carrusel de destacados y secciones de juegos recomendados
- Acceso a juegos en la nube directamente desde el navegador
- Diseño responsive que se adapta a diferentes dispositivos

## Estructura de la Aplicación

La aplicación está construida utilizando React con Vite como bundler, y utiliza React Router para la navegación. La estructura principal es:

- **Rutas Públicas**: Accesibles por cualquier visitante (Home, Login, Registro, Tienda)
- **Rutas Protegidas**: Solo disponibles para usuarios autenticados (Biblioteca, Perfil)
- **Componentes de Layout**: Definen la estructura general de las páginas (PublicLayout, OutletContent)
- **Contexto de Autenticación**: Gestiona el estado de autenticación del usuario en toda la app

## Funcionalidades Principales

### Sistema de Autenticación

- Login con email y contraseña
- Mantenimiento de sesión mediante token almacenado en localStorage
- Protección de rutas privadas con redirección a login

### Navegación

- Barra de navegación adaptativa que muestra diferentes opciones según el estado de autenticación
- Menú para usuarios no autenticados: Tienda, Categorías, Login
- Menú para usuarios autenticados: Tienda, Biblioteca, Mi Cuenta, Logout

### Tienda de Juegos

- Visualización de juegos en grid con información detallada
- Filtros por categoría y ofertas
- Carrusel de juegos destacados
- Banner promocional

### Zona de Juegos en la Nube

- Acceso a juegos que se pueden jugar directamente desde el navegador
- Filtrado por categoría de juego
- Enlaces directos a las plataformas de juego

## Cómo funciona la aplicación

### Flujo del Usuario

1. Un visitante puede navegar por la tienda y ver los juegos disponibles
2. Para comprar o acceder a su biblioteca, debe iniciar sesión
3. Al hacer login, se validan las credenciales y se almacena un token de autenticación
4. Una vez autenticado, el usuario tiene acceso a funciones adicionales como su biblioteca
5. El usuario puede cerrar sesión en cualquier momento

### Protección de Rutas

Utilizamos un componente `ProtectedRoute` que verifica si el usuario está autenticado:
- Si está autenticado, permite el acceso a la ruta solicitada
- Si no está autenticado, redirige al usuario a la página de login

### Estado de Autenticación

El estado de autenticación se gestiona a través de un contexto de React (`AuthContext`), que proporciona:
- Información sobre el usuario actual
- Funciones para login y cerrar sesion
- Función para verificar si el usuario está autenticado

## Cómo ejecutar el proyecto

1. Clona el repositorio:
```bash
git clone <URL-del-repositorio>
```

2. Instala las dependencias:
```bash
cd Proyecto_react/myapp
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre el navegador en la dirección indicada (normalmente http://localhost:5173)

## Credenciales de prueba

Para probar la aplicación, puedes utilizar las siguientes credenciales:

- Email: usuario@ejemplo.com
- Contraseña: contraseña

## Tecnologías utilizadas

- React 19
- React Router v7
- Vite
- CSS Modules
- Local Storage para persistencia de sesión

## Autores

- [Nombre del Estudiante]
