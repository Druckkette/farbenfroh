const header = document.querySelector('.site-header');
const navWrap = document.querySelector('.nav-wrap');
const toggle = document.querySelector('.menu-toggle');
const newsletter = document.querySelector('.newsletter');
const splitCards = document.querySelectorAll('.feature-grid .card');
const reviews = document.querySelectorAll('.review-rotator .review-card');
const offerMosaic = document.querySelector('.offer-mosaic');
const premiumCard = document.querySelector('#premium-session-card');
const premiumTrigger = premiumCard?.querySelector('.offer-trigger');
const premiumReveal = premiumCard?.querySelector('.offer-reveal');

if (toggle && navWrap) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    navWrap.classList.toggle('open');
  });
}

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

if (reviews.length > 1) {
  let reviewIndex = 0;

  setInterval(() => {
    reviews[reviewIndex].classList.remove('active');
    reviewIndex = (reviewIndex + 1) % reviews.length;
    reviews[reviewIndex].classList.add('active');
  }, 3600);
}

if (offerMosaic && premiumCard && premiumTrigger && premiumReveal) {
  const togglePremium = (forceOpen) => {
    const willOpen = typeof forceOpen === 'boolean' ? forceOpen : !premiumCard.classList.contains('is-open');

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

window.addEventListener(
  'scroll',
  () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 16);
  },
  { passive: true }
);

if (newsletter) {
  newsletter.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = newsletter.querySelector('button');
    const input = newsletter.querySelector('input[type="email"]');

    if (button) {
      button.textContent = 'Danke!';
      button.disabled = true;
    }

    if (input) {
      input.value = '';
      input.placeholder = 'Du bist eingetragen ✨';
    }
  });
}
