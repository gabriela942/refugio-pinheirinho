# Refúgio Pinheirinho — site

Site estático publicado em https://refugiopinheirinho.com.br (Cloudflare Pages).

## Onde editar

| O que mudar | Arquivo |
|---|---|
| Textos e seções da home | `index.html` |
| WhatsApp, Airbnb, Booking, Instagram, Google, mapa, vídeo do topo, mínimo de noites | `assets/js/config.js` |
| Cores, fontes e layout | `assets/css/style.css` |
| Comportamento (menu, galeria, calendário de reserva) | `assets/js/main.js` |
| Fotos | `assets/img/` |

## Publicação

O projeto na Cloudflare Pages deve estar ligado a este repositório.
Configuração de build: sem comando de build, pasta de saída `/` (raiz).
Cada push na branch `main` publica o site.

## Atenção: `/api/agenda`

O calendário de reserva lê as datas bloqueadas de `/api/agenda`
(`availabilityEndpoint` em `config.js`). Esse endpoint roda no servidor
(Cloudflare Pages Function ou Worker) e o código dele **não está neste
repositório**, porque não dá para baixá-lo do site no ar.

Antes de ligar o Git ao projeto do Pages, confira no painel da Cloudflare de onde
vem esse endpoint. Se for uma Pages Function (pasta `functions/` do projeto),
copie o arquivo para `functions/api/agenda.js` aqui; senão o próximo deploy
derruba o calendário.
