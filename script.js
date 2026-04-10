const header = document.querySelector('.site-header');
const navWrap = document.querySelector('.nav-wrap');
const toggle = document.querySelector('.menu-toggle');
const newsletter = document.querySelector('.newsletter');
const splitCards = document.querySelectorAll('.feature-grid .card');
const reviews = document.querySelectorAll('.review-rotator .review-card');
const offerMosaic = document.querySelector('.offer-mosaic');
const offerCards = offerMosaic ? Array.from(offerMosaic.querySelectorAll('[data-offer-card]')) : [];

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

if (offerMosaic && offerCards.length) {
  const setActiveCard = (nextCard) => {
    const isSame = nextCard?.classList.contains('is-active');
    offerMosaic.classList.toggle('focus-mode', Boolean(nextCard) && !isSame);

    offerCards.forEach((card, index) => {
      const reveal = card.querySelector('.offer-reveal');
      const trigger = card.querySelector('.offer-trigger');
      const isActive = Boolean(nextCard) && !isSame && card === nextCard;

      card.classList.toggle('is-active', isActive);
      card.classList.remove('shift-left', 'shift-right');

      if (trigger) trigger.setAttribute('aria-expanded', String(isActive));
      if (reveal) reveal.setAttribute('aria-hidden', String(!isActive));

      if (!nextCard || isSame || isActive) return;

      const activeIndex = offerCards.indexOf(nextCard);
      card.classList.add(index < activeIndex ? 'shift-left' : 'shift-right');
    });
  };

  offerCards.forEach((card) => {
    const trigger = card.querySelector('.offer-trigger');

    card.addEventListener('click', () => {
      setActiveCard(card);
    });

    trigger?.addEventListener('click', (event) => {
      event.stopPropagation();
      setActiveCard(card);
    });
  });

  document.addEventListener('click', (event) => {
    if (!offerMosaic.contains(event.target)) {
      setActiveCard(null);
    }
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setActiveCard(null);
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
