# 01 · Requisitos (formato EARS)

Cada requisito tiene un ID trazable (`R-x.y`) que aparece en `03-tareas.md` y en las pruebas de aceptación.
Sintaxis EARS: *Cuando* (evento) · *Mientras* (estado) · *Si* (condición no deseada) · *La plataforma deberá* (respuesta).

## R-1 · Inicio: el mapa de la aventura

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| R-1.1 | La plataforma deberá mostrar una portada con el paisaje del Lago de Atitlán de madrugada, el logo, el nombre "Talento Sin Fronteras", un mensaje de bienvenida en trato de usted y a los dos guías. | Captura móvil 390×844 muestra todo sin desplazamiento horizontal. |
| R-1.2 | Cuando la persona toque "Comenzar el camino", la plataforma deberá desplazarse suavemente al Nivel 1 o al siguiente nivel pendiente. | El botón lleva al primer nivel no completado. |
| R-1.3 | La plataforma deberá mostrar un camino de piedras que une 5 niveles y un nivel final, alternando izquierda/derecha, cada uno con su diorama, letrero "NIVEL n", ícono, título, descripción breve, duración y botón "Entrar". | Hay 6 estaciones en orden; cada botón abre su página. |
| R-1.4 | Mientras la persona se desplaza, la plataforma deberá dibujar progresivamente el camino, animar la entrada de cada estación y cambiar el color del cielo de madrugada a amanecer. | Verificable visualmente; sin saltos ni parpadeos. |
| R-1.5 | La plataforma deberá mostrar "Su mapa del camino" con los 5 hitos y el marcador "Usted está aquí" en el primer nivel pendiente. | Tras completar N1 y N2, el marcador está en N3. |
| R-1.6 | La plataforma deberá mostrar las reglas "Nunca comparta · Siempre verifique" y un bloque "Lo que esta plataforma ofrece / no ofrece". | Visibles en la portada. |
| R-1.7 | Si el usuario tiene activado "reducir movimiento", la plataforma deberá mostrar el contenido completo sin animaciones de desplazamiento. | Con `prefers-reduced-motion: reduce` todo es visible y estático. |

## R-2 · Páginas de nivel (estructura común)

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| R-2.1 | Cada nivel deberá tener su propia página con encabezado ilustrado (diorama + guía), número de nivel, título, módulo, duración y nivel de apoyo. | 5 páginas `/nivel/1` … `/nivel/5`. |
| R-2.2 | Cada nivel deberá incluir el video del módulo (YouTube en modo oculto, dominio `youtube-nocookie.com`) que solo se carga cuando la persona toca "Ver video". | No se hace ninguna petición a YouTube antes del toque. |
| R-2.3 | Si el video aún no tiene ID configurado, la plataforma deberá mostrar "Video en preparación" e invitar a leer la versión en texto. | Con `youtubeId: ""` aparece el estado de espera. |
| R-2.4 | Cada nivel deberá ofrecer la "Versión en texto" completa del video, escena por escena, idéntica al guion aprobado. | El texto coincide con el documento de guiones. |
| R-2.5 | Cada nivel deberá incluir su actividad interactiva (ver R-3 a R-7). | — |
| R-2.6 | Cuando la persona toque "Completé este nivel", la plataforma deberá guardar el avance en el teléfono, celebrar (animación) y ofrecer ir al siguiente nivel. | Al recargar, el nivel aparece completado en el mapa. |
| R-2.7 | Cada nivel deberá tener navegación: volver al mapa, nivel anterior y siguiente. | — |

## R-3 · Nivel 1 — Su asistente de IA (apoyo total)

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| R-3.1 | La plataforma deberá explicar qué es un asistente de IA y qué esperar de él (sirve para / no confíe para). | Dos columnas ✔/✘. |
| R-3.2 | La plataforma deberá presentar la fórmula en tres tarjetas de color (Quién · Qué · Cómo) con ejemplo, y armar la instrucción completa con una animación. | La instrucción final coincide con el guion del Video 1. |
| R-3.3 | La plataforma deberá incluir el juego "¿Lo compartiría?" con al menos 8 tarjetas y retroalimentación inmediata. | Cada respuesta muestra correcto/incorrecto y por qué. |
| R-3.4 | La plataforma deberá incluir una pregunta de "Siempre verifique" con retroalimentación. | — |

## R-4 · Nivel 2 — Su experiencia vale (apoyo parcial)

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| R-4.1 | La plataforma deberá mostrar las tres preguntas para traducir la experiencia. | — |
| R-4.2 | La plataforma deberá mostrar los casos ficticios de Marvin, Rosa y Doña Elena como tarjetas "antes → después" que se voltean al tocarlas, rotuladas "Ejemplo ficticio". | 3 tarjetas volteables. |
| R-4.3 | La plataforma deberá mostrar "Lo que muchas personas olvidan contar" y las cinco partes del currículum. | — |
| R-4.4 | La plataforma deberá ofrecer un borrador privado con las tres preguntas cuyo contenido **no** se guarda. | Al recargar, el borrador está vacío. |

## R-5 · Nivel 3 — Generador guiado (apoyo parcial)

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| R-5.1 | La plataforma deberá guiar con tres preguntas, una por pantalla: puesto, experiencia, forma del resultado (con sugerencias tocables). | Indicador de paso 1/3, 2/3, 3/3. |
| R-5.2 | Cuando se respondan las tres preguntas, la plataforma deberá armar la instrucción mostrando sus tres partes en color (Quién, Qué, Cómo) y con [NOMBRE], [TELÉFONO], [CORREO] y [MUNICIPIO] entre corchetes. | El texto incluye los corchetes. |
| R-5.3 | Si una respuesta contiene un posible dato personal (número de 8+ dígitos, correo o palabras como DPI/pasaporte), la plataforma deberá advertir y pedir que se borre antes de continuar. | Escribir "mi DPI 1234567890101" muestra la advertencia. |
| R-5.4 | Cuando se toque "Copiar", la plataforma deberá copiar la instrucción al portapapeles y confirmarlo; si el portapapeles falla, deberá seleccionar el texto para copia manual. | — |
| R-5.5 | La plataforma deberá ofrecer "Abrir la herramienta de IA" (ChatGPT) y una alternativa (Gemini), en pestaña nueva. | — |
| R-5.6 | La plataforma deberá mostrar los pasos posteriores: revisar, pedir cambios (frases copiables), completar corchetes, guardar en el teléfono. | — |
| R-5.7 | Las respuestas del generador no deberán guardarse ni enviarse. | Sin `localStorage` para textos; sin peticiones de red. |

## R-6 · Nivel 4 — La misma fórmula sirve para más (apoyo mínimo)

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| R-6.1 | La plataforma deberá mostrar solo el recordatorio de la fórmula (títulos Quién · Qué · Cómo, sin ejemplos). | — |
| R-6.2 | La plataforma deberá presentar las tres situaciones (entrevista, documento, mensaje formal) y la advertencia sobre trámites y derechos laborales. | La advertencia es visible sin desplegar nada. |
| R-6.3 | La plataforma deberá ofrecer un armador con tres campos rotulados solo "Quién", "Qué", "Cómo", que une, colorea y copia la instrucción. | Sin textos de ejemplo en los campos. |

## R-7 · Nivel 5 — Ahora le toca a usted (apoyo nulo)

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| R-7.1 | La plataforma **no deberá** mostrar ninguna instrucción armada ni ejemplo en este nivel. | Revisión de contenido. |
| R-7.2 | La plataforma deberá mostrar las tres preguntas para elegir una necesidad propia y los 4 pasos como lista marcable. | — |
| R-7.3 | La plataforma deberá mostrar "Lo que este taller ofrece / no ofrece". | — |
| R-7.4 | Cuando se complete el nivel, la plataforma deberá celebrar y llevar al Morral (materiales y reconocimiento). | — |

## R-8 · Morral de herramientas (nivel final) y materiales

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| R-8.1 | La plataforma deberá ofrecer para descarga: Tarjeta de la fórmula (PNG), Guía de bolsillo (PDF), Plantilla de currículum (TXT) y Guía del facilitador (PDF). | Los 4 archivos descargan y se abren. |
| R-8.2 | La plataforma deberá incluir el Banco de ejemplos navegable con 10 casos ficticios, filtrables por tipo, con la fórmula desglosada en colores y botón copiar. | 10 casos; filtros funcionan. |
| R-8.3 | Los materiales deberán ser neutrales de marca y repetir las dos reglas. | Revisión de contenido. |

## R-9 · Reconocimiento digital

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| R-9.1 | Cuando la persona escriba su nombre y toque "Crear mi reconocimiento", la plataforma deberá generar en el teléfono una imagen con el logo y nombre de la plataforma, el nombre escrito, la fecha y la leyenda "Reconocimiento de participación · no es una certificación oficial de competencias laborales". | La imagen se previsualiza. |
| R-9.2 | La plataforma deberá permitir descargar el reconocimiento como PNG. | Archivo descargado. |
| R-9.3 | El nombre no deberá guardarse ni enviarse. | Sin red; sin almacenamiento. |
| R-9.4 | Si no se han completado los 5 niveles, la plataforma deberá indicarlo amablemente, sin bloquear la generación (en modalidad acompañada lo decide el facilitador). | Mensaje visible con progreso. |

## R-10 · Transversales

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| R-10.1 | La plataforma deberá funcionar sin desplazamiento horizontal de 320 px a 1920 px. | Pruebas en 320, 360, 390, 768, 1280. |
| R-10.2 | La plataforma deberá ser instalable como PWA (manifest, íconos, service worker). | Manifest válido. |
| R-10.3 | La plataforma no deberá incluir analítica, rastreadores ni llamadas a terceros salvo YouTube tras el toque y los enlaces externos. | Revisión de red. |
| R-10.4 | Las imágenes deberán servirse en WebP/AVIF responsivo con carga diferida fuera de pantalla. | — |
| R-10.5 | La plataforma deberá cumplir P9 (accesibilidad) y obtener ≥ 90 en Accesibilidad de Lighthouse. | — |
| R-10.6 | Los contenidos editables (IDs de YouTube, nombres de guías, textos) deberán estar centralizados en `src/data/`. | — |
