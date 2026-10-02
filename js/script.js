/* Edite seus links somente neste objeto. */
const CONFIG = {
  whatsapp: "https://wa.me/55799868872217",
  instagram: "https://instagram.com/adrielfelix.dev",
  agape: "https://agapemercearia.com"
};

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

function configureLinks() {
  document.querySelectorAll("[data-link]").forEach((link) => {
    const key = link.dataset.link;
    const base = CONFIG[key];
    if (!base) return;
    const message = link.dataset.message;
    link.href = key === "whatsapp" && message
      ? `${base}${base.includes("?") ? "&" : "?"}text=${encodeURIComponent(message)}`
      : base;
    if (base.includes("SEU")) link.setAttribute("aria-label", `${link.textContent.trim() || key}: configure seu link no arquivo js/script.js`);
  });
}

const SERVICE_BRIEFS = {
  landing: {
    title: "Landing Page", intro: "desenvolver uma Landing Page",
    questions: [
      { title: "Que tipo de página você precisa?", options: ["Página para minha empresa", "Página profissional", "Página para vender um produto", "Página para divulgar um serviço", "Página para uma campanha", "Página para captar contatos", "Ainda não sei / Preciso de orientação"] },
      { title: "Qual é o principal objetivo da página?", options: ["Apresentar minha empresa", "Conseguir mais clientes", "Vender um produto", "Divulgar um serviço", "Captar contatos", "Divulgar uma campanha", "Ainda não sei"] },
      { title: "Você já possui identidade visual?", options: ["Já tenho logo, cores e identidade", "Tenho apenas o logo", "Tenho algumas referências", "Ainda não tenho identidade visual", "Ainda não sei / Preciso de orientação"] },
      { title: "Você quer integração com WhatsApp?", options: ["Sim", "Não", "Ainda não sei"] },
      { title: "Você já possui o conteúdo da página?", options: ["Sim, já tenho tudo", "Tenho parte do conteúdo", "Ainda preciso preparar", "Preciso de ajuda para estruturar", "Ainda não sei"] },
      { title: "Você já possui domínio e hospedagem?", options: ["Sim, já tenho", "Tenho apenas o domínio", "Tenho apenas hospedagem", "Ainda não tenho", "Não sei como funciona"] }
    ]
  },
  systems: {
    title: "Sistema Web", intro: "desenvolver um sistema web",
    questions: [
      { title: "Que tipo de sistema você precisa?", options: ["Sistema de gestão", "Sistema de vendas", "Sistema para clientes", "Sistema de pedidos", "Sistema financeiro", "Sistema de agendamento", "Painel administrativo", "Sistema personalizado", "Ainda não sei / Preciso de orientação"] },
      { title: "Quem utilizará o sistema?", options: ["Somente eu", "Minha equipe", "Meus clientes", "Equipe e clientes", "Ainda não sei"] },
      { title: "O sistema precisa de login?", options: ["Sim", "Não", "Ainda não sei"] },
      { title: "Precisa armazenar informações em banco de dados?", options: ["Sim", "Não", "Não sei / Preciso de orientação"] },
      { title: "Quais funcionalidades você imagina?", options: ["Cadastro de usuários", "Controle de clientes", "Pedidos", "Produtos", "Financeiro", "Relatórios", "Dashboard", "Agendamentos", "Outra funcionalidade", "Ainda não sei"] },
      { title: "Você já possui algum sistema ou começaremos do zero?", options: ["Começar do zero", "Já tenho um sistema", "Tenho uma versão inicial", "Tenho apenas a ideia", "Ainda não sei"] }
    ]
  },
  automation: {
    title: "Automações & IA", intro: "automatizar processos do meu negócio",
    questions: [
      { title: "O que você gostaria de automatizar?", options: ["Atendimento", "WhatsApp", "Instagram", "Vendas", "Tarefas internas", "Criação de conteúdo", "Organização de dados", "Processos repetitivos", "Outro", "Ainda não sei / Preciso de orientação"] },
      { title: "Quais ferramentas você utiliza hoje?", options: ["WhatsApp", "Instagram", "Google Sheets", "CRM", "E-mail", "Sistema próprio", "Outra ferramenta", "Nenhuma", "Ainda não sei"] },
      { title: "Você gostaria de utilizar Inteligência Artificial?", options: ["Sim", "Talvez", "Não", "Não sei / Quero entender melhor"] },
      { title: "Qual resultado você espera conseguir?", options: ["Economizar tempo", "Reduzir tarefas manuais", "Melhorar atendimento", "Conseguir mais vendas", "Organizar processos", "Automatizar operações", "Outro", "Ainda não sei"] },
      { title: "Você já possui alguma automação?", options: ["Sim", "Não", "Tenho algo parcialmente pronto", "Ainda não sei"] }
    ]
  },
  ecommerce: {
    title: "E-commerce", intro: "desenvolver uma loja virtual",
    questions: [
      { title: "O que você pretende vender?", options: ["Produtos físicos", "Produtos digitais", "Serviços", "Ainda estou decidindo", "Ainda não sei"] },
      { title: "Você já possui catálogo de produtos?", options: ["Sim", "Parcialmente", "Ainda não", "Ainda não sei"] },
      { title: "Você precisa de pagamento online?", options: ["Sim", "Não", "Ainda não sei"] },
      { title: "Você precisa calcular entrega ou frete?", options: ["Sim", "Não", "Ainda não sei"] },
      { title: "Você já possui domínio?", options: ["Sim", "Não", "Ainda não sei"] },
      { title: "Você precisa de painel para administrar os pedidos?", options: ["Sim", "Não", "Ainda não sei"] }
    ]
  }
};

function closeMenu() {
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Abrir menu");
  navMenu?.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

function setupNavigation() {
  menuToggle?.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    navMenu?.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  });
  navMenu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });
  const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 24);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

function setupReveal() {
  const elements = document.querySelectorAll(".reveal,.reveal-left,.reveal-right,.reveal-scale");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -35px 0px" });
  elements.forEach((element) => observer.observe(element));
}

function setupDynamicText() {
  const target = document.querySelector(".rotating-word");
  if (!target || reduceMotion) return;
  const words = ["sites.", "sistemas.", "automações.", "soluções com IA."];
  let index = 0;
  window.setInterval(() => {
    target.classList.add("is-changing");
    window.setTimeout(() => {
      index = (index + 1) % words.length;
      target.textContent = words[index];
      target.classList.remove("is-changing");
    }, 260);
  }, 2800);
}

function setupProgressLines() {
  const timeline = document.querySelector(".timeline");
  const timelineFill = document.querySelector(".timeline-progress i");
  const flow = document.querySelector(".flow-visual");
  const flowFill = document.querySelector(".flow-line i");
  const flowSteps = [...document.querySelectorAll(".flow-step")];
  let ticking = false;
  const update = () => {
    const vh = window.innerHeight;
    if (timeline && timelineFill) {
      const rect = timeline.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (vh * .76 - rect.top) / (rect.height - vh * .22)));
      timelineFill.style.height = `${progress * 100}%`;
      document.querySelectorAll(".timeline-item").forEach((item) => {
        const itemTop = item.getBoundingClientRect().top;
        item.classList.toggle("is-visible", itemTop < vh * .78);
      });
    }
    if (flow && flowFill) {
      const rect = flow.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (vh * .76 - rect.top) / (rect.height - vh * .1)));
      flowFill.style.height = `${progress * 100}%`;
      const active = Math.min(flowSteps.length - 1, Math.floor(progress * flowSteps.length));
      flowSteps.forEach((step, index) => step.classList.toggle("is-active", index <= active));
    }
    ticking = false;
  };
  const requestUpdate = () => { if (!ticking) { ticking = true; window.requestAnimationFrame(update); } };
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });
  requestUpdate();
}

function setupCardLighting() {
  if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      card.style.setProperty("--mx", `${x * 100}%`);
      card.style.setProperty("--my", `${y * 100}%`);
      card.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 4}deg) rotateY(${(x - 0.5) * 4}deg) translateY(-3px)`;
    });
    card.addEventListener("pointerleave", () => { card.style.transform = ""; });
  });
}

function setupCursor() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || reduceMotion) return;
  const dot = document.querySelector(".pointer-dot");
  const ring = document.querySelector(".pointer-ring");
  if (!dot || !ring) return;
  let x = -50, y = -50, ringX = x, ringY = y;
  const move = (event) => {
    x = event.clientX; y = event.clientY;
    dot.style.opacity = "1"; ring.style.opacity = "1";
    dot.style.transform = `translate(${x - 2.5}px,${y - 2.5}px)`;
  };
  const animate = () => {
    ringX += (x - ringX) * .18; ringY += (y - ringY) * .18;
    ring.style.transform = `translate(${ringX - 14}px,${ringY - 14}px)`;
    window.requestAnimationFrame(animate);
  };
  window.addEventListener("pointermove", move, { passive: true });
  document.querySelectorAll("a,button,[data-tilt]").forEach((element) => {
    element.addEventListener("pointerenter", () => ring.classList.add("is-hover"));
    element.addEventListener("pointerleave", () => ring.classList.remove("is-hover"));
  });
  animate();
}

function setupParallax() {
  if (reduceMotion || !window.matchMedia("(min-width: 761px) and (hover: hover)").matches) return;
  const visual = document.querySelector(".hero-visual");
  let ticking = false;
  window.addEventListener("pointermove", (event) => {
    if (ticking || !visual) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      const dx = (event.clientX / window.innerWidth - .5) * 7;
      const dy = (event.clientY / window.innerHeight - .5) * 7;
      visual.style.translate = `${dx}px ${dy}px`;
      ticking = false;
    });
  }, { passive: true });
}

function setupLoader() {
  const loader = document.querySelector(".loader");
  if (!loader) return;
  const hide = () => window.setTimeout(() => loader.classList.add("is-hidden"), 260);
  if (document.readyState === "complete") hide();
  else window.addEventListener("load", hide, { once: true });
  window.setTimeout(() => loader.classList.add("is-hidden"), 1300);
}

function setupServiceExperience() {
  const screen = document.querySelector(".briefing-screen");
  if (!screen) return;

  const name = document.querySelector("#briefing-service-name");
  const progress = document.querySelector("#briefing-progress");
  const questionStage = document.querySelector("#question-stage");
  const summaryStage = document.querySelector("#summary-stage");
  const count = document.querySelector("#question-count");
  const title = document.querySelector("#question-title");
  const options = document.querySelector("#answer-options");
  const previous = document.querySelector("#question-back");
  const next = document.querySelector("#question-next");
  const savedAnswers = Object.fromEntries(Object.keys(SERVICE_BRIEFS).map((key) => [key, []]));
  let activeKey = "";
  let questionIndex = 0;
  let homeScrollY = 0;

  const renderProgress = (total) => {
    progress.replaceChildren();
    for (let index = 0; index < total; index += 1) {
      const step = document.createElement("span");
      step.className = "progress-step";
      step.setAttribute("aria-label", `Etapa ${index + 1}${index === questionIndex ? ", atual" : ""}`);
      if (index < questionIndex) step.classList.add("is-complete");
      if (index === questionIndex) step.classList.add("is-current");
      const marker = document.createElement("i");
      marker.textContent = String(index + 1).padStart(2, "0");
      step.append(marker);
      progress.append(step);
    }
  };

  const renderQuestion = (focusHeading = false) => {
    const service = SERVICE_BRIEFS[activeKey];
    const question = service.questions[questionIndex];
    name.textContent = service.title.toUpperCase();
    count.textContent = `${String(questionIndex + 1).padStart(2, "0")} / ${String(service.questions.length).padStart(2, "0")}`;
    title.textContent = question.title;
    options.replaceChildren();
    question.options.forEach((answer, index) => {
      const option = document.createElement("button");
      option.type = "button";
      option.className = "answer-option";
      option.setAttribute("aria-pressed", String(savedAnswers[activeKey][questionIndex] === answer));
      const mark = document.createElement("span");
      mark.className = "option-mark";
      mark.setAttribute("aria-hidden", "true");
      mark.textContent = "✓";
      const label = document.createElement("span");
      label.textContent = answer;
      option.append(mark, label);
      option.addEventListener("click", () => {
        savedAnswers[activeKey][questionIndex] = answer;
        options.querySelectorAll(".answer-option").forEach((button) => button.setAttribute("aria-pressed", String(button === option)));
        next.disabled = false;
      });
      options.append(option);
    });
    renderProgress(service.questions.length);
    previous.hidden = questionIndex === 0;
    next.disabled = !savedAnswers[activeKey][questionIndex];
    next.innerHTML = questionIndex === service.questions.length - 1 ? "Ver resumo <span>→</span>" : "Continuar <span>→</span>";
    questionStage.hidden = false;
    summaryStage.hidden = true;
    questionStage.classList.remove("question-stage");
    void questionStage.offsetWidth;
    questionStage.classList.add("question-stage");
    if (focusHeading) title.focus({ preventScroll: true });
  };

  const openService = (key, options = {}) => {
    if (!SERVICE_BRIEFS[key]) return;
    if (!document.body.classList.contains("experience-open")) {
      if (options.pushHistory !== false) {
        homeScrollY = window.scrollY;
        history.pushState({ serviceBriefing: true, serviceKey: key }, "", `#briefing-${key}`);
      }
    }
    activeKey = key;
    questionIndex = 0;
    screen.hidden = false;
    document.body.classList.add("experience-open");
    renderQuestion();
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    window.setTimeout(() => document.querySelector(".briefing-back")?.focus({ preventScroll: true }), 80);
  };

  const showSummary = () => {
    const service = SERVICE_BRIEFS[activeKey];
    const answers = savedAnswers[activeKey];
    questionStage.hidden = true;
    summaryStage.hidden = false;
    summaryStage.replaceChildren();
    const success = document.createElement("div");
    success.className = "summary-success";
    success.innerHTML = '<span class="summary-check" aria-hidden="true">✓</span><div><p>PROJETO ENTENDIDO</p><h2>Seu projeto está quase pronto.</h2></div>';
    const description = document.createElement("p");
    description.className = "summary-description";
    const projectType = answers[0] ? `: ${answers[0]}` : "";
    const objective = activeKey === "landing" && answers[1] ? ` com o objetivo de ${answers[1].toLowerCase()}` : "";
    description.textContent = `Você está pensando em ${service.intro}${projectType}${objective}. O restante a gente alinha juntos.`;
    const label = document.createElement("p");
    label.className = "summary-label";
    label.textContent = "SEU BRIEFING";
    const list = document.createElement("ul");
    list.className = "summary-list";
    service.questions.forEach((question, index) => {
      const item = document.createElement("li");
      const questionLabel = document.createElement("span");
      questionLabel.textContent = question.title;
      const answer = document.createElement("strong");
      answer.textContent = answers[index] || "Ainda não informado";
      item.append(questionLabel, answer);
      list.append(item);
    });
    const actions = document.createElement("div");
    actions.className = "summary-actions";
    const send = document.createElement("a");
    send.className = "button button-primary";
    send.target = "_blank";
    send.rel = "noopener noreferrer";
    send.innerHTML = "Conversar com Adriel no WhatsApp <span>↗</span>";
    const intros = {
      landing: "Olá, Adriel! Vi seu portfólio e tenho interesse em desenvolver uma Landing Page. Gostaria de te explicar minha ideia e saber mais sobre o projeto.",
      systems: "Olá, Adriel! Vi seu portfólio e tenho interesse em desenvolver um sistema web. Gostaria de te explicar minha ideia e entender como podemos transformar isso em uma solução.",
      automation: "Olá, Adriel! Vi seu portfólio e tenho interesse em automatizar alguns processos do meu negócio. Gostaria de te explicar o que preciso e entender quais soluções podemos desenvolver.",
      ecommerce: "Olá, Adriel! Vi seu portfólio e tenho interesse em desenvolver uma loja virtual. Gostaria de te explicar meu projeto e entender como podemos colocar minha operação online."
    };
    const details = service.questions.map((question, index) => `• ${question.title} ${answers[index]}`).join("\n");
    send.href = `${CONFIG.whatsapp}?text=${encodeURIComponent(`${intros[activeKey]}\n\nMeu briefing:\n${details}`)}`;
    const edit = document.createElement("button");
    edit.type = "button";
    edit.className = "button button-ghost summary-edit";
    edit.textContent = "← Revisar respostas";
    edit.addEventListener("click", () => { questionIndex = 0; renderQuestion(true); });
    actions.append(send, edit);
    const note = document.createElement("p");
    note.className = "summary-note";
    note.textContent = "A mensagem abrirá pronta para você revisar e enviar. Nada é enviado sem sua ação.";
    summaryStage.append(success, description, label, list, actions, note);
    summaryStage.classList.remove("summary-stage");
    void summaryStage.offsetWidth;
    summaryStage.classList.add("summary-stage");
    window.setTimeout(() => send.focus({ preventScroll: true }), 100);
  };

  const closeServiceExperience = (fromHistory = false) => {
    if (!document.body.classList.contains("experience-open")) return;
    document.body.classList.remove("experience-open");
    screen.hidden = true;
    window.requestAnimationFrame(() => window.scrollTo({ top: homeScrollY, behavior: reduceMotion ? "auto" : "smooth" }));
    if (!fromHistory && history.state?.serviceBriefing) history.back();
    window.setTimeout(() => document.querySelector("[data-service]")?.focus({ preventScroll: true }), 100);
  };

  document.querySelectorAll("[data-service]").forEach((link) => {
    link.addEventListener("click", (event) => { event.preventDefault(); openService(link.dataset.service); });
  });
  document.querySelectorAll("[data-return-home]").forEach((control) => {
    control.addEventListener("click", (event) => { event.preventDefault(); closeServiceExperience(); });
  });
  previous.addEventListener("click", () => { if (questionIndex > 0) { questionIndex -= 1; renderQuestion(true); } });
  next.addEventListener("click", () => {
    if (!savedAnswers[activeKey][questionIndex]) return;
    if (questionIndex < SERVICE_BRIEFS[activeKey].questions.length - 1) { questionIndex += 1; renderQuestion(true); }
    else showSummary();
  });
  window.addEventListener("popstate", (event) => {
    if (event.state?.serviceBriefing) openService(event.state.serviceKey, { pushHistory: false });
    else closeServiceExperience(true);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("experience-open")) closeServiceExperience();
  });
}

configureLinks();
setupNavigation();
setupReveal();
setupDynamicText();
setupProgressLines();
setupCardLighting();
setupCursor();
setupParallax();
setupLoader();
setupServiceExperience();
