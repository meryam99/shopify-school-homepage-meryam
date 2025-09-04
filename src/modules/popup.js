export function initNewsletterPopup() {
  const root   = document.getElementById('newsletter-popup');
  if (!root) return;

  const dialog = root.querySelector('.popup__dialog');
  const form   = root.querySelector('#popup-form');
  const close  = root.querySelector('.popup__close');

  const open = () => {
    root.classList.add('is-open');
    root.setAttribute('aria-hidden', 'false');
    dialog.focus();
  };
  const hide = () => {
    root.classList.remove('is-open');
    root.setAttribute('aria-hidden', 'true');
  };


  window.setTimeout(open, 1000);

  close.addEventListener('click', hide);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    alert('Thank you!');
    form.reset();
    hide();
  });

  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && root.classList.contains('is-open')) hide();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNewsletterPopup();
});