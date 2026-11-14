"""
Genera la linea tratteggiata dell'hero: un anello chiuso (nessun capo libero)
che passa dietro le 4 immagini, con due riccioli e delle onde sui lati.

Uso (dalla cartella frontend):  python scripts/hero_path.py
Il risultato viene scritto in src/data/heroPath.js.

Parametri da modificare:
  LOOPS  -> (posizione sull'anello in radianti, raggio, ampiezza, 1=fuori / -1=dentro)
  WAVES  -> (posizione, ampiezza delle onde)
Coordinate nel riquadro 1440 x 760 dell'hero.
"""
import os
import math
cx, cy, rx = 720, 385, 610
def base(t):
    c, s = math.cos(t), math.sin(t); p = 0.72
    x = cx + rx * math.copysign(abs(c) ** p, c)
    ry = 305 if s < 0 else 330
    y = cy + ry * math.copysign(abs(s) ** p, s)
    return x, y
def wrap(d): return math.atan2(math.sin(d), math.cos(d))
def smooth(u): return u*u*(3-2*u)
LOOPS = [(-1.95, 52, 0.15, -1), (1.22, 46, 0.13, -1)]  # (centro, raggio, mezza-larghezza, verso: 1 fuori, -1 dentro)  # (centro, raggio, mezza-larghezza)
WAVES = [(0.05, 62), (math.pi + 0.05, 62)]
pts = []
N = 700
for i in range(N):
    t = 2 * math.pi * i / N
    x, y = base(t)
    x2, y2 = base(t + 1e-4)
    tx, ty = x2 - x, y2 - y; L = math.hypot(tx, ty); tx, ty = tx / L, ty / L
    nx, ny = ty, -tx   # normale verso l'esterno (verso orario in coordinate schermo)
    for t0, r, W, side in LOOPS:
        d = wrap(t - t0)
        if abs(d) < W:
            a = 2 * math.pi * smooth((d + W) / (2 * W))
            x += r * math.sin(a) * tx + side * r * (1 - math.cos(a)) * nx
            y += r * math.sin(a) * ty + side * r * (1 - math.cos(a)) * ny
    for t0, amp in WAVES:
        d = wrap(t - t0)
        w = math.exp(-(d / 0.42) ** 2)
        x += w * amp * math.sin(6 * d) * nx
        y += w * amp * math.sin(6 * d) * ny
    pts.append((x, y))
d = "M" + " L".join(f"{x:.0f} {y:.0f}" for x, y in pts) + " Z"
out = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'heroPath.js')
with open(out, 'w', encoding='utf-8') as f:
    f.write('/* Generato da scripts/hero_path.py: non modificare a mano. */\n')
    f.write(f'export const HERO_PATH = "{d}";\n')
print('Scritto', os.path.normpath(out))
