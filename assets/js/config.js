/* ============================================================
   CONFIGURAÇÃO DO SITE — edite só este arquivo para trocar
   links, número, vídeo e integrações.
   ============================================================ */
window.REFUGIO = {
  // WhatsApp (DDI + DDD + número, só dígitos)
  whatsapp: "5511936185678",

  // ID do vídeo do YouTube da home (ex.: em https://youtu.be/AbCdEf123 o ID é "AbCdEf123").
  // Enquanto estiver vazio, a home mostra um slideshow com as fotos.
  youtubeId: "",

  // Redes e perfis
  instagram: "https://www.instagram.com/refugio.pinheirinho",          // ex.: "https://instagram.com/refugiopinheirinho"
  instagramHandle: "@refugio.pinheirinho",    // ex.: "@refugiopinheirinho"
  googleBusiness: "https://www.google.com/maps/dir//Ref%C3%BAgio+Pinheirinho,+R.+B%C3%A9lgica,+Piedade+-+SP,+18170-000,+Brasil/data=!4m8!4m7!1m0!1m5!1m1!1s0x94c57f8aaae8b467:0x22e4cab58fd7c40d!2m2!1d-47.4627279!2d-23.8663912?hl=pt-BR",     // link do perfil no Google Meu Negócio
  googleReview: "",       // link "escrever avaliação" do Google
  // Link do Waze (Waze > Compartilhar local). Este abre a rota direto até as coordenadas da casa.
  waze: "https://waze.com/ul?ll=-23.8663912,-47.4627279&navigate=yes",
  // ID do vídeo do YouTube "Como chegar" (o finalzinho do caminho)
  routeVideoId: "FnzXljuhcsM",
  mapsEmbed: "https://maps.google.com/maps?q=-23.8663912,-47.4627279&z=15&hl=pt-BR&output=embed",          // src do iframe do Google Maps (Compartilhar > Incorporar mapa)

  // Canais de reserva (aparecem como "também estamos no...")
  airbnb: "https://www.airbnb.com.br/rooms/1791327608134215485",
  booking: "",

  /* Disponibilidade — PLANO B (calendário centralizado)
     Quando o backend de reservas estiver no ar, aponte para um endpoint que
     devolva: { "blocked": [ { "start": "2026-12-20", "end": "2026-12-27" } ] }
     ("end" = dia do check-out, não fica bloqueado). Veja docs/arquitetura-reservas.md
     Enquanto estiver vazio, o calendário deixa escolher qualquer data e a
     confirmação é feita no WhatsApp. */
  availabilityEndpoint: "/api/agenda",

  // Mínimo de noites por reserva
  minNights: 2
};
