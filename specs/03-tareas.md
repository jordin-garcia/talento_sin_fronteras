# 03 · Tareas

Cada tarea indica los requisitos que cubre. Una tarea se marca como hecha solo cuando sus criterios de aceptación pasan.

## Fase A · Especificación
- [x] A1 Constitución (`00-constitucion.md`)
- [x] A2 Requisitos EARS (`01-requisitos.md`)
- [x] A3 Diseño y manifiesto de imágenes (`02-diseno.md`)
- [x] A4 Plan de tareas (este archivo)

## Fase B · Recursos visuales
- [x] B1 Script de generación con prompts versionados → `scripts/generar-imagenes.py` (P7)
- [x] B2 Generar fondos, guías, dioramas, objetos e íconos; revisar uno por uno y regenerar los defectuosos (P7, P8)
- [x] B3 Optimizar (recorte de bordes transparentes, conversión a WebP vía `astro:assets`) (R-10.4)
- [x] B4 Logo SVG propio + íconos PWA (R-10.2)

## Fase C · Base del proyecto
- [x] C1 Proyecto Astro + TS + GSAP + fuentes + PWA (R-10.2)
- [x] C2 Tokens de diseño y estilos globales (P8, P9)
- [x] C3 Datos centralizados: `sitio.ts`, `guiones.ts` (texto íntegro de los 5 guiones), `banco.ts` (R-10.6, R-2.4)
- [x] C4 `progreso.ts` (localStorage, solo niveles) (P1, R-2.6)

## Fase D · Inicio
- [x] D1 Header + Hero animado (R-1.1, R-1.2)
- [x] D2 Camino con estaciones, dibujo progresivo y cielo que amanece (R-1.3, R-1.4)
- [x] D3 Mapa del camino "Usted está aquí" (R-1.5)
- [x] D4 Reglas + Ofrece/No ofrece + Cierre + Footer (R-1.6)
- [x] D5 Movimiento reducido (R-1.7)

## Fase E · Niveles
- [x] E1 Plantilla común: encabezado, video con fachada, versión en texto, completar, navegación (R-2.x)
- [x] E2 Nivel 1: fórmula animada, juego "¿Lo compartiría?", verificar (R-3.x)
- [x] E3 Nivel 2: preguntas, tarjetas volteables, partes del CV, borrador privado (R-4.x)
- [x] E4 Nivel 3: generador guiado + detector de datos personales + copiar + abrir IA (R-5.x)
- [x] E5 Nivel 4: recordatorio, situaciones, advertencia, armador (R-6.x)
- [x] E6 Nivel 5: reflexión, 4 pasos, sin instrucciones armadas (R-7.x)

## Fase F · Morral, banco, reconocimiento y materiales
- [x] F1 Página Morral (R-8.1)
- [x] F2 Banco de ejemplos navegable (R-8.2)
- [x] F3 Reconocimiento en canvas + descarga (R-9.x)
- [x] F4 Materiales: tarjeta PNG, guía de bolsillo PDF, plantilla TXT, guía del facilitador PDF (R-8.1, R-8.3)

## Fase G · Verificación
- [x] G1 Pruebas de aceptación Playwright (móvil 390×844 y escritorio 1280×800)
- [x] G2 Revisión visual con capturas en 320/390/768/1280 (R-10.1)
- [x] G3 Revisión de red: ninguna petición a terceros antes de tocar un video (R-10.3, P1)
- [x] G4 Construcción de producción y README de despliegue (P10)

## Notas de ejecución (30-09-2026)
- B2: 33 de 34 imágenes generadas. `ixchel-senala` no se generó porque la cuenta de OpenAI se quedó sin créditos (`insufficient_quota`). No hace falta: los niveles de Ixchel usan las poses `celular` y `saludo`.
- C1: Astro 7 es incompatible con `@vite-pwa/astro`; se escribió a mano un manifest y un service worker equivalentes (`public/manifest.webmanifest`, `public/sw.js`).
- G1: 44/44 pruebas de aceptación pasando (`npm test`) en los proyectos `movil` (Pixel 7) y `escritorio` (1280×800).
