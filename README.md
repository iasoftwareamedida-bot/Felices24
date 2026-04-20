# ✨ Galería Interactiva de Corazones y Flores

Este proyecto es una web de galería fotográfica con animaciones fluidas, música de fondo persistente y almacenamiento local optimizado. Está listo para ser desplegado en **Netlify**.

## 📂 Estructura del Proyecto
- `index.html`: Punto de entrada principal.
- `css/`: Estilos y animaciones.
- `js/`: Lógica de IndexedDB y efectos de partículas.
- `netlify.toml`: Configuración de despliegue y seguridad para Netlify.

## 🚀 Cómo desplegar en Netlify

Tienes dos opciones muy sencillas:

### Opción 1: Arrastrar y Soltar (Recomendado para revisión rápida)
1. Inicia sesión en tu cuenta de [Netlify](https://app.netlify.com/).
2. Ve a la sección **"Sites"**.
3. Arrastra la carpeta completa `InteractiveGallery` al recuadro que dice **"Drag and drop your site output folder here"**.
4. ¡Listo! Tu web estará en línea en segundos.

### Opción 2: Usando GitHub (Para actualizaciones automáticas)
1. Sube esta carpeta a un nuevo repositorio en GitHub.
2. En Netlify, selecciona **"Add new site" > "Import an existing project"**.
3. Elige GitHub y selecciona tu repositorio.
4. Asegúrate que el "Publish directory" sea `.` (o déjalo vacío).
5. Haz clic en **"Deploy"**.

## 🛠️ Notas de Desarrollo
- **Almacenamiento**: Utiliza *IndexedDB* del navegador. Los datos no se pierden al recargar, pero son locales al dispositivo del usuario.
- **Optimización**: Las imágenes se comprimen al 80% de calidad y se redimensionan a 1200px para maximizar el rendimiento en hosting estático.

---
Hecho con ❤️ para un despliegue perfecto.
