import { configureLinks } from "./ui/links.js";
import { setupNavigation } from "./ui/navigation.js";
import { setupReveal, setupDynamicText, setupProgressLines, setupCardLighting, setupCursor, setupParallax, setupLoader } from "./ui/interactions.js";
import { setupServiceExperience } from "./features/briefing.js";

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
