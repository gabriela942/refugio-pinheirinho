/* Refúgio Pinheirinho — interações */
(() => {
  const C = window.REFUGIO || {};
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const IMG = n => `assets/img/${n}.jpg`;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const waLink = (text = "") =>
    `https://wa.me/${C.whatsapp}${text ? "?text=" + encodeURIComponent(text) : ""}`;

  /* ---------- links da config ---------- */
  const setLink = (el, url) => { if (!el) return; if (url) el.href = url; else el.hidden = true; };
  $("#waFloat").href = waLink("Olá! Vim pelo site do Refúgio Pinheirinho e quero saber mais sobre a casa.");
  $("#ftWa").href = $("#waFloat").href;
  setLink($("#lnkAirbnb"), C.airbnb);
  setLink($("#lnkBooking"), C.booking);
  if (!C.airbnb && !C.booking) $("#channels").hidden = true;
  setLink($("#lnkGoogle"), C.googleBusiness);
  setLink($("#lnkReview"), C.googleReview);
  setLink($("#ftGoogle"), C.googleBusiness);
  setLink($("#ftInsta"), C.instagram);
  if (C.instagram) {
    $("#instaHandle").href = C.instagram;
    $$("#instaGrid a").forEach(a => (a.href = C.instagram));
  }
  if (C.instagramHandle) $("#instaHandle").textContent = C.instagramHandle;
  if (C.mapsEmbed) {
    $("#mapBox").innerHTML = `<iframe src="${C.mapsEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Mapa do Refúgio Pinheirinho"></iframe>`;
  }
  $("#year").textContent = new Date().getFullYear();

  /* ---------- NAV ---------- */
  const nav = $("#nav");
  const burger = $("#burger");
  const onScrollNav = () => nav.classList.toggle("is-solid", scrollY > innerHeight * 0.6);
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
  });
  $$("#navLinks a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("is-open"); burger.setAttribute("aria-expanded", false); document.body.style.overflow = "";
  }));
  const sections = $$("#navLinks a").map(a => $(a.getAttribute("href"))).filter(Boolean);

  /* ---------- HERO: vídeo ou slideshow ---------- */
  const slides = $$(".hero__slide");
  let slideI = 0, slideTimer;
  const nextSlide = () => {
    slides[slideI].classList.remove("is-active");
    slideI = (slideI + 1) % slides.length;
    slides[slideI].classList.add("is-active");
  };
  if (!reduced) slideTimer = setInterval(nextSlide, 6000);

  if (C.youtubeId) {
    const id = C.youtubeId;
    const f = document.createElement("iframe");
    f.className = "hero__video";
    f.allow = "autoplay; encrypted-media";
    f.title = "Vídeo do Refúgio Pinheirinho";
    f.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3&disablekb=1`;
    f.addEventListener("load", () => setTimeout(() => { f.classList.add("is-ready"); clearInterval(slideTimer); }, 1200));
    $("#heroMedia").appendChild(f);

    const btn = $("#playFilm"); btn.hidden = false;
    const modal = $("#filmModal");
    const close = () => { modal.hidden = true; $("#filmBox").innerHTML = ""; document.body.style.overflow = ""; };
    btn.addEventListener("click", () => {
      $("#filmBox").innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" allow="autoplay; encrypted-media; fullscreen" allowfullscreen title="Vídeo do Refúgio Pinheirinho"></iframe>`;
      modal.hidden = false; document.body.style.overflow = "hidden";
    });
    $("#filmClose").addEventListener("click", close);
    modal.addEventListener("click", e => { if (e.target === modal) close(); });
    addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) close(); });
  }

  /* ---------- reveal ao rolar ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
  }), { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal").forEach(el => io.observe(el));

  /* ---------- A CASA: explorador ---------- */
  const ROOMS = [
    { name: "Por fora", imgs: ["casa-gato|A casa", "fachada|A casa"],
      text: "Uma casa de madeira amarela, com varanda em volta e gramado a perder de vista. Quando escurece, as luzes da varanda acendem e a casa fica ainda mais aconchegante.",
      feats: ["Casa de madeira", "Varanda iluminada", "Gramado amplo", "Jardim"] },
    { name: "Sala", imgs: ["sala-estar", "sala-jantar"],
      text: "Lareira de tijolinho, sofás para a família toda e janelas de vidro que abrem para a varanda. A mesa de jantar fica ao lado da estante cheia de livros e jogos.",
      feats: ["Lareira", "TV", "Mesa de jantar", "Livros e jogos de tabuleiro"] },
    { name: "Cozinha", imgs: ["cozinha-1", "cozinha-2", "cozinha-cafe|Café da manhã de frente para o jardim"],
      text: "Ampla, iluminada e completa. Tem tudo para cozinhar de verdade: do café da manhã ao jantar de domingo.",
      feats: ["Fogão de 6 bocas", "Lava-louças", "Micro-ondas e forno elétrico", "Panelas e utensílios", "Mesa para refeições"] },
    { name: "Quartos", imgs: ["quarto-casal|Quarto 1 · suíte de casal", "banheiro-suite|Banheiro da suíte", "quarto-solteiro|Quarto 2 · duas camas de solteiro", "quarto-3b|Quarto 3 · duas camas de solteiro", "quarto-3a|Quarto 3 · duas camas de solteiro"],
      text: "São três quartos: uma suíte de casal, com banheiro próprio, e dois quartos com duas camas de solteiro cada um. Todos com piso de madeira, cortinas de crochê e janela para o verde. Roupa de cama e toalhas estão à disposição de vocês.",
      feats: ["1 suíte de casal com banheiro", "2 quartos com 2 camas de solteiro cada", "Roupa de cama", "Toalhas"] },
    { name: "Banheiros", imgs: ["banheiro-1|Banheiro compartilhado da casa", "banheiro-2|Banheiro externo"],
      text: "Além do banheiro da suíte, a casa tem um banheiro compartilhado, dentro da casa, e um banheiro externo.",
      feats: ["Banheiro compartilhado", "Banheiro externo", "Banheiro da suíte", "Box de vidro", "Toalhas"] },
    { name: "Varanda", imgs: ["varanda"],
      text: "A varanda de madeira abraça a casa e olha direto para o lago. Tem rede, poltronas e o melhor café da manhã da sua vida.",
      feats: ["Rede", "Vista para o lago", "Mesa externa", "Espreguiçadeiras"] },
    { name: "Área gourmet", imgs: ["churrasqueira", "area-externa"],
      text: "Coberta e integrada ao jardim. Churrasqueira, forno de pizza e fogão a lenha num só lugar, com mesa grande para reunir todo mundo.",
      feats: ["Churrasqueira", "Forno de pizza a lenha", "Fogão a lenha", "Pia e bancada", "Mesa comunitária", "Lavabo"] },
    // oculto por enquanto: para mostrar de novo, troque hidden: true por hidden: false
    { name: "Salão de jogos", hidden: true, imgs: ["jogos-1|Mesa de sinuca", "jogos-2|Deck com vista para o lago", "jogos-3|O salão por fora", "jogos-4|Salão de jogos", "jogos-banheiro|Banheiro do salão"],
      text: "Um contêiner vermelho virou o salão de jogos, separado da casa. Tem mesa de sinuca, portas de vidro de ponta a ponta e um deck de madeira de frente para o lago. Tem banheiro próprio.",
      feats: ["Mesa de sinuca", "Deck com vista para o lago", "Portas e janelas amplas", "Banheiro próprio"] },
    { name: "Lavanderia", imgs: ["lavanderia"],
      text: "Para estadias mais longas, a casa conta com lavanderia equipada.",
      feats: ["Máquina de lavar", "Secadora", "Tanque e varal"] }
  ].filter(r => !r.hidden);
  const tabs = $("#roomTabs");
  let room = 0, photo = 0;
  ROOMS.forEach((r, i) => {
    const b = document.createElement("button");
    b.className = "rooms__tab"; b.role = "tab"; b.textContent = r.name;
    b.setAttribute("aria-selected", i === 0);
    b.addEventListener("click", () => showRoom(i));
    tabs.appendChild(b);
  });
  const swapImg = (src, alt) => {
    const img = $("#roomImg");
    img.classList.add("is-swap");
    const pre = new Image(); pre.src = src;
    pre.onload = () => setTimeout(() => { img.src = src; img.alt = alt; img.classList.remove("is-swap"); }, 180);
  };
  function showRoom(i, first) {
    room = i; photo = 0;
    const r = ROOMS[i];
    $$(".rooms__tab").forEach((t, j) => t.setAttribute("aria-selected", j === i));
    const info = $(".rooms__info");
    info.classList.add("is-swap");
    setTimeout(() => {
      $("#roomTitle").textContent = r.name;
      $("#roomText").textContent = r.text;
      $("#roomFeats").innerHTML = r.feats.map(f => `<li>${f}</li>`).join("");
      info.classList.remove("is-swap");
    }, first ? 0 : 220);
    showPhoto(first);
  }
  function showPhoto(first) {
    const r = ROOMS[room];
    const [file, cap = ""] = r.imgs[photo].split("|");
    const src = IMG(file), alt = cap || r.name;
    if (first) { $("#roomImg").src = src; $("#roomImg").alt = alt; } else swapImg(src, alt);
    $("#roomCap").textContent = cap; $("#roomCap").hidden = !cap;
    $("#roomCount").textContent = `${photo + 1} / ${r.imgs.length}`;
    $("#roomPrev").hidden = $("#roomNext").hidden = r.imgs.length < 2;
  }
  $("#roomPrev").addEventListener("click", () => { const n = ROOMS[room].imgs.length; photo = (photo - 1 + n) % n; showPhoto(); });
  $("#roomNext").addEventListener("click", () => { const n = ROOMS[room].imgs.length; photo = (photo + 1) % n; showPhoto(); });
  // swipe na foto
  let tx = null;
  $("#roomPhoto").addEventListener("touchstart", e => (tx = e.touches[0].clientX), { passive: true });
  $("#roomPhoto").addEventListener("touchend", e => {
    if (tx === null) return; const dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 40) (dx < 0 ? $("#roomNext") : $("#roomPrev")).click();
  });
  showRoom(0, true);

  /* ---------- NATUREZA: carrossel arrastável ---------- */
  const rail = $("#natureRail");
  let down = false, sx = 0, sl = 0, moved = false;
  rail.addEventListener("pointerdown", e => {
    if (e.pointerType !== "mouse") return;
    down = true; moved = false; sx = e.clientX; sl = rail.scrollLeft;
  });
  addEventListener("pointermove", e => {
    if (!down) return;
    const dx = e.clientX - sx;
    if (Math.abs(dx) > 4) { moved = true; rail.classList.add("is-drag"); }
    rail.scrollLeft = sl - dx;
  });
  addEventListener("pointerup", () => { down = false; rail.classList.remove("is-drag"); });
  rail.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") rail.scrollBy({ left: 320, behavior: "smooth" });
    if (e.key === "ArrowLeft") rail.scrollBy({ left: -320, behavior: "smooth" });
  });
  rail.addEventListener("scroll", () => {
    const p = rail.scrollLeft / (rail.scrollWidth - rail.clientWidth || 1);
    $("#railProgress").style.width = 15 + p * 85 + "%";
  }, { passive: true });

  /* ---------- UM DIA NO REFÚGIO ---------- */
  const steps = $$(".day__list li");
  const dayImgs = $$(".day__frame img");
  const dayIO = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const k = e.target.dataset.step;
    steps.forEach(s => s.classList.toggle("is-on", s === e.target));
    dayImgs.forEach(im => im.classList.toggle("is-on", im.dataset.day === k));
  }), { rootMargin: "-45% 0px -45% 0px" });
  steps.forEach(s => dayIO.observe(s));
  steps[0].classList.add("is-on");

  /* ---------- GALERIA ---------- */
  const PHOTOS = [
    ["fachada", "Fachada", "externa"], ["cachoeira", "Cachoeira", "natureza"], ["sala-estar", "Sala de estar", "casa"],
    ["varanda", "Varanda e vista", "externa"], ["cozinha-1", "Cozinha", "casa"], ["area-verde", "Área verde", "natureza"],
    ["quarto-casal", "Quarto de casal", "casa"], ["churrasqueira", "Área de churrasqueira", "externa"], ["lago", "Lago", "natureza"],
    ["sala-jantar", "Sala de jantar", "casa"], ["jardim", "Jardim", "natureza"], ["cozinha-2", "Cozinha", "casa"],
    ["area-externa", "Área externa", "externa"], ["quarto-solteiro", "Quarto com camas de solteiro", "casa"],
    ["banheiro-1", "Banheiro", "casa"], ["banheiro-2", "Banheiro", "casa"], ["lavanderia", "Lavanderia", "casa"]
  ];
  const gal = $("#gallery");
  PHOTOS.forEach(([f, cap, cat], i) => {
    const fig = document.createElement("figure");
    fig.dataset.cat = cat; fig.dataset.i = i; fig.className = "reveal";
    fig.tabIndex = 0;
    fig.innerHTML = `<img src="${IMG(f)}" alt="${cap}" loading="lazy"><figcaption>${cap}</figcaption>`;
    gal.appendChild(fig); io.observe(fig);
  });
  $$("#galleryFilters .chip").forEach(ch => ch.addEventListener("click", () => {
    $$("#galleryFilters .chip").forEach(c => c.classList.toggle("is-on", c === ch));
    const f = ch.dataset.filter;
    $$("#gallery figure").forEach(fig => fig.classList.toggle("is-hidden", f !== "all" && fig.dataset.cat !== f));
  }));
  // lightbox
  const lb = $("#lightbox");
  let lbList = [], lbI = 0;
  const lbShow = () => { const [f, cap] = PHOTOS[lbList[lbI]]; $("#lbImg").src = IMG(f); $("#lbImg").alt = cap; $("#lbCap").textContent = cap; };
  const lbOpen = i => {
    lbList = $$("#gallery figure:not(.is-hidden)").map(f => +f.dataset.i);
    lbI = Math.max(0, lbList.indexOf(i)); lbShow(); lb.hidden = false; document.body.style.overflow = "hidden"; $("#lbClose").focus();
  };
  const lbClose = () => { lb.hidden = true; document.body.style.overflow = ""; };
  const lbStep = d => { lbI = (lbI + d + lbList.length) % lbList.length; lbShow(); };
  gal.addEventListener("click", e => { const f = e.target.closest("figure"); if (f) lbOpen(+f.dataset.i); });
  gal.addEventListener("keydown", e => { if (e.key === "Enter") { const f = e.target.closest("figure"); if (f) lbOpen(+f.dataset.i); } });
  $("#lbClose").addEventListener("click", lbClose);
  $("#lbPrev").addEventListener("click", () => lbStep(-1));
  $("#lbNext").addEventListener("click", () => lbStep(1));
  lb.addEventListener("click", e => { if (e.target === lb) lbClose(); });
  addEventListener("keydown", e => {
    if (lb.hidden) return;
    if (e.key === "Escape") lbClose();
    if (e.key === "ArrowRight") lbStep(1);
    if (e.key === "ArrowLeft") lbStep(-1);
  });
  let lx = null;
  lb.addEventListener("touchstart", e => (lx = e.touches[0].clientX), { passive: true });
  lb.addEventListener("touchend", e => { if (lx === null) return; const dx = e.changedTouches[0].clientX - lx; lx = null; if (Math.abs(dx) > 40) lbStep(dx < 0 ? 1 : -1); });

  /* ---------- RESERVA: calendário ---------- */
  const MONTHS = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  const DOW = ["D", "S", "T", "Q", "Q", "S", "S"];
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const parse = s => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const fmt = d => d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }).replace(".", "");
  const fmtFull = d => d.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "2-digit", year: "numeric" });
  const localKey = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

  const blocked = new Set();
  let viewY = today.getFullYear(), viewM = today.getMonth();
  let ci = null, co = null;

  const isBlocked = d => blocked.has(localKey(d));
  const rangeHasBlock = (a, b) => { for (let d = new Date(a); d < b; d = addDays(d, 1)) if (isBlocked(d)) return true; return false; };

  function renderCal() {
    const months = 1; // 1 mês por vez mantém o formulário compacto
    const body = $("#calBody"); body.innerHTML = "";
    const first = new Date(viewY, viewM, 1);
    $("#calMonths").textContent = `${MONTHS[viewM]} ${viewY}`;
    $("#calPrev").disabled = viewY === today.getFullYear() && viewM === today.getMonth();
    for (let m = 0; m < months; m++) {
      const grid = document.createElement("div"); grid.className = "cal__grid";
      DOW.forEach(d => grid.insertAdjacentHTML("beforeend", `<span class="cal__dow">${d}</span>`));
      for (let i = 0; i < first.getDay(); i++) grid.insertAdjacentHTML("beforeend", "<span></span>");
      const days = new Date(viewY, viewM + 1, 0).getDate();
      for (let n = 1; n <= days; n++) {
        const d = new Date(viewY, viewM, n);
        const b = document.createElement("button");
        b.type = "button"; b.className = "cal__day"; b.textContent = n;
        b.dataset.k = localKey(d);
        const past = d < today, off = isBlocked(d);
        if (past) b.disabled = true;
        if (off) { b.classList.add("is-off"); b.title = "Indisponível"; }
        if (+d === +today) b.classList.add("is-today");
        if (ci && +d === +ci) b.classList.add("is-start");
        if (co && +d === +co) b.classList.add("is-end");
        if (ci && co && d > ci && d < co) b.classList.add("in-range");
        b.setAttribute("aria-label", d.toLocaleDateString("pt-BR", { day: "numeric", month: "long" }) + (off ? ", indisponível" : ""));
        b.addEventListener("click", () => pick(d));
        b.addEventListener("mouseenter", () => hover(d));
        grid.appendChild(b);
      }
      body.appendChild(grid);
    }
  }
  function hover(d) {
    if (!ci || co || d <= ci) return;
    $$(".cal__day").forEach(b => { const x = parse(b.dataset.k); b.classList.toggle("in-range", x > ci && x < d); });
  }
  const msg = (t, ok) => { const m = $("#formMsg"); m.textContent = t; m.classList.toggle("ok", !!ok); };
  function pick(d) {
    msg("");
    if (!ci || co || d <= ci) {
      if (isBlocked(d)) { msg("Essa data já está reservada. Escolha outro dia de chegada."); return; }
      ci = d; co = null;
    } else {
      if (rangeHasBlock(ci, d)) { msg("Tem dias reservados nesse intervalo. Tente outro período."); return; }
      const nights = Math.round((d - ci) / 864e5);
      if (nights < (C.minNights || 1)) { msg(`A estadia mínima é de ${C.minNights} noites.`); return; }
      co = d;
    }
    updateSummary(); renderCal();
  }
  function updateSummary() {
    $("#outIn").textContent = ci ? fmt(ci) : "—";
    $("#outOut").textContent = co ? fmt(co) : "—";
    $("#outNights").textContent = ci && co ? Math.round((co - ci) / 864e5) : "—";
  }
  $("#calPrev").addEventListener("click", () => { viewM--; if (viewM < 0) { viewM = 11; viewY--; } renderCal(); });
  $("#calNext").addEventListener("click", () => { viewM++; if (viewM > 11) { viewM = 0; viewY++; } renderCal(); });

  // hóspedes
  let guests = 2;
  $$(".stepper button").forEach(b => b.addEventListener("click", () => {
    guests = Math.min(30, Math.max(1, guests + +b.dataset.step)); $("#fGuests").textContent = guests;
  }));

  // disponibilidade (plano B: calendário centralizado)
  async function loadAvailability() {
    if (!C.availabilityEndpoint) return;
    try {
      const r = await fetch(C.availabilityEndpoint, { cache: "no-store" });
      const data = await r.json();
      (data.blocked || []).forEach(({ start, end }) => {
        for (let d = parse(start); d < parse(end); d = addDays(d, 1)) blocked.add(localKey(d));
      });
      renderCal();
    } catch (e) { console.warn("Não foi possível carregar a disponibilidade", e); }
  }

  $("#bookingForm").addEventListener("submit", e => {
    e.preventDefault();
    const name = $("#fName").value.trim();
    const notes = $("#fNotes").value.trim();
    let text = `Olá! ${name ? "Meu nome é " + name + " e " : ""}quero fazer uma reserva no Refúgio Pinheirinho.\n\n`;
    if (ci && co) {
      const n = Math.round((co - ci) / 864e5);
      text += `📅 Check-in: ${fmtFull(ci)}\n📅 Check-out: ${fmtFull(co)}\n🌙 ${n} noite${n > 1 ? "s" : ""}\n`;
    } else if (ci) {
      text += `📅 Chegada: ${fmtFull(ci)} (saída a combinar)\n`;
    } else {
      text += `📅 Datas: ainda estou definindo\n`;
    }
    text += `👥 ${guests} hóspede${guests > 1 ? "s" : ""}\n`;
    if (notes) text += `📝 ${notes}\n`;
    text += `\nPode me passar a disponibilidade e o valor?`;
    msg("Abrindo o WhatsApp...", true);
    window.open(waLink(text), "_blank", "noopener");
  });

  renderCal(); updateSummary(); loadAvailability();

  /* ---------- parallax + barra da história + whatsapp flutuante ---------- */
  const par = $$("[data-parallax]");
  const storyTrack = $(".story__track");
  const waF = $("#waFloat");
  let ticking = false;
  function onScroll() {
    onScrollNav();
    waF.classList.toggle("is-in", scrollY > innerHeight * 0.7);
    if (!reduced) par.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > innerHeight + 200) return;
      const c = r.top + r.height / 2 - innerHeight / 2;
      el.style.transform = `translate3d(0,${(-c * +el.dataset.parallax).toFixed(1)}px,0)`;
    });
    const sr = storyTrack.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * 0.6 - sr.top) / sr.height));
    $("#storyProgress").style.height = p * 100 + "%";
    ticking = false;
  }
  addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  addEventListener("resize", onScroll);
  onScroll();

  /* nav ativo (observer) */
  const navObs = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) $$("#navLinks a").forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(s => navObs.observe(s));
})();
