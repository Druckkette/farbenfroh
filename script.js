// =============================================
// FARBENFROH v2 – script.js
// =============================================

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

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
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

// ── Newsletter ─────────────────────────────
document.querySelector('.newsletter-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const btn   = e.target.querySelector('button');
  const input = e.target.querySelector('input');
  if (btn)   { btn.textContent = '✓'; btn.disabled = true; }
  if (input) { input.value = ''; input.placeholder = 'Eingetragen ✨'; }
});
