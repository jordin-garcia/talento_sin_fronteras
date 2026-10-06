# Plan de desarrollo · Talento Sin Fronteras

Plataforma web (PWA) de la ruta de aprendizaje en inteligencia artificial generativa para personas migrantes retornadas en Guatemala. Proyecto de Responsabilidad Social Universitaria, curso de Ética Aplicada.

**Metodología: Spec-Driven Development.** La especificación es la fuente de verdad. Primero se escriben la constitución, los requisitos y el diseño; después las tareas; luego se implementa y cada requisito se verifica con una prueba de aceptación automatizada.

## Documentos de especificación

| # | Documento | Contenido |
|---|---|---|
| 00 | [Constitución](specs/00-constitucion.md) | 10 principios no negociables (privacidad por diseño, *Nunca comparta · Siempre verifique*, andamiaje decreciente, dignidad, veracidad…) y decisiones del equipo del 30-09-2026 |
| 01 | [Requisitos](specs/01-requisitos.md) | 40+ requisitos en formato EARS con criterio de aceptación (R-1 Inicio … R-10 Transversales) |
| 02 | [Diseño](specs/02-diseno.md) | Arquitectura, sistema visual (paleta, logo, personajes), manifiesto de imágenes, páginas, texto exacto del generador, materiales |
| 03 | [Tareas](specs/03-tareas.md) | Fases A–G con trazabilidad a requisitos y estado |

## Fuentes analizadas
- *Propuesta Talento Sin Fronteras* (Fase 1): problema, ética, PWA, fórmula Quién · Qué · Cómo, 4 módulos, materiales.
- *Talento Sin Fronteras – Fase 2*: beneficiarios, acción, recursos, cronograma, consideraciones éticas 10.1–10.8.
- *Textos completos de los cinco videos*: 5 guiones, 28 escenas. Son la base literal de la «versión en texto» de cada nivel.
- Imágenes de referencia: «Ruta de aprendizaje» (estilo mapa de aventura) y «Personajes guatemaltecos» (solo como inspiración; P7).

## Arquitectura en una línea
Astro (HTML estático) + TypeScript + GSAP/ScrollTrigger + ilustraciones originales generadas con OpenAI Images (`gpt-image-2` / `gpt-image-1.5`) + PWA propia + materiales generados con Playwright + pruebas de aceptación con Playwright. Código en [`plataforma/`](plataforma/) ([README](plataforma/README.md)).

## Estructura de la experiencia

```
Inicio (Lago de Atitlán de madrugada, guías Ixchel y Balam)
  └─ Camino de piedras que se dibuja al bajar; el cielo amanece
      ├─ Nivel 1 · Su asistente de IA ............ Módulo 1 · Video 1 · apoyo TOTAL
      ├─ Nivel 2 · Su experiencia vale ........... Módulo 2 · Video 2 · apoyo PARCIAL
      ├─ Nivel 3 · El generador de currículum .... Módulo 2 · Video 3 · apoyo PARCIAL
      ├─ Nivel 4 · La misma fórmula sirve para más Módulo 3 · Video 4 · apoyo MÍNIMO
      ├─ Nivel 5 · Ahora le toca a usted ......... Módulo 4 · Video 5 · apoyo NULO
      └─ Final · Su morral de herramientas → materiales, banco de ejemplos, reconocimiento
  └─ Mapa del camino («Usted está aquí») · Reglas de oro · Ofrece / No ofrece · Amanecer
```

## Estado (30-09-2026)
- Fases A–G completas: plataforma construida y **44/44 pruebas de aceptación** pasando en móvil (Pixel 7) y escritorio (1280×800).
- Pendientes que dependen del equipo:
  1. **Grabar los 5 videos** y pegar sus IDs de YouTube en `plataforma/src/data/sitio.ts`. Mientras tanto, cada nivel muestra «Video en preparación» y la versión en texto.
  2. **Decidir el hosting** y publicar `plataforma/dist/` (instrucciones en el README). Después, generar el QR con la dirección final.
  3. Ajuste del guion del Video 3 (escena 6): la instrucción del generador deja entre corchetes **[NOMBRE], [TELÉFONO], [CORREO] y [MUNICIPIO]**; el guion menciona solo teléfono y correo.
  4. Validar con Carlos (parte formativa del Módulo 2) el texto de la instrucción del generador (`specs/02-diseno.md`).
  5. Prueba piloto interna con 2–3 personas antes del primer taller.
