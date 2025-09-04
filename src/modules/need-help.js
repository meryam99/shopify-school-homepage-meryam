export function initHelpForm() {
  const form = document.getElementById('help-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    alert('Thank you!');
    form.reset();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initHelpForm();
});