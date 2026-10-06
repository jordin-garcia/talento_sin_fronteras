"""
Genera todas las ilustraciones originales de Talento Sin Fronteras con la API de OpenAI.
Fuente única de prompts (ver specs/02-diseno.md, "Manifiesto de imágenes").

Uso:  python scripts/generar-imagenes.py [nombre ...]
- Lee OPENAI_API_KEY de plataforma/.env (nunca se versiona).
- Escribe PNG en assets-raw/. Omite los que ya existen (borre el archivo para regenerarlo).
"""
import base64, json, os, sys, time, concurrent.futures as cf
import requests

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SALIDA = os.path.join(RAIZ, "assets-raw")
os.makedirs(SALIDA, exist_ok=True)
KEY = [l.split("=", 1)[1].strip() for l in open(os.path.join(RAIZ, ".env")) if l.startswith("OPENAI_API_KEY")][0]
H = {"Authorization": f"Bearer {KEY}"}

ESTILO = (
    "Art style: polished stylized 3D illustration like a cozy fantasy mobile adventure game, soft rounded shapes, "
    "hand-painted textures, warm volumetric lighting, rich saturated jewel tones, gentle magical glow and bloom, "
    "high detail, clean readable silhouette. Absolutely no text, no letters, no numbers, no logos, no watermark."
)
RECORTE = "Isolated subject on a fully transparent background, centered, entire subject visible with generous margin, no background scenery, no frame."

IXCHEL = (
    "A cute chibi-proportioned Guatemalan Maya girl, about 8 years old, from Santiago Atitlan on Lake Atitlan, wearing authentic traje tipico: "
    "a white huipil with fine purple and violet vertical stripes and colorful hand-embroidered birds and flowers across the chest, "
    "a dark indigo jaspe corte wrap skirt, a woven red faja sash at the waist, and a red woven tocoyal ribbon wrapped around her head like a halo. "
    "Warm brown skin, big expressive dark eyes, rosy cheeks, long black braid, small gold earrings, simple leather sandals. Friendly, confident smile."
)
BALAM = (
    "A cute chibi-proportioned Guatemalan Maya boy, about 9 years old, from Santiago Atitlan on Lake Atitlan, wearing authentic traje tipico: "
    "a white long-sleeve shirt, knee-length white trousers with thin purple vertical stripes and colorful embroidered birds near the hems, "
    "a wide red woven faja sash, a small straw palm hat with a colorful woven band, a small woven morral bag across his chest, simple leather sandals. "
    "Warm brown skin, big expressive dark eyes, short black hair, cheerful smile."
)

def diorama(desc, glow):
    return (f"A small floating isometric diorama island with a rounded base of grass, volcanic stone and earth, seen from a 3/4 high angle. On it: {desc}. "
            f"Lakeside Guatemalan highland atmosphere at night, magical {glow} light glowing from inside the scene, tiny fireflies. {RECORTE} {ESTILO}")

def objeto(desc):
    return f"{desc}. {RECORTE} {ESTILO}"

def icono(desc):
    return f"A single glossy 3D game UI icon: {desc}. Chunky rounded shapes, soft highlights, bold colors, centered, square composition. {RECORTE} {ESTILO}"

# nombre: (modelo, tamaño, transparente, prompt, base_para_editar|None, calidad)
M = {}
def add(nombre, modelo, tam, transp, prompt, base=None, calidad="high"):
    M[nombre] = dict(modelo=modelo, tam=tam, transp=transp, prompt=prompt, base=base, calidad=calidad)

# ---------- Fondos ----------
LAGO = ("Lake Atitlan in the Guatemalan highlands with its three volcanoes San Pedro, Toliman and Atitlan rising across the calm lake. ")
add("hero-movil", "gpt-image-2", "1024x1536", False,
    "Vertical mobile game title screen background. " + LAGO +
    "Blue-hour pre-dawn: deep indigo and violet sky with the last twinkling stars, a thin warm peach glow just above the volcano ridge, "
    "soft mist drifting over the mirror-like lake that reflects the sky, tiny warm window lights of a lakeside Maya village with clay-tile roofs. "
    "Foreground at the bottom: dark lakeside rocks, pine trees and flowering bushes framing a winding stone stepping path that starts at the bottom center. "
    "The upper 40% of the image is calm open sky for a title. " + ESTILO)
add("hero-escritorio", "gpt-image-2", "1536x1024", False,
    "Wide panoramic game title screen background. " + LAGO +
    "Blue-hour pre-dawn: deep indigo and violet sky with the last twinkling stars, a thin warm peach glow above the volcano ridge, "
    "soft mist over the mirror-like lake reflecting the sky, tiny warm lights of lakeside Maya villages with clay-tile roofs. "
    "Foreground: dark lakeside rocks, pine trees and flowering bushes on both sides framing a winding stone stepping path that starts at the bottom center. "
    "Calm open sky in the upper center for a title. " + ESTILO)
add("amanecer", "gpt-image-2", "1024x1536", False,
    "Vertical background. " + LAGO +
    "Glorious sunrise: a golden sun rising between the volcanoes, sky gradient from soft violet at the top to coral, peach and warm gold, "
    "sunlight sparkling on the lake, a few traditional wooden cayuco canoes, a resplendent quetzal flying in the distance, "
    "lush green hills, flowering bougainvillea and pines in the foreground, a stone path reaching a lakeside lookout. Hopeful, new beginning mood. " + ESTILO)
add("marco-reconocimiento", "gpt-image-2", "1536x1024", False,
    "A horizontal decorative award certificate background with a wide ornamental border inspired by Guatemalan Maya backstrap-woven textiles: "
    "jaspe patterns, zigzags, diamonds, little birds and flowers in violet, turquoise, golden yellow, magenta and green. "
    "The large central area is a smooth, plain, light warm cream parchment, completely empty for later text. "
    "At the top center of the border a small gentle vignette of Lake Atitlan's volcanoes at sunrise. Elegant, festive, flat front view. " + ESTILO)

# ---------- Guías ----------
add("ixchel-saludo", "gpt-image-1.5", "1024x1536", True,
    IXCHEL + " Full body, standing, front three-quarter view, waving hello with her right hand. " + RECORTE + " " + ESTILO)
add("balam-saludo", "gpt-image-1.5", "1024x1536", True,
    BALAM + " Full body, standing, front three-quarter view, waving hello with his left hand. " + RECORTE + " " + ESTILO)
POSES = {
    "senala": "pointing enthusiastically to the side with one arm extended, as if saying 'this way!', happy expression",
    "celular": "holding a modern smartphone in both hands, the screen glowing softly, looking at it with a delighted smile",
    "celebra": "jumping joyfully with both arms raised high in celebration, big open smile, a few small sparkles around",
}
for quien in ("ixchel", "balam"):
    for pose, d in POSES.items():
        add(f"{quien}-{pose}", "gpt-image-1.5", "1024x1536", True,
            f"Same exact character, same face, same outfit, same colors and same art style as the reference image. New pose: {d}. Full body. {RECORTE}",
            base=f"{quien}-saludo")
add("ixchel-farol", "gpt-image-1.5", "1024x1536", True,
    f"Same exact character, same face, same outfit, same colors and same art style as the reference image. New pose: holding up a small glowing "
    f"warm-orange paper lantern on a short wooden stick, lighting the way, brave and kind expression, light from the lantern on her face. Full body. {RECORTE}",
    base="ixchel-saludo")

# ---------- Dioramas ----------
add("diorama-1", "gpt-image-1.5", "1024x1024", True, diorama(
    "a small wooden lakeside dock with a traditional wooden cayuco canoe tied to it, reeds, stone steps and a tall glowing lantern post", "violet and purple"))
add("diorama-2", "gpt-image-1.5", "1024x1024", True, diorama(
    "a tiny adobe house with a red clay-tile roof and open doorway, beside it a Maya backstrap loom with a half-woven colorful textile, "
    "a basket of yarn balls, a cooking pot, a hammer and a trowel resting on a wooden bench", "turquoise and cyan"))
add("diorama-3", "gpt-image-1.5", "1024x1024", True, diorama(
    "a small Maya market stall with a colorful woven awning, fruits and textiles, and on its counter a giant glowing smartphone whose screen shows "
    "three stacked rounded color blocks (purple, turquoise, golden yellow) with no text", "warm orange and amber"))
add("diorama-4", "gpt-image-1.5", "1024x1024", True, diorama(
    "a rocky lookout point with a wooden signpost holding three blank arrow boards pointing in different directions, a pine tree and flowers", "magenta and pink"))
add("diorama-5", "gpt-image-1.5", "1024x1024", True, diorama(
    "a small mountain summit with a cozy campfire, a resplendent quetzal bird with long green tail feathers perched on a branch, "
    "and a little flag made of woven Guatemalan fabric", "emerald green"))
add("diorama-morral", "gpt-image-1.5", "1024x1024", True, diorama(
    "an open colorful woven Guatemalan morral shoulder bag on a mossy stone, spilling out a rolled parchment map, a small card, a little book "
    "and a glowing lantern, with golden sparkles", "golden"))

# ---------- Objetos ----------
add("farol", "gpt-image-1.5", "1024x1536", True, objeto("A rustic wooden lantern post with a hanging iron lantern glowing warm orange, a little moss at the base"), calidad="medium")
add("pinos", "gpt-image-1.5", "1024x1024", True, objeto("A cluster of three stylized highland pine trees of different heights on a small mossy rock, deep blue-green night tones"), calidad="medium")
add("quetzal", "gpt-image-1.5", "1536x1024", True, objeto("A resplendent quetzal bird flying gracefully, side view, wings spread, very long flowing emerald tail feathers, red chest"), calidad="medium")
add("flores", "gpt-image-1.5", "1024x1024", True, objeto("A lush bush of magenta bougainvillea and orange flowers with green leaves"), calidad="medium")
add("letrero", "gpt-image-1.5", "1536x1024", True, objeto("A blank rectangular wooden sign board, front view, rounded corners, warm painted-wood plank texture, two small rope ties at the top corners, a little moss, completely empty surface"), calidad="medium")
add("cayuco", "gpt-image-1.5", "1536x1024", True, objeto("A traditional wooden cayuco canoe from Lake Atitlan with a paddle, side view, floating on a small patch of glowing water"), calidad="medium")

# ---------- Íconos ----------
for n, d in {
    "ico-asistente": "a friendly purple chat speech bubble with a small glowing sparkle star, representing an AI assistant",
    "ico-curriculum": "a paper document sheet with lines and a golden star badge, representing a résumé",
    "ico-generador": "a magic wand over a rolled scroll with three color bands (purple, turquoise, golden)",
    "ico-caminos": "a wooden signpost with three arrows (no text)",
    "ico-estrella": "a shiny golden star medal with a woven red ribbon",
    "ico-candado": "a coral-red padlock, closed, representing privacy",
    "ico-lupa": "a green magnifying glass with a check mark sparkle, representing verifying",
    "ico-herramientas": "a crossed hammer and trowel construction tools",
    "ico-olla": "a traditional clay cooking pot with steam",
    "ico-canasta": "a woven market basket full of colorful fruits and vegetables",
}.items():
    add(n, "gpt-image-1.5", "1024x1024", True, icono(d), calidad="medium")


def pedir(nombre):
    m = M[nombre]
    destino = os.path.join(SALIDA, nombre + ".png")
    if os.path.exists(destino):
        return f"= {nombre} (ya existe)"
    for intento in range(6):
        try:
            if m["base"]:
                base = os.path.join(SALIDA, m["base"] + ".png")
                with open(base, "rb") as f:
                    r = requests.post("https://api.openai.com/v1/images/edits", headers=H, timeout=600,
                        files=[("image[]", (os.path.basename(base), f, "image/png"))],
                        data={"model": m["modelo"], "prompt": m["prompt"], "size": m["tam"], "quality": m["calidad"],
                              "background": "transparent", "output_format": "png", "input_fidelity": "high"})
            else:
                body = {"model": m["modelo"], "prompt": m["prompt"], "size": m["tam"], "quality": m["calidad"], "n": 1}
                if m["transp"]:
                    body.update(background="transparent", output_format="png")
                r = requests.post("https://api.openai.com/v1/images/generations", headers={**H, "Content-Type": "application/json"},
                                  data=json.dumps(body), timeout=600)
            if r.status_code == 200:
                b = r.json()["data"][0]["b64_json"]
                open(destino, "wb").write(base64.b64decode(b))
                return f"+ {nombre}"
            if r.status_code in (429, 500, 502, 503, 504):
                print("  estado", nombre, r.status_code, r.text[:200], flush=True)
                time.sleep(15 * (intento + 1)); continue
            return f"! {nombre}: {r.status_code} {r.text[:300]}"
        except requests.RequestException as e:
            print("  reintento", nombre, str(e)[:160], flush=True); time.sleep(10 * (intento + 1))
    return f"! {nombre}: agotados los reintentos"


def lote(nombres, hilos=5):
    with cf.ThreadPoolExecutor(hilos) as ex:
        for res in ex.map(pedir, nombres):
            print(res, flush=True)


if __name__ == "__main__":
    pedidos = sys.argv[1:] or list(M)
    sin_base = [n for n in pedidos if not M[n]["base"]]
    con_base = [n for n in pedidos if M[n]["base"]]
    lote(sin_base)
    lote(con_base)
    print("LISTO", flush=True)
