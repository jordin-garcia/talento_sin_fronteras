"""Convierte el .docx de guiones en src/data/guiones.json (versión en texto de cada video)."""
import zipfile, re, json, os
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCX = os.path.join(RAIZ, "..", "Textos_Completos_Videos_Talento_Sin_Fronteras.docx")
x = zipfile.ZipFile(DOCX).read("word/document.xml").decode("utf8")
lineas = [''.join(re.findall(r'<w:t[^>]*>([^<]*)</w:t>', p)).strip() for p in re.findall(r'<w:p[ >].*?</w:p>', x, re.S)]
lineas = [l for l in lineas if l]
videos, v, e = [], None, None
for l in lineas:
    m = re.match(r'VIDEO (\d): (.*)', l)
    if m:
        v = {"numero": int(m.group(1)), "titulo": m.group(2).strip(), "escenas": []}; videos.append(v); e = None; continue
    if v is None: continue
    if l.startswith("Módulo:"):
        v["meta"] = re.sub(r'\s+', ' ', l); continue
    m = re.match(r'ESCENA (\d+) · (.*?)\s{2,}(\S+ – \S+)', l)
    if m:
        e = {"numero": int(m.group(1)), "titulo": m.group(2).strip(), "tiempo": m.group(3), "enPantalla": "", "parrafos": []}
        v["escenas"].append(e); continue
    if l.startswith("Nota de producción"): e = None; continue
    if e is None: continue
    if l.startswith("En pantalla:"): e["enPantalla"] = l[len("En pantalla:"):].strip(); continue
    e["parrafos"].append(l)
json.dump(videos, open(os.path.join(RAIZ, "src", "data", "guiones.json"), "w", encoding="utf8"), ensure_ascii=False, indent=1)
print([(v["numero"], len(v["escenas"]), sum(len(s["parrafos"]) for s in v["escenas"])) for v in videos])
