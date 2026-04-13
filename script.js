// =============================================
// FARBENFROH v4 – script.js
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
});

// ── Header scroll ─────────────────────────
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Mobile Burger Menu ─────────────────────
const burger = document.querySelector('.burger');
const nav    = document.querySelector('.nav');

if (burger && nav) {
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!header?.contains(e.target)) {
      nav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
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

// ── Newsletter ─────────────────────────────
document.querySelector('.newsletter-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const btn   = e.target.querySelector('button');
  const input = e.target.querySelector('input');
  if (btn)   { btn.textContent = '✓'; btn.disabled = true; }
  if (input) { input.value = ''; input.placeholder = 'Eingetragen ✨'; }
});
