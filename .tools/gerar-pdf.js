// Gera assets/pdf/como-chegar-refugio-pinheirinho.pdf a partir do passo a passo de localizacao/index.html.
// Uso (na raiz do repo): node .tools/gerar-pdf.js
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'localizacao/index.html'), 'utf8');
const strip = s => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const steps = [...html.matchAll(/<li class="step[^"]*">([\s\S]*?)<\/li>/g)].map(m => {
  const b = m[1];
  const imgs = [...b.matchAll(/<img src="\/([^"?]+)/g)].map(m => 'file://' + path.join(root, m[1]));
  return { n: strip((b.match(/step__n">([\s\S]*?)</) || [])[1] || ''), h: strip((b.match(/<h3>([\s\S]*?)<\/h3>/) || [])[1] || ''),
           p: strip((b.match(/<p>([\s\S]*?)<\/p>/) || [])[1] || ''), imgs };
});
const notes = [...html.matchAll(/<p class="steps__note">([\s\S]*?)<\/p>/g)].map(m => m[1]);
const cfg = fs.readFileSync(path.join(root, 'assets/js/config.js'), 'utf8');
const wa = (cfg.match(/whatsapp:\s*"(\d+)"/) || [])[1] || '';
const waFmt = wa.replace(/^55(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3');
const page = `<!doctype html><html lang="pt-BR"><meta charset="utf-8"><style>
@page{size:A4;margin:14mm}
body{font-family:Georgia,serif;color:#1d3328;margin:0}
h1{font-size:24pt;margin:0 0 4pt}.sub{font-family:Arial,sans-serif;font-size:10.5pt;color:#555;margin:0 0 10pt}
.note{font-family:Arial,sans-serif;font-size:10pt;background:#f6f1e7;border-left:4px solid #e4ac2f;padding:7pt 10pt;margin:0 0 6pt;border-radius:4pt}
.step{display:flex;gap:12pt;align-items:center;break-inside:avoid;padding:9pt 0;border-top:1px solid #e3ddd0}
.ims{display:grid;gap:3pt;flex:none}.step img{width:76mm;height:43mm;object-fit:cover;border-radius:5pt;display:block}
.n{display:inline-block;width:20pt;height:20pt;line-height:20pt;text-align:center;border-radius:50%;background:#1d3328;color:#fff;font-family:Arial;font-size:10pt;margin-right:6pt}
h3{font-size:13.5pt;margin:0 0 4pt}p{font-family:Arial,sans-serif;font-size:10.5pt;line-height:1.45;margin:0;color:#333}
.foot{font-family:Arial,sans-serif;font-size:10pt;margin-top:12pt;color:#333}
</style><body>
<h1>Como chegar ao Refúgio Pinheirinho</h1>
<p class="sub">Piedade (SP) · Rua Bélgica · Guarde este arquivo no celular: no trecho final não tem sinal.</p>
${notes.map(n => `<div class="note">${n}</div>`).join('')}
${steps.map(s => `<div class="step">${s.imgs.length ? `<div class="ims">${s.imgs.map(i => `<img src="${i}">`).join('')}</div>` : ''}<div><h3><span class="n">${s.n}</span>${s.h}</h3><p>${s.p}</p></div></div>`).join('')}
<p class="foot">Dúvidas no caminho? WhatsApp ${waFmt}${waFmt ? '' : ''}</p>
</body></html>`;
(async () => {
  const tmp = path.join(root, '.tools', '_pdf.html'); fs.writeFileSync(tmp, page);
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + tmp, { waitUntil: 'load' });
  await p.pdf({ path: path.join(root, 'assets/pdf/como-chegar-refugio-pinheirinho.pdf'), format: 'A4', printBackground: true });
  await b.close(); fs.unlinkSync(tmp);
  console.log('PDF gerado com', steps.length, 'passos');
})();
