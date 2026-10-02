import { CONFIG } from "../config.js";

export function configureLinks() {
  document.querySelectorAll("[data-link]").forEach((link) => {
    const key = link.dataset.link;
    const base = CONFIG[key];
    if (!base) return;
    const message = link.dataset.message;
    link.href = key === "whatsapp" && message
      ? `${base}${base.includes("?") ? "&" : "?"}text=${encodeURIComponent(message)}`
      : base;
  });
}
