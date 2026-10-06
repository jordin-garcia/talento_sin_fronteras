# 02 · Diseño

## 1. Arquitectura

- **Framework:** Astro (salida estática, HTML por página, islas de JS solo donde hay interacción) + TypeScript.
- **Animación:** GSAP + ScrollTrigger (cielo, camino, estaciones, parallax) y CSS (luciérnagas, faroles, flotación, brillo). Todo condicionado por `prefers-reduced-motion`.
- **Imágenes:** generadas con OpenAI Images API (`gpt-image-2` para fondos, `gpt-image-1.5` con fondo transparente para personajes, dioramas, objetos e íconos) y optimizadas con `astro:assets` (WebP/AVIF responsivo).
- **Tipografía:** `Baloo 2` (títulos, redondeada, de videojuego) y `Nunito` (texto), autoalojadas con `@fontsource`.
- **PWA:** `@vite-pwa/astro` (manifest + service worker con caché de recursos estáticos).
- **Materiales:** HTML propios → PNG/PDF con Playwright en tiempo de construcción (`scripts/materiales.mjs`).
- **Estado:** `localStorage["tsf:progreso"] = {"1":true,...}`. Nada más se persiste.
- **Pruebas:** Playwright (aceptación de requisitos en viewport móvil y escritorio).

```
plataforma/
├─ scripts/            generar-imagenes.py · materiales.mjs · materiales/*.html
├─ public/materiales/  tarjeta-formula.png · guia-de-bolsillo.pdf · plantilla-curriculum.txt · guia-del-facilitador.pdf
├─ src/
│  ├─ data/            sitio.ts (niveles, guías, IDs YouTube) · guiones.ts · banco.ts
│  ├─ assets/img/      imágenes generadas (fuente)
│  ├─ components/      Logo, Header, Hero, Camino, Estacion, MapaCamino, Reglas, OfreceNo,
│  │                   Video, VersionTexto, NivelHeader, NivelNav, Completar, Generador, Armador ...
│  ├─ layouts/Base.astro
│  ├─ pages/           index · nivel/1..5 · morral · banco · reconocimiento · 404
│  ├─ scripts/         progreso.ts · animaciones.ts · generador.ts · datos-personales.ts · confeti.ts · reconocimiento.ts
│  └─ styles/          tokens.css · global.css
└─ tests/              aceptacion.spec.ts
```

## 2. Sistema visual

**Concepto:** "El camino del lago". La persona recorre de noche la orilla del Lago de Atitlán guiada por **Ixchel** (niña) y **Balam** (niño); cada nivel es un diorama mágico iluminado; al avanzar, el cielo amanece. El Morral final contiene las herramientas que la persona se lleva.

### Paleta (tokens)

| Token | Valor | Uso |
|---|---|---|
| `--noche-950` | `#0a0c2a` | fondo profundo |
| `--noche-900` | `#11154a` | fondo |
| `--noche-700` | `#25307a` | tarjetas |
| `--lago` | `#2a6fdb` | acentos fríos |
| `--quien` | `#b06bff` (violeta) | parte QUIÉN |
| `--que` | `#22c3d0` (turquesa) | parte QUÉ |
| `--como` | `#ffbf3c` (maíz) | parte CÓMO |
| `--nunca` | `#ff5d73` | Nunca comparta |
| `--verifique` | `#3ad08a` | Siempre verifique |
| `--amanecer-1..3` | `#ff8a5b` `#ffb36b` `#ffe2a8` | cielo final |
| `--texto` | `#f5f3ff` | texto sobre oscuro |

Brillo por nivel (como las cuevas de la referencia): N1 violeta · N2 turquesa · N3 naranja · N4 magenta · N5 verde esmeralda · Final dorado.

### Logo (SVG propio)
Emblema circular: tres volcanes (San Pedro, Tolimán, Atitlán) sobre el lago, sol naciente dorado detrás, un camino de piedras que cruza el lago y una franja de tejido en zigzag con los tres colores de la fórmula. Marca tipográfica "Talento **Sin Fronteras**" en Baloo 2.

### Personajes
Niños de proporción chibi en traje típico de Santiago Atitlán:
- **Ixchel:** huipil blanco con rayas moradas y aves bordadas, corte índigo jaspeado, faja roja, tocoyal rojo en la cabeza.
- **Balam:** camisa blanca, pantalón blanco a la rodilla con rayas moradas y aves bordadas, faja roja, sombrero de palma con cinta tejida y morral.

Poses: saludo, señalando, con celular, celebrando (y farol en la portada).

> Los casos de los guiones (Marvin, Rosa y Doña Elena) son **adultos trabajadores**. Para no sugerir trabajo infantil, se representan con ilustraciones de objetos de su oficio y no con personajes niños.

### Manifiesto de imágenes
Definido en `plataforma/scripts/generar-imagenes.py` (fuente única de prompts). Resumen:

| Grupo | Archivos | Modelo | Fondo |
|---|---|---|---|
| Fondos | `hero-movil`, `hero-escritorio`, `amanecer`, `marco-reconocimiento` | gpt-image-2 | opaco |
| Guías | `ixchel-saludo` (base) → `-celular`, `-celebra`, `-farol` (`-senala` sin generar, ver tareas); `balam-saludo` (base) → `-senala`, `-celular`, `-celebra` | gpt-image-1.5 (las poses se editan desde la base para mantener la consistencia) | transparente |
| Dioramas | `diorama-1` … `diorama-5`, `diorama-morral` | gpt-image-1.5 | transparente |
| Objetos | `farol`, `pinos`, `quetzal`, `flores`, `letrero`, `cayuco` | gpt-image-1.5 | transparente |
| Íconos | `ico-asistente`, `ico-curriculum`, `ico-generador`, `ico-caminos`, `ico-estrella`, `ico-candado`, `ico-lupa`, `ico-herramientas`, `ico-olla`, `ico-canasta` | gpt-image-1.5 | transparente |

## 3. Páginas y componentes

### Inicio `/`
1. **Header** fijo translúcido: logo + "Mi avance n/5".
2. **Hero:** fondo del lago de madrugada (móvil/escritorio), estrellas que titilan, bruma en movimiento, reflejo animado; título "¡Hola! Bienvenido, bienvenida", marca, subtítulo, Ixchel con farol y Balam saludando, botón "Comenzar el camino" y un letrero de "Deslice hacia abajo".
3. **Camino:** SVG en zigzag que se dibuja con el desplazamiento, piedras y luciérnagas; 6 **Estaciones** (diorama flotante con brillo, letrero NIVEL n, ícono, título, texto, duración, botón "Entrar", insignia ✔ si está completado). Decoración: pinos, faroles, flores, quetzal volando y cayuco.
4. **Mapa del camino:** pergamino con los 5 hitos + "Usted está aquí".
5. **Reglas:** dos tarjetas grandes (candado / lupa).
6. **Lo que ofrece / no ofrece.**
7. **Cierre** con el fondo del amanecer: "Usted ya sabe mucho. Hoy suma una herramienta más." + guías celebrando.
8. **Footer:** nombre, "Este sitio no guarda ni envía ningún dato suyo", año.

El cielo (capa fija) interpola entre `--noche-950` y los tonos del amanecer según el avance del desplazamiento.

### Nivel `/nivel/n`
`NivelHeader` (diorama + guía + datos) → `Video` (fachada YouTube) → actividad propia → `VersionTexto` (acordeón por escena) → `Completar` → `NivelNav`. La cinta "Nunca comparta · Siempre verifique" aparece en cada nivel.

| Nivel | Título | Módulo · Video | Apoyo | Actividades |
|---|---|---|---|---|
| 1 | Su asistente de IA | M1 · V1 · 10 min | Total | Qué es / qué esperar · Fórmula animada · Juego "¿Lo compartiría?" · Pregunta "Siempre verifique" |
| 2 | Su experiencia vale | M2 · V2 · 15 min | Parcial | 3 preguntas · Tarjetas volteables (Marvin, Rosa, Doña Elena) · Lo que se olvida contar · 5 partes del CV · Borrador privado |
| 3 | El generador de currículum | M2 · V3 · 15 min | Parcial | Generador guiado de 3 pasos · Copiar · Abrir IA · Revisar y corregir |
| 4 | La misma fórmula sirve para más | M3 · V4 · 10 min | Mínimo | Recordatorio · 3 situaciones · Advertencia de trámites · Armador Quién/Qué/Cómo |
| 5 | Ahora le toca a usted | M4 · V5 · 8 min | Nulo | 3 preguntas de reflexión · 4 pasos marcables · Abrir IA · Ofrece/no ofrece |
| Final | Su morral de herramientas | — | — | Materiales · Banco · Reconocimiento |

### Generador (texto de la instrucción)

> **[QUIÉN]** Actúa como un asesor que ayuda a redactar currículums para personas que buscan trabajo en Guatemala.
> **[QUÉ]** Necesito un currículum para aplicar a un puesto de *{puesto}*. Esta es mi experiencia, contada con mis palabras: *{experiencia}*. Convierte lo que hice en habilidades claras que un empleador entienda. Usa solo lo que yo te conté: no inventes puestos, fechas, estudios ni idiomas.
> **[CÓMO]** *{forma}*. Usa palabras sencillas y ordénalo en: datos de contacto, perfil, experiencia, habilidades e idiomas, y formación. Deja [NOMBRE], [TELÉFONO], [CORREO] y [MUNICIPIO] entre corchetes para que yo los complete.

Valor por defecto de *{forma}*: "Escríbelo como un currículum de una página, con frases cortas".

### Detector de datos personales (`datos-personales.ts`)
Advierte (no bloquea en silencio) si el texto contiene una secuencia de 8 o más dígitos (teléfono, DPI o pasaporte), un correo, o las palabras `DPI`, `pasaporte`, `contraseña`, `cuenta bancaria`, `deportado/a`, `migratori*` o `dirección`. Mensaje: "Parece que escribió un dato personal. Bórrelo: no hace falta para su currículum".

### Reconocimiento (canvas 1600×1131)
Fondo `marco-reconocimiento` + logo + "Talento Sin Fronteras" + "RECONOCIMIENTO" + "otorgado a" + **nombre** + "por recorrer la ruta de aprendizaje *Inteligencia artificial para su vida laboral*" + fecha + leyenda de participación. Se descarga como `reconocimiento-talento-sin-fronteras.png`.

## 4. Materiales

| Material | Formato | Contenido |
|---|---|---|
| Tarjeta de la fórmula | PNG 1080×1350 | Quién · Qué · Cómo con ejemplo + Nunca comparta · Siempre verifique |
| Guía de bolsillo | PDF, 3 páginas | Fórmula; un ejemplo por tarea (CV, entrevista, documento, mensaje); lista de lo que no se comparte; cómo pedir cambios |
| Plantilla de currículum | TXT | 5 partes con espacios entre corchetes |
| Guía del facilitador | PDF | Propósito y límites, preparación, agenda de 90 min, guía por módulo, dificultades frecuentes, ética (consentimiento, fotos, datos), conteo anónimo del módulo 4, encuesta anónima antes/después |
| Banco de ejemplos | Página `/banco` | 10 casos ficticios: 3 CV, 2 entrevista, 2 documento, 2 mensaje, 1 otro |
