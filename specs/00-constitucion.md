# 00 · Constitución del proyecto

> Spec-Driven Development: este documento fija los principios que **ninguna** especificación, diseño o línea de código puede contradecir. Si un requisito entra en conflicto con la constitución, gana la constitución y el requisito se reescribe.

Fuentes: *Propuesta Talento Sin Fronteras* (Fase 1), *Talento Sin Fronteras – Fase 2*, *Textos completos de los cinco videos*, decisiones del equipo del 30-09-2026.

## Principios

| # | Principio | Consecuencia verificable en la plataforma |
|---|---|---|
| P1 | **Privacidad por diseño** | Ningún dato sale del teléfono: sin registro, sin cuentas, sin formularios enviados, sin analítica, sin cookies propias. Lo único que se guarda (en `localStorage`) es qué niveles se completaron. Los textos que la persona escribe **no** se guardan. |
| P2 | **Nunca comparta · Siempre verifique** | Las dos reglas aparecen en el inicio, en cada nivel y en los materiales. El generador advierte si detecta datos personales (DPI, teléfono, correo). |
| P3 | **Autonomía frente a asistencialismo** | La plataforma enseña la fórmula *Quién · Qué · Cómo* con andamiaje decreciente: total (N1) → parcial (N2–N3) → mínimo (N4) → nulo (N5). En el Nivel 5 **no** se muestra ninguna instrucción armada. |
| P4 | **Dignidad y lenguaje** | Trato de *usted*, lenguaje llano, frases cortas, reconocimiento explícito de la experiencia de la persona. Nada de tono paternalista. Todos los ejemplos dicen "Ejemplo ficticio". |
| P5 | **Veracidad y no falsas expectativas** | Se dice claramente que la plataforma no gestiona empleo, no hace trámites y no da asesoría legal. El reconocimiento es de participación, no una certificación oficial. |
| P6 | **Neutralidad de marca en materiales** | Tarjeta, guía, banco y plantilla dicen "la herramienta de inteligencia artificial". Excepción acordada: el botón "Abrir la herramienta de IA" enlaza a ChatGPT (con Gemini como alternativa). |
| P7 | **Originalidad visual** | Todas las imágenes son originales, generadas para este proyecto (OpenAI Images API con prompts propios) o dibujadas en SVG. No se reutiliza la imagen de referencia ni la hoja de personajes. Sin logo ni escudo de la URL. |
| P8 | **Atractivo visual primero, en móvil** | Diseño *mobile-first* tipo "mapa de aventura" (videojuego), totalmente animado, ambientado en el Lago de Atitlán, con dos guías infantiles en traje típico. Debe verse impecable en 360–430 px de ancho y también en escritorio. |
| P9 | **Accesibilidad** | Texto base ≥ 17 px, contraste AA, botones ≥ 48 px, foco visible, `prefers-reduced-motion` respetado, imágenes con texto alternativo. |
| P10 | **Continuidad** | Sitio estático desplegable en cualquier hosting gratuito; los contenidos (textos, IDs de video, nombres) se editan en archivos de datos sin tocar componentes. |

## Decisiones del equipo (30-09-2026) que reemplazan a los documentos

- Se **descarta** el enfoque "gama baja / sin conexión": el público tiene teléfono con internet (lo necesita para usar la IA). Se conserva la PWA instalable, pero no se optimiza para uso sin conexión.
- Videos en **YouTube en modo oculto** (aún no grabados → cada nivel muestra un estado "Video en preparación" y su versión en texto).
- Personajes: **niños**, todos con **traje típico**; **dos guías** (niña y niño).
- Paisaje: **Lago de Atitlán**; cielo que avanza de la madrugada al amanecer conforme se avanza en la ruta.
- Reconocimiento **digital**: la persona escribe su nombre, se genera y descarga en el teléfono; solo lleva el logo y el nombre de la plataforma.
- Sin audio. Solo español. Sin datos de contacto. Hosting por decidir.
