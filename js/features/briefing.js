import { CONFIG, reduceMotion } from "../config.js";
import { SERVICE_BRIEFS, WHATSAPP_INTROS } from "../data/service-briefs.js";

export function setupServiceExperience() {
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
    question.options.forEach((answer) => {
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

  const openService = (key, { pushHistory = true } = {}) => {
    if (!SERVICE_BRIEFS[key]) return;

    if (!document.body.classList.contains("experience-open")) {
      homeScrollY = window.scrollY;
    }

    activeKey = key;
    questionIndex = 0;
    screen.hidden = false;
    document.body.classList.add("experience-open");
    renderQuestion();

    if (pushHistory) {
      history.pushState({ serviceBriefing: true, serviceKey: key }, "", `#briefing-${key}`);
    }

    screen.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    window.scrollTo(0, 0);
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

    const details = service.questions
      .map((question, index) => `• ${question.title} ${answers[index] || "Ainda não informado"}`)
      .join("\n");
    send.href = `${CONFIG.whatsapp}?text=${encodeURIComponent(`${WHATSAPP_INTROS[activeKey]}\n\nMeu briefing:\n${details}`)}`;

    const edit = document.createElement("button");
    edit.type = "button";
    edit.className = "button button-ghost summary-edit";
    edit.textContent = "← Revisar respostas";
    edit.addEventListener("click", () => { questionIndex = 0; renderQuestion(true); screen.scrollTo({ top: 0, behavior: "smooth" }); });

    actions.append(send, edit);
    const note = document.createElement("p");
    note.className = "summary-note";
    note.textContent = "A mensagem abrirá pronta para você revisar e enviar. Nada é enviado sem sua ação.";
    summaryStage.append(success, description, label, list, actions, note);
    summaryStage.classList.remove("summary-stage");
    void summaryStage.offsetWidth;
    summaryStage.classList.add("summary-stage");
    screen.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    window.setTimeout(() => send.focus({ preventScroll: true }), 100);
  };

  const closeServiceExperience = (fromHistory = false) => {
    if (!document.body.classList.contains("experience-open")) return;
    document.body.classList.remove("experience-open");
    screen.hidden = true;
    window.scrollTo({ top: homeScrollY, behavior: reduceMotion ? "auto" : "smooth" });
    if (!fromHistory && history.state?.serviceBriefing) history.back();
    window.setTimeout(() => document.querySelector("[data-service]")?.focus({ preventScroll: true }), 100);
  };

  document.querySelectorAll("[data-service]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openService(link.dataset.service);
    });
  });

  document.querySelectorAll("[data-return-home]").forEach((control) => {
    control.addEventListener("click", (event) => {
      event.preventDefault();
      closeServiceExperience();
    });
  });

  previous.addEventListener("click", () => {
    if (questionIndex > 0) {
      questionIndex -= 1;
      renderQuestion(true);
      screen.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    }
  });

  next.addEventListener("click", () => {
    if (!savedAnswers[activeKey][questionIndex]) return;
    if (questionIndex < SERVICE_BRIEFS[activeKey].questions.length - 1) {
      questionIndex += 1;
      renderQuestion(true);
      screen.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    } else {
      showSummary();
    }
  });

  window.addEventListener("popstate", (event) => {
    if (event.state?.serviceBriefing) openService(event.state.serviceKey, { pushHistory: false });
    else closeServiceExperience(true);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("experience-open")) closeServiceExperience();
  });

  const hashMatch = window.location.hash.match(/^#briefing-(landing|systems|automation|ecommerce)$/);
  if (hashMatch) openService(hashMatch[1], { pushHistory: false });
}
