# Refúgio Pinheirinho — site

Site estático publicado em https://refugiopinheirinho.com.br.
Roda na VPS da Hostinger (srv1997156), em `/opt/stack/refugio-site` (container nginx:alpine,
arquivos em `html/`), atrás do Traefik. A Cloudflare fica na frente (DNS e proxy).

## Onde editar

| O que mudar | Arquivo |
|---|---|
| Textos e seções da home | `index.html` |
| WhatsApp, Airbnb, Booking, Instagram, Google, mapa, vídeo do topo, mínimo de noites | `assets/js/config.js` |
| Cores, fontes e layout | `assets/css/style.css` |
| Comportamento (menu, galeria, calendário de reserva) | `assets/js/main.js` |
| Fotos | `assets/img/` |
| Página de como chegar (`/localizacao`, sem link na home) | `localizacao/index.html` (links do Waze, Maps e vídeo em `config.js`) |

## Publicação

A pasta do site na VPS deve puxar a branch `main` deste repositório
(git pull por webhook, cron ou GitHub Actions). Cada push na `main` vai para o ar.

## Atenção

- **Rotas:** o Traefik só manda para este site `/`, `/index.html` e `/assets/`.
  O resto do domínio é do app da loja/comanda (`/opt/stack/pinheirinho`). Uma página
  nova (ex.: `/galeria.html`) precisa de regra nova no `docker-compose.yml` do site.
- **`/localizacao`** precisa da regra `PathPrefix(`/localizacao`)` no Traefik para sair do ar do app da loja.
- **`/api/agenda`** (datas ocupadas do calendário) não é deste repositório: vem do app
  `/opt/stack/pinheirinho` (`server.mjs`), que lê o banco `fazenda_pinheiro`.
  O site só consome o endpoint (`availabilityEndpoint` em `config.js`).
