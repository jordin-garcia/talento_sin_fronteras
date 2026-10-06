# Talento Sin Fronteras · Plataforma

PWA de la ruta de aprendizaje «Inteligencia artificial para su vida laboral». Sitio estático hecho con Astro, sin registro y sin recolección de datos.

Las especificaciones (Spec-Driven Development) están en [`../specs/`](../specs/). Ningún cambio debe contradecir [`00-constitucion.md`](../specs/00-constitucion.md).

## Requisitos
- Node 20 o superior (probado con Node 24)
- Python 3 con `requests` (solo para regenerar imágenes)

## Comandos

| Comando | Qué hace |
|---|---|
| `npm install` | Instala dependencias |
| `npm run dev` | Servidor de desarrollo en http://localhost:4321 |
| `npm run build` | Genera el sitio final en `dist/` |
| `npm run preview` | Sirve `dist/` para revisarlo |
| `npm test` | Pruebas de aceptación (requiere `npm run build` y `npx playwright install chromium`) |
| `npm run materiales` | Regenera tarjeta, guía de bolsillo, guía del facilitador y plantilla en `public/materiales/` |
| `npm run imagenes` | Regenera las ilustraciones con la API de OpenAI y las optimiza (requiere `.env` con `OPENAI_API_KEY`) |

## Tareas frecuentes

**Agregar un video cuando esté grabado.** Súbalo a YouTube como *oculto*, copie el ID (lo que va después de `v=` en el enlace) y péguelo en `youtubeId` del nivel correspondiente en `src/data/sitio.ts`. Luego ejecute `npm run build`.

**Cambiar textos, nombres de las guías o la herramienta de IA.** Todo está en `src/data/sitio.ts`. Los casos del banco de ejemplos están en `src/data/banco.ts`.

**Actualizar la versión en texto de los videos.** Edite el `.docx` de guiones en la carpeta del proyecto y ejecute `python scripts/extraer-guiones.py`.

## Publicación (hosting por decidir)
`dist/` es un sitio estático que funciona en cualquier hosting gratuito:
- **Netlify / Cloudflare Pages / Vercel:** comando `npm run build`, carpeta `dist`.
- **GitHub Pages en una subcarpeta:** compile con `BASE=/nombre-del-repo SITIO_URL=https://usuario.github.io npm run build`.

Defina `SITIO_URL` con la dirección final para que la vista previa al compartir por WhatsApp muestre la imagen correcta. Después genere el código QR con esa dirección.

## Privacidad
- No hay analítica, cookies ni formularios que envíen datos.
- Solo se guarda en el teléfono la clave `tsf:progreso` (qué niveles se completaron).
- YouTube se contacta únicamente cuando la persona toca «Ver video» (dominio `youtube-nocookie.com`).
- El reconocimiento se dibuja en el teléfono; el nombre no se guarda ni se envía.
- La API key de OpenAI solo se usa en `scripts/generar-imagenes.py` (en tiempo de desarrollo) y **nunca** forma parte del sitio publicado. `.env` está en `.gitignore`.
