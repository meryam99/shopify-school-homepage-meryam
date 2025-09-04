export function initFooterAccordion() {
  const BREAKPOINT = 768;
  const cols = Array.from(document.querySelectorAll('.footer__col'));
  if (!cols.length) return;

  function applyMode() {
    const mobile = window.innerWidth < BREAKPOINT;
    cols.forEach(d => {
      if (mobile) {
        d.removeAttribute('open');                // згорнути на мобайл
        d.querySelector('.footer__title').style.pointerEvents = ''; // клікабельні
      } else {
        d.setAttribute('open', '');               // розгорнути на desktop
        d.querySelector('.footer__title').style.pointerEvents = 'none'; // не клікабельні
      }
    });
  }

  function onToggle(e) {
    if (window.innerWidth >= BREAKPOINT) return;
    const current = e.currentTarget;
    if (current.open) {
      cols.forEach(d => { if (d !== current) d.open = false; });
    }
  }

  cols.forEach(d => d.addEventListener('toggle', onToggle));

  applyMode();
  let t;
  window.addEventListener('resize', () => {
    clearTimeout(t);
    t = setTimeout(applyMode, 120); // debounce
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initFooterAccordion();
});