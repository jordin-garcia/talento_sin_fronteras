// Genera los materiales descargables (F4, R-8.1, R-8.3) en public/materiales/.
// Materiales neutrales de marca (P6): siempre dicen "la herramienta de inteligencia artificial".
import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const salida = join(raiz, 'public', 'materiales');
mkdirSync(salida, { recursive: true });
const f = (p) => pathToFileURL(join(raiz, p)).href;
const imgs = (n) => f(`src/assets/img/${n}.webp`);

const CSS = `
@font-face { font-family: 'Baloo 2'; font-weight: 700; src: url(${f('node_modules/@fontsource/baloo-2/files/baloo-2-latin-700-normal.woff2')}); }
@font-face { font-family: 'Baloo 2'; font-weight: 800; src: url(${f('node_modules/@fontsource/baloo-2/files/baloo-2-latin-800-normal.woff2')}); }
@font-face { font-family: 'Nunito'; font-weight: 400; src: url(${f('node_modules/@fontsource/nunito/files/nunito-latin-400-normal.woff2')}); }
@font-face { font-family: 'Nunito'; font-weight: 700; src: url(${f('node_modules/@fontsource/nunito/files/nunito-latin-700-normal.woff2')}); }
@font-face { font-family: 'Nunito'; font-weight: 800; src: url(${f('node_modules/@fontsource/nunito/files/nunito-latin-800-normal.woff2')}); }
* { box-sizing: border-box; }
body { margin: 0; font-family: 'Nunito', sans-serif; color: #1d1640; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
h1, h2, h3 { font-family: 'Baloo 2', sans-serif; line-height: 1.1; margin: 0 0 .3em; }
.quien { --c: #9a4dff; } .que { --c: #12a8b4; } .como { --c: #e8a317; }
.parte { border-left: 7px solid var(--c); background: color-mix(in srgb, var(--c) 13%, white); border-radius: 12px; padding: 8px 12px; margin: 6px 0; }
.rot { display: inline-block; font-family: 'Baloo 2'; font-weight: 800; letter-spacing: .08em; color: #fff; background: var(--c); border-radius: 6px; padding: 0 8px; font-size: .85em; }
.ficticio { display: inline-block; font-size: .72em; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; background: #ffe2a8; padding: 1px 8px; border-radius: 5px; }
.marca { display: flex; align-items: center; gap: 10px; font-family: 'Baloo 2'; font-weight: 800; font-size: 20px; color: #3b2280; }
.marca img { width: 42px; height: 42px; }
`;

const LOGO = f('public/logo.svg');
const marca = `<div class="marca"><img src="${LOGO}"> Talento <span style="color:#d88a00">Sin Fronteras</span></div>`;

// ---------------- Tarjeta de la fórmula (PNG 1080×1350) ----------------
const tarjeta = `<!doctype html><html lang="es"><head><meta charset="utf-8"><style>${CSS}
body { width: 1080px; height: 1350px; overflow: hidden; color: #fff;
  background: radial-gradient(circle at 80% 0%, #6b3fd4 0, transparent 45%), radial-gradient(circle at 0% 100%, #c2567f 0, transparent 45%), linear-gradient(180deg, #11154a, #232a7a 70%, #3b2a85); }
.w { padding: 64px 70px; height: 100%; display: flex; flex-direction: column; }
.marca { color: #fff; font-size: 34px; } .marca img { width: 70px; height: 70px; } .marca span { color: #ffbf3c !important; }
h1 { font-size: 96px; margin: 34px 0 6px; color: #ffe08a; text-shadow: 0 0 30px rgba(255,200,80,.5); }
.sub { font-size: 32px; margin: 0 0 26px; font-weight: 700; color: #ded8ff; }
.b { display: flex; gap: 24px; align-items: center; border-radius: 28px; padding: 22px 28px; margin-bottom: 18px; background: color-mix(in srgb, var(--c) 30%, #141a55); border: 4px solid var(--c); }
.n { flex: none; width: 84px; height: 84px; border-radius: 22px; background: var(--c); color: #160f33; font: 800 54px 'Baloo 2'; display: grid; place-items: center; }
.b h2 { font-size: 54px; margin: 0; color: #fff; letter-spacing: .04em; }
.b p { margin: 0; font-size: 28px; font-weight: 700; color: #f1edff; }
.b i { display: block; font-size: 24px; color: #fff3d1; margin-top: 4px; }
.reglas { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: auto; }
.animo { margin: 18px 0 0; text-align: center; font-size: 27px; font-weight: 700; color: #ded8ff; }
.r { border-radius: 26px; padding: 22px 24px; font-size: 25px; font-weight: 700; }
.r h3 { font-size: 38px; margin-bottom: 6px; }
.r1 { background: rgba(255,93,115,.22); border: 4px solid #ff5d73; } .r1 h3 { color: #ffb3bf; }
.r2 { background: rgba(58,208,138,.2); border: 4px solid #3ad08a; } .r2 h3 { color: #a6f5cf; }
.guia { position: absolute; right: 36px; top: 150px; width: 210px; filter: drop-shadow(0 12px 14px rgba(0,0,0,.5)); }
</style></head><body><div class="w">
${marca}
<img class="guia" src="${imgs('ixchel-celular')}">
<h1>La fórmula</h1>
<p class="sub">Para pedirle bien las cosas a la herramienta de IA</p>
<div class="b quien"><div class="n">1</div><div><h2>QUIÉN</h2><p>¿Qué papel tiene el asistente?</p><i>«Actúa como un asesor que ayuda a redactar currículums.»</i></div></div>
<div class="b que"><div class="n">2</div><div><h2>QUÉ</h2><p>¿Qué necesito y cuál es mi situación?</p><i>«Necesito presentar mi experiencia en cocina: trabajé 4 años en un restaurante.»</i></div></div>
<div class="b como"><div class="n">3</div><div><h2>CÓMO</h2><p>¿En qué forma quiero la respuesta?</p><i>«Escríbelo en tres frases cortas y con palabras sencillas.»</i></div></div>
<p class="animo">Si se le olvida una parte, no pasa nada: vuelva a intentarlo. ✨</p>
<div class="reglas">
  <div class="r r1"><h3>🔒 Nunca comparta</h3>DPI o pasaporte, dirección exacta, situación migratoria, contraseñas, datos del banco.</div>
  <div class="r r2"><h3>🔍 Siempre verifique</h3>La IA se equivoca y no avisa. Trámites, plazos y derechos: confírmelos en la institución.</div>
</div>
</div></body></html>`;

// ---------------- Guía de bolsillo (PDF A5, 3 páginas) ----------------
const ej = (q, w, c) => `<div class="parte quien"><span class="rot">QUIÉN</span> ${q}</div><div class="parte que"><span class="rot">QUÉ</span> ${w}</div><div class="parte como"><span class="rot">CÓMO</span> ${c}</div>`;
const guia = `<!doctype html><html lang="es"><head><meta charset="utf-8"><style>${CSS}
@page { size: A5; margin: 0; }
body { font-size: 9.6pt; line-height: 1.36; }
.parte { padding: 4px 9px; margin: 4px 0; border-radius: 9px; border-left-width: 5px; }
.cab { display: flex; gap: 8px; align-items: flex-start; } .cab > div { flex: 1; }
.pag { width: 148mm; height: 210mm; padding: 11mm 11mm 9mm; page-break-after: always; position: relative; overflow: hidden; }
.pag:last-child { page-break-after: auto; }
.cinta { height: 6px; border-radius: 3px; background: linear-gradient(90deg, #9a4dff, #12a8b4, #e8a317); margin: 6px 0 10px; }
h1 { font-size: 22pt; color: #3b2280; margin-top: 4px; }
h2 { font-size: 13.5pt; color: #3b2280; margin-top: 6px; }
p { margin: 0 0 6px; }
.caja { border-radius: 10px; padding: 6px 10px; margin: 6px 0; }
.roja { background: #ffe8ec; border: 2px solid #ff5d73; } .verde { background: #e3f9ee; border: 2px solid #3ad08a; } .amarilla { background: #fff4d9; border: 2px solid #e8a317; }
ul { margin: 4px 0 6px; padding-left: 18px; } li { margin: 2px 0; }
.pie { position: absolute; bottom: 6mm; left: 11mm; right: 11mm; font-size: 8.5pt; color: #7a6f9e; display: flex; justify-content: space-between; }
.guia { width: 22mm; flex: none; }
small { font-size: 8.4pt; }
</style></head><body>
<section class="pag">
  <div class="cab"><div>${marca}
  <h1>Guía de bolsillo</h1>
  <p><b>Inteligencia artificial para su vida laboral.</b> Guárdela en su teléfono y consúltela cuando quiera.</p></div>
  <img class="guia" src="${imgs('balam-celular')}"></div>
  <div class="cinta"></div>
  <h2>La fórmula: quién, qué y cómo</h2>
  <p>Un asistente de inteligencia artificial es un programa con el que usted conversa por escrito. Escribe muy rápido, pero <b>es solo un ayudante</b>: puede equivocarse, no conoce su vida y no es una autoridad. Para pedirle bien las cosas, use tres partes:</p>
  <div class="parte quien"><span class="rot">QUIÉN</span> ¿Qué papel tiene el asistente? <small>Como cuando le explica a un ayudante nuevo lo que va a hacer.</small></div>
  <div class="parte que"><span class="rot">QUÉ</span> ¿Qué necesita y cuál es su situación? <small>Cuanto más claro, mejor.</small></div>
  <div class="parte como"><span class="rot">CÓMO</span> ¿En qué forma quiere la respuesta? <small>Corto, en lista, con palabras sencillas…</small></div>
  <h2>Ejemplo: su currículum <span class="ficticio">Ficticio</span></h2>
  ${ej('Actúa como un asesor que ayuda a redactar currículums para personas que buscan trabajo en Guatemala.', 'Necesito un currículum para aplicar a un puesto de ayudante de cocina. Trabajé cuatro años en un restaurante: preparaba alimentos y mantenía la cocina limpia y ordenada. Usa solo lo que yo te conté.', 'Escríbelo como un currículum de una página, con frases cortas. Deja [NOMBRE], [TELÉFONO], [CORREO] y [MUNICIPIO] entre corchetes.')}
  <div class="pie"><span>Talento Sin Fronteras · Guía de bolsillo</span><span>1 / 3</span></div>
</section>
<section class="pag">
  <h2>La misma fórmula sirve para más <span class="ficticio">Ejemplos ficticios</span></h2>
  <p><b>1. Prepararse para una entrevista</b></p>
  ${ej('Actúa como una persona que entrevista para puestos de ayudante de cocina.', 'Voy a practicar mis respuestas. Hazme una pregunta a la vez y espera mi respuesta.', 'Luego dime cómo mejorarla, con frases cortas.')}
  <p style="margin-top:8px"><b>2. Entender un documento</b> <small>(antes de pegarlo, borre nombres, teléfonos y direcciones)</small></p>
  ${ej('Actúa como alguien que explica textos difíciles con palabras sencillas.', 'Explícame cada parte de esta oferta de trabajo y sugiéreme preguntas para el empleador: (texto sin datos personales).', 'En una lista corta.')}
  <p style="margin-top:8px"><b>3. Escribir un mensaje formal</b></p>
  ${ej('Actúa como alguien que redacta mensajes respetuosos.', 'Necesito preguntar por una vacante de ayudante de cocina.', 'Para WhatsApp, en cinco líneas y con tono cordial.')}
  <div class="caja amarilla"><b>Pida cambios las veces que quiera:</b> «hazlo más corto» · «usa palabras más sencillas» · «quita lo que yo no te dije». Usted manda; el asistente ayuda.</div>
  <div class="pie"><span>Talento Sin Fronteras · Guía de bolsillo</span><span>2 / 3</span></div>
</section>
<section class="pag">
  <h2>Las dos reglas de oro</h2>
  <div class="caja roja"><b>1. Nunca comparta</b> con la herramienta de IA:
    <ul><li>Su número de DPI o de pasaporte</li><li>Su dirección exacta</li><li>Su situación migratoria</li><li>Contraseñas</li><li>Datos de su cuenta del banco</li><li>Fotos de documentos personales</li></ul>
    Su teléfono y su correo los escribe usted al final, <b>en su documento</b>, no en la conversación.</div>
  <div class="caja verde"><b>2. Siempre verifique.</b> La IA a veces se equivoca y no avisa. Lea todo con calma: ¿las fechas, los nombres y lo que dice son ciertos? Si se trata de <b>trámites, plazos, requisitos o derechos laborales</b>, confírmelo en la institución que corresponde, como el Ministerio de Trabajo o la oficina de atención al migrante. El asistente no sustituye a un abogado ni a una oficina oficial.</div>
  <h2>Después de recibir la respuesta</h2>
  <ul><li><b>Revise</b> frase por frase: ¿yo hice esto? Borre lo que no sea cierto.</li><li><b>Complete</b> los espacios entre corchetes usted mismo.</li><li><b>Guarde</b> el texto en sus notas o como archivo.</li><li>Si no sale a la primera, <b>cambie una parte</b> y pruebe otra vez.</li></ul>
  <div class="caja amarilla"><small>Esta guía no ofrece empleo, trámites ni asesoría legal. Tener un buen currículum ayuda, pero no garantiza un trabajo.</small></div>
  <div class="pie"><span>Talento Sin Fronteras · Guía de bolsillo</span><span>3 / 3</span></div>
</section>
</body></html>`;

// ---------------- Guía del facilitador (PDF A4) ----------------
const filas = (arr) => arr.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('');
const facilitador = `<!doctype html><html lang="es"><head><meta charset="utf-8"><style>${CSS}
@page { size: A4; margin: 16mm 16mm 18mm; }
body { font-size: 10.5pt; line-height: 1.5; }
h1 { font-size: 28pt; color: #3b2280; margin: 10px 0 4px; }
h2 { font-size: 15pt; color: #3b2280; margin: 18px 0 6px; padding-bottom: 3px; border-bottom: 3px solid #e9e2ff; page-break-after: avoid; }
h3 { font-size: 12pt; color: #5b2fb0; margin: 10px 0 4px; page-break-after: avoid; }
p { margin: 0 0 6px; } ul, ol { margin: 4px 0 8px; padding-left: 20px; } li { margin: 2px 0; }
table { width: 100%; border-collapse: collapse; margin: 6px 0 10px; font-size: 9.8pt; page-break-inside: avoid; }
td, th { border: 1px solid #d9d1f2; padding: 5px 7px; vertical-align: top; text-align: left; }
th { background: #efe9ff; font-family: 'Baloo 2'; font-weight: 700; }
.caja { border-radius: 10px; padding: 8px 12px; margin: 8px 0; page-break-inside: avoid; }
.roja { background: #ffe8ec; border: 2px solid #ff5d73; } .verde { background: #e3f9ee; border: 2px solid #3ad08a; } .lila { background: #f3eeff; border: 2px solid #b08cff; }
.portada { display: flex; gap: 18px; align-items: center; }
.portada img.g { width: 110px; }
.encuesta td { height: 26px; }
.salto { page-break-before: always; }
</style></head><body>
<div class="portada"><div style="flex:1">${marca}<h1>Guía del facilitador</h1><p><b>Ruta de aprendizaje «Inteligencia artificial para su vida laboral»</b> para personas migrantes retornadas. Esta guía permite dar el taller en modalidad acompañada <b>sin la participación del equipo autor</b>.</p></div><img class="g" src="${imgs('ixchel-saludo')}"><img class="g" src="${imgs('balam-saludo')}"></div>

<h2>1. Propósito y límites del taller</h2>
<p>El taller enseña a usar por cuenta propia una herramienta gratuita de inteligencia artificial generativa, con una fórmula única y fácil de recordar: <b>quién, qué y cómo</b>. El primer caso de aplicación es el currículum. La ruta retira el apoyo poco a poco (andamiaje decreciente): fórmula completa → plantilla parcial → solo el recordatorio → ningún apoyo.</p>
<div class="caja roja"><b>Diga esto al inicio, con claridad:</b> el taller enseña a usar una herramienta y acompaña la elaboración del currículum. <b>No</b> gestiona empleo, <b>no</b> contacta empleadores, <b>no</b> hace trámites migratorios y <b>no</b> da asesoría legal. El reconocimiento es de participación y <b>no</b> es una certificación oficial de competencias laborales.</div>

<h2>2. Antes del taller</h2>
<ul>
<li>Grupos pequeños: de <b>8 a 10 personas</b> por facilitador o pareja de facilitadores.</li>
<li>Espacio con energía eléctrica y, de ser posible, internet. Si no hay, prepare una zona de conexión compartida desde un teléfono.</li>
<li>Proyector o televisor para mostrar la plataforma y los videos.</li>
<li>Código QR impreso con el enlace de la plataforma, plantillas de currículum impresas y la lista «Nunca comparta» impresa.</li>
<li>Pruebe la herramienta de IA el mismo día: los planes gratuitos cambian sus límites de uso. Tenga una alternativa lista (la plataforma ofrece dos).</li>
<li>Prepare la hoja de asistencia (solo nombre y firma) y las encuestas anónimas (anexo).</li>
<li>Si va a tomar fotografías, prepare el formulario de consentimiento informado.</li>
</ul>

<h2>3. Agenda sugerida (90 minutos)</h2>
<table><tr><th>Minutos</th><th>Actividad</th><th>En la plataforma</th></tr>
${filas([
  ['0 – 10', 'Bienvenida, qué ofrece y qué no, encuesta inicial anónima. Todos abren la plataforma con el QR.', 'Inicio'],
  ['10 – 20', 'Qué es un asistente de IA, la fórmula y las dos reglas. Juego «¿Lo compartiría?».', 'Nivel 1'],
  ['20 – 35', 'Traducir la experiencia: las tres preguntas, casos ficticios y partes del currículum. Borrador privado.', 'Nivel 2'],
  ['35 – 55', 'Generador guiado: cada persona arma su instrucción, la usa en la herramienta de IA, revisa, corrige y guarda su currículum.', 'Nivel 3'],
  ['55 – 65', 'La misma fórmula para otras necesidades: entrevista, documento, mensaje. Advertencia sobre trámites.', 'Nivel 4'],
  ['65 – 75', 'Ahora le toca a usted: cada persona elige una necesidad propia y arma su instrucción <b>sin ayuda</b>.', 'Nivel 5'],
  ['75 – 85', 'Materiales para guardar y reconocimiento de participación.', 'Morral'],
  ['85 – 90', 'Encuesta final anónima y cierre.', '—'],
])}</table>
<p>Los videos duran unos 23 minutos en total. <b>Pause el video al final de cada escena</b> para que las personas practiquen. La versión en texto de cada video está en la plataforma.</p>

<h2>4. Guía por nivel</h2>
<h3>Nivel 1 · Su asistente de IA (apoyo total)</h3>
<p>Objetivo: comprender qué es y qué no es el asistente, aprender la fórmula y las dos reglas. Si falta tiempo, acorte la parte de «qué esperar de él», pero <b>nunca recorte las dos reglas</b>.</p>
<h3>Nivel 2 · Su experiencia vale (apoyo parcial)</h3>
<p>Objetivo: traducir la experiencia informal o en el extranjero a competencias. Insista: <b>no es falta de experiencia, es falta de traducción</b>. Los casos de Rosa y Doña Elena pueden omitirse si falta tiempo. Recuerde que cada persona decide qué incluir: nadie tiene que decir que es retornado ni por qué regresó.</p>
<h3>Nivel 3 · El generador de currículum (apoyo parcial)</h3>
<p>Objetivo: que cada persona termine con su currículum guardado en su teléfono. Acompañe uno por uno: copiar, abrir la herramienta, pegar, enviar. Muestre cómo <b>borrar lo que la IA inventó</b> (por ejemplo, un idioma que la persona no habla) y cómo pedir cambios. Los datos de contacto se escriben al final, en el documento, no en la conversación.</p>
<h3>Nivel 4 · La misma fórmula sirve para más (apoyo mínimo)</h3>
<p>Objetivo: transferir la fórmula a otra tarea. Solo se recuerda la estructura; no dicte instrucciones completas. Si falta tiempo, muestre dos de las tres situaciones, pero <b>conserve siempre la de entender un documento</b>, por la advertencia sobre trámites y derechos laborales.</p>
<h3>Nivel 5 · Ahora le toca a usted (apoyo nulo)</h3>
<p>Objetivo: la persona formula sola una instrucción para una necesidad propia. <b>No muestre ni dicte ninguna instrucción armada</b>: este es el indicador central del proyecto. Si alguien se atora, pregunte: «¿Quién debería ayudarle? ¿Qué necesita? ¿Cómo lo quiere?».</p>

<h2>5. Dificultades frecuentes</h2>
<table><tr><th>Situación</th><th>Qué hacer</th></tr>
${filas([
  ['La persona no sabe copiar y pegar.', 'Muéstrelo en su propio teléfono: mantener el dedo presionado → «Pegar». Practíquelo dos veces.'],
  ['La herramienta pide iniciar sesión o llegó a su límite de uso.', 'Use la alternativa que ofrece la plataforma. Verifique los límites antes del taller.'],
  ['La IA inventó algo (un idioma, un estudio, un año).', 'Excelente momento para enseñar a verificar: pida que lo borre o que escriba «quita lo que yo no te dije».'],
  ['La persona escribe su DPI, dirección o situación migratoria.', 'Deténgala con amabilidad, ayúdele a borrarlo y repase la regla «Nunca comparta». La plataforma también lo advierte.'],
  ['No tiene teléfono o no tiene datos.', 'Trabajo en pareja, plantilla impresa y conexión compartida.'],
  ['Pregunta por un trámite, un plazo o un derecho.', 'No responda con la IA. Indique la institución que corresponde (Ministerio de Trabajo, oficina municipal de atención al migrante).'],
])}</table>

<h2>6. Consideraciones éticas</h2>
<ul>
<li><b>Voluntariedad:</b> la participación es voluntaria y puede interrumpirse en cualquier momento, sin consecuencias.</li>
<li><b>Datos personales:</b> la asistencia se registra solo con nombre y firma, sin documento de identificación, sin dirección y <b>sin preguntar por la situación migratoria</b>. No pida, copie ni guarde los currículums ni las conversaciones con la herramienta: son de cada persona.</li>
<li><b>Fotografías:</b> solo con consentimiento informado previo y por escrito. Prefiera tomas generales, de espaldas o de manos. <b>Nunca fotografíe pantallas</b> de los participantes. Ofrezca participar sin ser fotografiado.</li>
<li><b>Testimonios:</b> no recoja ni divulgue relatos sobre situación migratoria, deportación o circunstancias delicadas. Si alguien los comparte, agradézcalo y no los registre.</li>
<li><b>Lenguaje:</b> trato de usted, sin tono paternalista. Reconozca el valor de la experiencia de cada persona.</li>
<li><b>Honestidad:</b> reporte los resultados tal como salgan, incluidas las dificultades y las personas que no terminaron.</li>
</ul>

<h2>7. Conteo anónimo del Nivel 5</h2>
<div class="caja lila">Al final del Nivel 5, cuente <b>cuántas personas</b> lograron formular por sí mismas una instrucción para una necesidad propia. Anote solo el número (por ejemplo, con marcas en una hoja). <b>No registre nombres ni el contenido</b> de lo que escribieron. Este conteo es el indicador central: mide la capacidad instalada, no solo la asistencia.</div>
<table><tr><th>Fecha del taller</th><th>Personas presentes</th><th>Terminaron su currículum</th><th>Formularon su propia instrucción (Nivel 5)</th></tr><tr><td>&nbsp;</td><td></td><td></td><td></td></tr></table>

<h2 class="salto">Anexo · Encuesta anónima (antes y después)</h2>
<p>Entregue una hoja al inicio y otra al final. No lleva nombre. Marque con una X.</p>
<table class="encuesta"><tr><th style="width:52%">Pregunta</th><th>Sí</th><th>No</th><th>No sé</th></tr>
${filas([['1. ¿Ha usado antes una herramienta de inteligencia artificial?', '', '', ''], ['2. ¿Tiene un currículum hecho?', '', '', '']])}</table>
<table class="encuesta"><tr><th style="width:52%">3. ¿Qué tan capaz se siente de usar la herramienta de IA por su cuenta?</th><th>Nada</th><th>Poco</th><th>Bastante</th><th>Mucho</th></tr><tr><td>Marque una opción</td><td></td><td></td><td></td><td></td></tr></table>
<table class="encuesta"><tr><th style="width:52%">4. (Solo al final) ¿Sabe qué datos nunca debe compartir con la IA?</th><th>Sí</th><th>No</th><th>No estoy seguro/a</th></tr><tr><td>Marque una opción</td><td></td><td></td><td></td></tr></table>
<div class="caja verde">Talento Sin Fronteras es una ruta abierta: puede usarse y compartirse sin la participación de sus autores. La plataforma no pide registro y no guarda ni envía datos de las personas.</div>
</body></html>`;

// ---------------- Plantilla de currículum (TXT) ----------------
const plantilla = `CURRÍCULUM VITAE — PLANTILLA
Talento Sin Fronteras · Complete lo que está entre corchetes [ ] con su información.
Escriba solo lo que de verdad hizo. Usted decide qué incluir.

==================================================
1. DATOS DE CONTACTO
==================================================
Nombre: [SU NOMBRE COMPLETO]
Teléfono: [SU NÚMERO]
Correo: [SU CORREO, si tiene]
Municipio: [MUNICIPIO DONDE VIVE]
(No hace falta la dirección exacta ni el número de documento.)

==================================================
2. PERFIL
==================================================
[Dos o tres líneas: quién es usted y qué sabe hacer.
Ejemplo ficticio: Ayudante de cocina con cuatro años de experiencia en preparación
de alimentos, orden y limpieza. Responsable, puntual y acostumbrado/a a trabajar bajo presión.]

==================================================
3. EXPERIENCIA (empiece por la más reciente)
==================================================
Puesto: [NOMBRE DEL PUESTO]
Lugar y país: [EMPRESA O LUGAR, PAÍS]
Años: [DESDE – HASTA]
- [Lo que hacía día a día]
- [Herramientas, máquinas o idiomas que usaba]
- [De qué era responsable]

Puesto: [NOMBRE DEL PUESTO]
Lugar y país: [EMPRESA O LUGAR, PAÍS]
Años: [DESDE – HASTA]
- [ ]
- [ ]

==================================================
4. HABILIDADES E IDIOMAS
==================================================
- [Habilidad 1: por ejemplo, atención al cliente]
- [Habilidad 2: por ejemplo, trabajo en equipo]
- [Habilidad 3: por ejemplo, adaptación a lugares nuevos]
- Idiomas: [Español / inglés básico / otro]

==================================================
5. FORMACIÓN
==================================================
- [Curso, taller o escuela — año]

--------------------------------------------------
Recuerde: nunca comparta datos personales con la herramienta de IA.
Escriba sus datos de contacto usted mismo, aquí, en su documento.
`;

writeFileSync(join(salida, 'plantilla-curriculum.txt'), '﻿' + plantilla, 'utf8');

const b = await chromium.launch();
const ctx = await b.newContext();
const p = await ctx.newPage();
const cargar = async (html) => {
  const tmp = join(raiz, 'assets-raw', '_material.html');
  writeFileSync(tmp, html, 'utf8');
  await p.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
};
await p.setViewportSize({ width: 1080, height: 1350 });
await cargar(tarjeta);
await p.screenshot({ path: join(salida, 'tarjeta-de-la-formula.png') });
await cargar(guia);
await p.pdf({ path: join(salida, 'guia-de-bolsillo.pdf'), preferCSSPageSize: true, printBackground: true });
await cargar(facilitador);
await p.pdf({ path: join(salida, 'guia-del-facilitador.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true,
  displayHeaderFooter: true, headerTemplate: '<span></span>',
  footerTemplate: '<div style="font-size:8px;width:100%;text-align:center;color:#7a6f9e">Talento Sin Fronteras · Guía del facilitador · <span class="pageNumber"></span>/<span class="totalPages"></span></div>' });
await b.close();
console.log('✓ materiales generados en public/materiales');
