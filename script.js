const header = document.querySelector('.site-header');
const navWrap = document.querySelector('.nav-wrap');
const toggle = document.querySelector('.menu-toggle');
const newsletter = document.querySelector('.newsletter');

if (toggle && navWrap) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    navWrap.classList.toggle('open');
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
