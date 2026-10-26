/* ================================================================
   Nicolás Bravo — Encargo 3 / Diseño desde el Código 2026
   Interacciones: navegación móvil, wireframes y progreso lector.
   Sin librerías ni dependencias de JavaScript externas.
   ================================================================ */

const mobileNavigationButton = document.querySelector('.nav-trigger');
const mobileNavigation = document.getElementById('main-nav');

function closeNavigation() {
  if (!mobileNavigationButton || !mobileNavigation) return;
  mobileNavigationButton.setAttribute('aria-expanded', 'false');
  mobileNavigationButton.setAttribute('aria-label', 'Abrir navegación');
  mobileNavigation.classList.remove('is-open');
}

mobileNavigationButton?.addEventListener('click', () => {
  const isOpen = mobileNavigationButton.getAttribute('aria-expanded') === 'true';
  mobileNavigationButton.setAttribute('aria-expanded', String(!isOpen));
  mobileNavigationButton.setAttribute('aria-label', isOpen ? 'Abrir navegación' : 'Cerrar navegación');
  mobileNavigation?.classList.toggle('is-open', !isOpen);
});

mobileNavigation?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeNavigation);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeNavigation();
});

// Cada esquema tiene su propio conmutador independiente.
const descriptions = {
  eglo: {
    desktop: 'Escritorio: menú horizontal, bloque promocional y grilla de productos.',
    mobile: 'Móvil: menú comprimido, categorías desplegables y dos tarjetas por fila.'
  },
  dialux: {
    desktop: 'Escritorio: cabecera, presentación, módulos y secuencia visual.',
    mobile: 'Móvil: contenidos apilados, visual de ancho completo y secuencia compacta.'
  }
};

document.querySelectorAll('[data-view-switch]').forEach(button => {
  button.addEventListener('click', () => {
    const site = button.dataset.viewSwitch;
    const targetView = button.dataset.view;
    const wireframe = document.querySelector(`[data-wireframe="${site}"]`);
    const caption = document.getElementById(`${site}-view-caption`);
    if (!wireframe || !descriptions[site]) return;
    wireframe.classList.toggle('is-mobile', targetView === 'mobile');
    document.querySelectorAll(`[data-view-switch="${site}"]`).forEach(otherButton => {
      const selected = otherButton === button;
      otherButton.classList.toggle('is-active', selected);
      otherButton.setAttribute('aria-pressed', String(selected));
    });
    if (caption) caption.textContent = descriptions[site][targetView];
  });
});

// Barra de lectura: usa el scroll nativo; no secuestra el movimiento del usuario.
const readingProgress = document.getElementById('reading-progress');
let scrollScheduled = false;
function paintProgress() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = maxScroll <= 0 ? 0 : Math.min(100, Math.max(0, (window.scrollY / maxScroll) * 100));
  if (readingProgress) readingProgress.style.width = `${percentage}%`;
  scrollScheduled = false;
}
window.addEventListener('scroll', () => {
  if (scrollScheduled) return;
  scrollScheduled = true;
  window.requestAnimationFrame(paintProgress);
}, { passive: true });
window.addEventListener('resize', paintProgress);
paintProgress();

// El contenido permanece visible en todo momento. La ambientación sí se anima.

// Indicador de la sección visible en escritorio y móvil.
const sectionLinks = Array.from(document.querySelectorAll('.nav a[href^="#"]'));
if ('IntersectionObserver' in window) {
  const sections = sectionLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach(link => {
        const selected = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('is-active', selected);
        if (selected) link.setAttribute('aria-current','location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-22% 0px -58% 0px' });
  sections.forEach(section => sectionObserver.observe(section));
}