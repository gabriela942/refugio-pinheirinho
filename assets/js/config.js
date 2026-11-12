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
  instagram: "",          // ex.: "https://instagram.com/refugiopinheirinho"
  instagramHandle: "",    // ex.: "@refugiopinheirinho"
  googleBusiness: "",     // link do perfil no Google Meu Negócio
  googleReview: "",       // link "escrever avaliação" do Google
  mapsEmbed: "",          // src do iframe do Google Maps (Compartilhar > Incorporar mapa)

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
