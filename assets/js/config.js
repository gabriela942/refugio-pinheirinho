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
  waze: "https://waze.com/ul/h6gy20p0ng",
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
  minNights: 2,

  /* Preço da diária (R$). Cada noite vale pelo dia em que ela começa:
     a noite de 24/12 é a que entra no dia 24 e sai no dia 25.
     Para mudar um feriado, acrescente ou tire a data da lista. */
  prices: {
    normal: 530,
    feriado: 1000,
    feriados: [
      // Natal e Ano Novo 2026
      "2026-12-24", "2026-12-25", "2026-12-31", "2027-01-01",
      // Carnaval 2027 (sexta a terça)
      "2027-02-05", "2027-02-06", "2027-02-07", "2027-02-08", "2027-02-09",
      // Semana Santa 2027
      "2027-03-25", "2027-03-26", "2027-03-27",
      // Tiradentes (quarta, 21/04)
      "2027-04-20", "2027-04-21",
      // Dia do Trabalho (sábado, 01/05)
      "2027-04-30", "2027-05-01",
      // Corpus Christi (quinta, 27/05)
      "2027-05-27", "2027-05-28", "2027-05-29",
      // Independência (terça, 07/09)
      "2027-09-04", "2027-09-05", "2027-09-06",
      // Nossa Senhora Aparecida (terça, 12/10)
      "2027-10-09", "2027-10-10", "2027-10-11",
      // Finados (terça, 02/11)
      "2027-10-30", "2027-10-31", "2027-11-01",
      // Proclamação da República (segunda, 15/11)
      "2027-11-13", "2027-11-14",
      // Consciência Negra (sábado, 20/11)
      "2027-11-19", "2027-11-20",
      // Natal e Ano Novo 2027
      "2027-12-24", "2027-12-25", "2027-12-31", "2028-01-01"
    ]
  }
};
