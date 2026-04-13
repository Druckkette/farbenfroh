// =============================================
// FARBENFROH – script.js
// Fixes: Scroll-Reveal, Mobile-Menu, Split-Cards,
//        Review-Rotator, Premium-Card, Header-Scroll
// =============================================

const header   = document.querySelector('.site-header');
const navWrap  = document.querySelector('.nav-wrap');
const toggle   = document.querySelector('.menu-toggle');
const newsletter = document.querySelector('.newsletter');

// ── Mobile Menu ──────────────────────────────
if (toggle && navWrap) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    navWrap.classList.toggle('open');
  });

  // Schließt Menü beim Klick auf einen Nav-Link
  navWrap.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      navWrap.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ── Header scroll state ───────────────────────
window.addEventListener(
  'scroll',
  () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 16);
  },
  { passive: true }
);

// ── Scroll-Reveal (NEU) ──────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // nur einmal auslösen
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// ── Split-Cards (Parallax-Scroll-Effekt) ─────
const splitCards = document.querySelectorAll('.feature-grid .card');

if (splitCards.length) {
  splitCards.forEach((card, index) => {
    card.style.setProperty('--split-dir', index % 2 === 0 ? '-1' : '1');
  });

  const updateSplitCards = () => {
    const viewportHeight = window.innerHeight;
    splitCards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const progress = Math.max(0, Math.min(1, (viewportHeight - center) / viewportHeight));
      const spread = Math.round(progress * 68);
      card.style.setProperty('--split-x', `${spread}px`);
    });
  };

  updateSplitCards();
  window.addEventListener('scroll', updateSplitCards, { passive: true });
  window.addEventListener('resize', updateSplitCards);
}

// ── Review Rotator ────────────────────────────
const reviews = document.querySelectorAll('.review-rotator .review-card');

if (reviews.length > 1) {
  let reviewIndex = 0;
  setInterval(() => {
    reviews[reviewIndex].classList.remove('active');
    reviewIndex = (reviewIndex + 1) % reviews.length;
    reviews[reviewIndex].classList.add('active');
  }, 3600);
}

// ── Premium Card (FIX: nur ein Trigger, kein doppelter Reveal) ──
const offerMosaic    = document.querySelector('.offer-mosaic');
const premiumCard    = document.querySelector('#premium-session-card');
const premiumTrigger = premiumCard?.querySelector('.offer-trigger');
const premiumReveal  = document.querySelector('#premium-session-reveal');

if (offerMosaic && premiumCard && premiumTrigger && premiumReveal) {
  const togglePremium = (forceOpen) => {
    const willOpen =
      typeof forceOpen === 'boolean'
        ? forceOpen
        : !premiumCard.classList.contains('is-open');

    premiumCard.classList.toggle('is-open', willOpen);
    offerMosaic.classList.toggle('is-premium-open', willOpen);
    premiumTrigger.setAttribute('aria-expanded', String(willOpen));
    premiumReveal.setAttribute('aria-hidden', String(!willOpen));
  };

  premiumTrigger.addEventListener('click', (event) => {
    event.stopPropagation();
    togglePremium();
  });

  premiumCard.addEventListener('click', () => {
    togglePremium(true);
  });

  document.addEventListener('click', (event) => {
    if (!offerMosaic.contains(event.target)) {
      togglePremium(false);
    }
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') togglePremium(false);
  });
}

// ── Newsletter Form ───────────────────────────
if (newsletter) {
  newsletter.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = newsletter.querySelector('button');
    const input  = newsletter.querySelector('input[type="email"]');
    if (button) {
      button.textContent = 'Danke! ✨';
      button.disabled = true;
    }
    if (input) {
      input.value = '';
      input.placeholder = 'Du bist eingetragen ✨';
    }
  });
}
