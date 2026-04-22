// =============================================
// FACETTENREICH v4 – script.js
// =============================================

// ── Instant anchor scroll (kein smooth) ────
// Überschreibt browser-default scroll-behavior für alle internen Links
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const id = link.getAttribute('href').slice(1);
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: 'instant', block: 'start' });
  // Mobilmenü schließen falls offen
  nav?.classList.remove('open');
  burger?.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
});

// ── Header scroll ─────────────────────────
const header = document.querySelector('.header');
const showHeaderAfter = 90;

const syncHeaderState = () => {
  if (!header) return;
  const passedThreshold = window.scrollY > showHeaderAfter;
  header.classList.toggle('is-visible', passedThreshold);
  header.classList.toggle('scrolled', passedThreshold);
};

window.addEventListener('scroll', syncHeaderState, { passive: true });
syncHeaderState();

// ── Mobile Burger Menu ─────────────────────
const burger = document.querySelector('.burger');
const nav    = document.querySelector('.nav');

if (burger && nav) {
  const closeMenu = () => {
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };

  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!header?.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

// ── Scroll Reveal ──────────────────────────
const observer = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }),
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Flip Cards ─────────────────────────────
document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', (e) => {
    // Klick auf Button (Jetzt buchen / Anfragen) – nicht flippen, Link folgen
    if (e.target.closest('.btn')) return;
    card.classList.toggle('is-flipped');
  });

  // Keyboard: Enter / Space zum Flippen
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.classList.toggle('is-flipped');
    }
    if (e.key === 'Escape') {
      card.classList.remove('is-flipped');
    }
  });
});

// ── Kontakt-Modal ──────────────────────────
const contactModal = document.getElementById('contact-modal');
const openContactModalBtn = document.getElementById('open-contact-modal');
const closeModalEls = document.querySelectorAll('[data-close-modal]');
const contactForm = document.getElementById('contact-form');
const contactSuccess = document.getElementById('contact-success');

const openContactModal = () => {
  if (!contactModal) return;
  contactSuccess?.setAttribute('hidden', '');
  contactModal.classList.add('is-open');
  contactModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

const closeContactModal = () => {
  if (!contactModal) return;
  contactModal.classList.remove('is-open');
  contactModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

openContactModalBtn?.addEventListener('click', openContactModal);
closeModalEls.forEach(el => el.addEventListener('click', closeContactModal));

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && contactModal?.classList.contains('is-open')) {
    closeContactModal();
  }
});

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }
  contactSuccess?.removeAttribute('hidden');
  contactForm.reset();
});

// ── Newsletter ─────────────────────────────
document.querySelector('.newsletter-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const btn   = e.target.querySelector('button');
  const input = e.target.querySelector('input');
  if (btn)   { btn.textContent = '✓'; btn.disabled = true; }
  if (input) { input.value = ''; input.placeholder = 'Eingetragen ✨'; }
});
