# Desenha setas amarelas com rótulo nas fotos do passo a passo. Uso: python3 .tools/setas.py
import math
from PIL import Image, ImageDraw, ImageFont
FONT = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
def draw(img, pts, label, lpos, scale=1.0):
    d = ImageDraw.Draw(img); col = (255, 196, 0); out = (20, 20, 20)
    L, W = 46*scale, 26*scale
    (sx, sy), (ex, ey) = pts[-2], pts[-1]; ang = math.atan2(ey-sy, ex-sx)
    base = (ex-math.cos(ang)*L*0.8, ey-math.sin(ang)*L*0.8)
    head = [(ex, ey), (ex-L*math.cos(ang)+W*math.sin(ang), ey-L*math.sin(ang)-W*math.cos(ang)), (ex-L*math.cos(ang)-W*math.sin(ang), ey-L*math.sin(ang)+W*math.cos(ang))]
    line = pts[:-1] + [base]
    d.line(line, fill=out, width=int(20*scale), joint='curve'); d.polygon(head, fill=out, outline=out, width=int(6*scale))
    d.line(line, fill=col, width=int(12*scale), joint='curve'); d.polygon(head, fill=col)
    f = ImageFont.truetype(FONT, int(34*scale)); x, y = lpos
    bb = d.textbbox((x, y), label, font=f); pad = int(12*scale)
    d.rounded_rectangle((bb[0]-pad, bb[1]-pad, bb[2]+pad, bb[3]+pad), radius=int(10*scale), fill=(29, 51, 40))
    d.text((x, y), label, font=f, fill=(255, 255, 255))
def bez(p0,p1,p2,p3,n=40):
    return [tuple((1-t)**3*a+3*(1-t)**2*t*b+3*(1-t)*t**2*c+t**3*d for a,b,c,d in zip(p0,p1,p2,p3)) for t in [i/n for i in range(n+1)]]
JOBS = {
  'rota-1': ([(450, 490), (285, 425)], 'Entrada', (200, 335)),
  'rota-2': ([(560, 110), (378, 292)], 'Pegue a esquerda', (520, 50)),
  'rota-3': ([(640, 110), (485, 225)], 'Portal da fazenda', (600, 50)),
  'rota-6': (bez((470,545),(640,520),(720,430),(600,355))+[(520,345)], 'Direita, depois esquerda', (300,250)),
  'rota-7': ([(495, 200), (495, 385)], 'A casa', (440, 130)),
}
for name, (pts, label, lpos) in JOBS.items():
    im = Image.open(f'assets/img/{name}.jpg').convert('RGB')
    draw(im, pts, label, lpos)
    im.save(f'assets/img/{name}-seta.jpg', quality=86, optimize=True, progressive=True)
    print(name, 'ok')
