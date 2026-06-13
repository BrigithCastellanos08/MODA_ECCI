/* ═══════════════════════════════════════════
   MODA ECCI — JavaScript
   - Language toggle EN ↔ ES
   - Scroll animations
   - Carousel thumbnail click
   - Modal trigger
   ═══════════════════════════════════════════ */

let currentLang = 'en';

function toggleLang() {
  currentLang = currentLang === 'en' ? 'es' : 'en';
  applyLang(currentLang);
}

function applyLang(lang) {
  // Update all elements with data-en / data-es
  const elements = document.querySelectorAll('[data-en]');
  elements.forEach(el => {
    const val = el.getAttribute('data-' + lang);
    if (val !== null) {
      // Preserve children if element has them beyond text
      if (el.children.length === 0) {
        el.textContent = val;
      } else {
        el.innerHTML = val;
      }
    }
  });

  // Update html lang attribute
  document.documentElement.setAttribute('lang', lang);

  // Update toggle button label
  const label = document.getElementById('langLabel');
  if (label) {
    label.textContent = lang === 'en' ? '🌐 Español' : '🌐 English';
  }

  // Update page title
  document.title = lang === 'en'
    ? 'MODA ECCI — Sara Viloria Conference'
    : 'MODA ECCI — Conferencia de Sara Viloria';
}

// ── Carousel thumbnail click ──
function goToSlide(index) {
  const carousel = document.getElementById('mainCarousel');
  if (carousel) {
    const bsCarousel = bootstrap.Carousel.getOrCreateInstance(carousel);
    bsCarousel.to(index);
  }
}

// ── Modal trigger ──
function showQuoteModal() {
  const modal = new bootstrap.Modal(document.getElementById('quoteModal'));
  modal.show();
}

// ── Navbar scroll shrink ──
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (window.scrollY > 60) {
    nav.style.padding = '0.4rem 0';
    nav.style.background = 'rgba(10,10,15,0.98)';
  } else {
    nav.style.padding = '0.75rem 0';
    nav.style.background = 'rgba(10,10,15,0.92)';
  }
});

// ── Scroll fade-up animation ──
function initScrollAnimations() {
  const targets = document.querySelectorAll(
    '.concept-card, .sustain-card, .accord-custom, .bio-image-wrapper, .video-wrapper'
  );
  targets.forEach(el => el.classList.add('fade-up'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => observer.observe(el));
}

// ── Active nav link on scroll ──
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--violet-light)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

// ── DOMContentLoaded ──
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initActiveNav();
  applyLang('en');
});
