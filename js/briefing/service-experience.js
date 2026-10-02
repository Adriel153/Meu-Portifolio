(function () {
  "use strict";

  const FALLBACK_INTROS = {
    landing: "Olá, Adriel! Vi seu portfólio e tenho interesse em desenvolver uma Landing Page. Gostaria de te explicar minha ideia e saber mais sobre o projeto.",
    systems: "Olá, Adriel! Vi seu portfólio e tenho interesse em desenvolver um sistema web. Gostaria de te explicar minha ideia e entender como podemos transformar isso em uma solução.",
    automation: "Olá, Adriel! Vi seu portfólio e tenho interesse em automatizar alguns processos do meu negócio. Gostaria de te explicar o que preciso e entender quais soluções podemos desenvolver.",
    ecommerce: "Olá, Adriel! Vi seu portfólio e tenho interesse em desenvolver uma loja virtual. Gostaria de te explicar meu projeto e entender como podemos colocar minha operação online."
  };

  function initBriefingExperience() {
    const screen = document.getElementById("briefing");
    if (!screen) return;

    const serviceData = window.SERVICE_BRIEFS || {};
    const intros = window.WHATSAPP_INTROS || FALLBACK_INTROS;
    const whatsapp = "https://wa.me/55799868872217";

    const name = document.getElementById("briefing-service-name");
    const progress = document.getElementById("briefing-progress");
    const questionStage = document.getElementById("question-stage");
    const summaryStage = document.getElementById("summary-stage");
    const count = document.getElementById("question-count");
    const title = document.getElementById("question-title");
    const options = document.getElementById("answer-options");
    const previous = document.getElementById("question-back");
    const next = document.getElementById("question-next");

    if (!name || !progress || !questionStage || !summaryStage || !count || !title || !options || !previous || !next) return;

    const keys = ["landing", "systems", "automation", "ecommerce"];
    const savedAnswers = {};
    keys.forEach((key) => { savedAnswers[key] = []; });

    let activeKey = "";
    let questionIndex = 0;
    let homeScrollY = 0;
    let isOpen = false;

    function getService(key) {
      return serviceData[key] && Array.isArray(serviceData[key].questions) ? serviceData[key] : null;
    }

    function scrollBriefingTop() {
      try { screen.scrollTop = 0; } catch (_) {}
      window.scrollTo(0, 0);
    }

    function renderProgress(total) {
      progress.replaceChildren();
      for (let i = 0; i < total; i += 1) {
        const step = document.createElement("span");
        step.className = "progress-step";
        if (i < questionIndex) step.classList.add("is-complete");
        if (i === questionIndex) step.classList.add("is-current");
        step.setAttribute("aria-label", `Etapa ${i + 1}${i === questionIndex ? ", atual" : ""}`);
        const marker = document.createElement("i");
        marker.textContent = String(i + 1).padStart(2, "0");
        step.append(marker);
        progress.append(step);
      }
    }

    function renderQuestion() {
      const service = getService(activeKey);
      if (!service) return;

      const question = service.questions[questionIndex];
      if (!question) return;

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

        option.addEventListener("click", function () {
          savedAnswers[activeKey][questionIndex] = answer;
          options.querySelectorAll(".answer-option").forEach((button) => {
            button.setAttribute("aria-pressed", String(button === option));
          });
          next.disabled = false;
        });

        options.append(option);
      });

      renderProgress(service.questions.length);
      previous.hidden = questionIndex === 0;
      next.disabled = !savedAnswers[activeKey][questionIndex];
      next.innerHTML = questionIndex === service.questions.length - 1
        ? "Ver resumo <span>→</span>"
        : "Continuar <span>→</span>";

      questionStage.hidden = false;
      summaryStage.hidden = true;
    }

    function openService(key, updateHistory) {
      if (!getService(key)) return;

      if (!isOpen) homeScrollY = window.scrollY;
      isOpen = true;
      activeKey = key;
      questionIndex = 0;

      screen.hidden = false;
      document.body.classList.add("experience-open");
      renderQuestion();
      scrollBriefingTop();

      if (updateHistory) {
        history.pushState({ serviceBriefing: true, serviceKey: key }, "", `#briefing-${key}`);
      }
    }

    function showSummary() {
      const service = getService(activeKey);
      if (!service) return;

      const answers = savedAnswers[activeKey];
      questionStage.hidden = true;
      summaryStage.hidden = false;
      summaryStage.replaceChildren();

      const success = document.createElement("div");
      success.className = "summary-success";
      success.innerHTML = '<span class="summary-check" aria-hidden="true">✓</span><div><p>PROJETO ENTENDIDO</p><h2>Seu projeto está quase pronto.</h2></div>';

      const description = document.createElement("p");
      description.className = "summary-description";
      let text = `Você está pensando em ${service.intro}`;
      if (answers[0]) text += `: ${answers[0]}`;
      if (activeKey === "landing" && answers[1]) text += `, com o objetivo de ${answers[1].toLowerCase()}`;
      description.textContent = `${text}. O restante a gente alinha juntos.`;

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

      const details = service.questions.map((question, index) =>
        `• ${question.title}: ${answers[index] || "Ainda não informado"}`
      ).join("\n");

      const actions = document.createElement("div");
      actions.className = "summary-actions";

      const send = document.createElement("a");
      send.className = "button button-primary";
      send.target = "_blank";
      send.rel = "noopener noreferrer";
      send.innerHTML = "Conversar com Adriel no WhatsApp <span>↗</span>";
      send.href = `${whatsapp}?text=${encodeURIComponent(`${intros[activeKey] || FALLBACK_INTROS[activeKey]}\n\nMeu briefing:\n${details}`)}`;

      const edit = document.createElement("button");
      edit.type = "button";
      edit.className = "button button-ghost summary-edit";
      edit.textContent = "← Revisar respostas";
      edit.addEventListener("click", function () {
        questionIndex = 0;
        renderQuestion();
        scrollBriefingTop();
      });

      actions.append(send, edit);
      const note = document.createElement("p");
      note.className = "summary-note";
      note.textContent = "A mensagem abrirá pronta para você revisar e enviar. Nada é enviado sem sua ação.";

      summaryStage.append(success, description, label, list, actions, note);
      scrollBriefingTop();
    }

    function closeService(fromPopState) {
      if (!isOpen) return;
      isOpen = false;
      document.body.classList.remove("experience-open");
      screen.hidden = true;

      if (!fromPopState && location.hash.startsWith("#briefing-")) {
        history.replaceState(null, "", "#top");
      }

      window.setTimeout(() => {
        window.scrollTo({ top: homeScrollY, behavior: "smooth" });
      }, 0);
    }

    // Delegação: funciona mesmo que algum outro script altere os cards depois do carregamento.
    document.addEventListener("click", function (event) {
      const trigger = event.target.closest?.("[data-service]");
      if (!trigger) return;

      const key = trigger.dataset.service;
      if (!getService(key)) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      openService(key, true);
    }, true);

    document.querySelectorAll("[data-return-home]").forEach((control) => {
      control.addEventListener("click", function (event) {
        event.preventDefault();
        closeService(false);
      });
    });

    previous.addEventListener("click", function () {
      if (questionIndex > 0) {
        questionIndex -= 1;
        renderQuestion();
        scrollBriefingTop();
      }
    });

    next.addEventListener("click", function () {
      const service = getService(activeKey);
      if (!service || !savedAnswers[activeKey][questionIndex]) return;

      if (questionIndex < service.questions.length - 1) {
        questionIndex += 1;
        renderQuestion();
        scrollBriefingTop();
      } else {
        showSummary();
      }
    });

    window.addEventListener("popstate", function (event) {
      if (event.state?.serviceBriefing && getService(event.state.serviceKey)) {
        openService(event.state.serviceKey, false);
        return;
      }
      closeService(true);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isOpen) closeService(false);
    });

    const hashMatch = location.hash.match(/^#briefing-(landing|systems|automation|ecommerce)$/);
    if (hashMatch) openService(hashMatch[1], false);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBriefingExperience, { once: true });
  } else {
    initBriefingExperience();
  }
})();
