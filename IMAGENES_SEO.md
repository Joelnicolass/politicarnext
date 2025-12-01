# Guía de Imágenes SEO

## Imágenes Requeridas para SEO Completo

### 1. Open Graph Image

- **Archivo**: `/public/og-image.png`
- **Dimensiones**: 1200x630px
- **Formato**: PNG o JPG
- **Contenido sugerido**: Logo del juego + título dinámico + fondo temático
- **Uso**: Facebook, LinkedIn, WhatsApp al compartir el link

### 2. Twitter Image

- **Archivo**: `/public/twitter-image.png`
- **Dimensiones**: 1200x630px (mismo que OG)
- **Formato**: PNG o JPG
- **Contenido**: Puede ser el mismo que og-image.png
- **Uso**: Twitter/X al compartir el link

### 3. Apple Touch Icon

- **Archivo**: `/public/apple-touch-icon.png`
- **Dimensiones**: 180x180px
- **Formato**: PNG con fondo (no transparente)
- **Uso**: iOS cuando se agrega al Home Screen

### 4. PWA Icons

- **Archivo**: `/public/icon-192.png`
  - Dimensiones: 192x192px
  - Formato: PNG con transparencia
- **Archivo**: `/public/icon-512.png`
  - Dimensiones: 512x512px
  - Formato: PNG con transparencia
  - Uso: PWA cuando se instala en Android/Desktop

### 5. Favicon

- **Archivo**: `/public/favicon.ico` (ya existe)
- Verificar que tenga múltiples tamaños: 16x16, 32x32, 48x48

## Herramientas Recomendadas

1. **Canva** (gratis): Para crear imágenes OG/Twitter
2. **RealFaviconGenerator**: https://realfavicongenerator.net/
3. **Squoosh**: https://squoosh.app/ para optimizar imágenes

## Notas Importantes

- Las imágenes deben ser **diferentes para cada dominio** si quieres branding único
- Considera crear `/public/og-image-choriplan.png` y `/public/og-image-ajuste.png`
- Luego podemos hacer que se sirvan dinámicamente según el dominio
