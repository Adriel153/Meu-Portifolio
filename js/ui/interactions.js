import { reduceMotion } from "../config.js";

export function setupReveal() {
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

export function setupDynamicText() {
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

export function setupProgressLines() {
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
    if (flow && flowFill && flowSteps.length) {
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

export function setupCardLighting() {
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

export function setupCursor() {
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

export function setupParallax() {
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

export function setupLoader() {
  const loader = document.querySelector(".loader");
  if (!loader) return;
  const hide = () => window.setTimeout(() => loader.classList.add("is-hidden"), 260);
  if (document.readyState === "complete") hide();
  else window.addEventListener("load", hide, { once: true });
  window.setTimeout(() => loader.classList.add("is-hidden"), 1300);
}
