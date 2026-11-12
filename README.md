# Refúgio Pinheirinho — site

Site estático publicado em https://refugiopinheirinho.com.br.
Roda numa VPS da Hostinger (srv1997156) com nginx e um app Node para `/api/agenda`; a Cloudflare fica na frente (DNS e proxy).

## Onde editar

| O que mudar | Arquivo |
|---|---|
| Textos e seções da home | `index.html` |
| WhatsApp, Airbnb, Booking, Instagram, Google, mapa, vídeo do topo, mínimo de noites | `assets/js/config.js` |
| Cores, fontes e layout | `assets/css/style.css` |
| Comportamento (menu, galeria, calendário de reserva) | `assets/js/main.js` |
| Fotos | `assets/img/` |

## Publicação

A pasta do site na VPS deve puxar a branch `main` deste repositório
(git pull por webhook, cron ou GitHub Actions). Cada push na `main` vai para o ar.

## Atenção: `/api/agenda`

O calendário de reserva lê as datas bloqueadas de `/api/agenda`
(`availabilityEndpoint` em `config.js`). Esse endpoint é um app Node na VPS
e o código dele **ainda não está neste repositório** (não dá para baixá-lo do
site no ar). Ele deve entrar na pasta `api/`.
