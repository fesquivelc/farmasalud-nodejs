// Contact Form Dynamic (Vanilla JS - ES6+)
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contact-form');
  const formMessages = document.querySelector('.form-messege');
  const alertBox = document.querySelector('#alert');

  form.addEventListener('submit', async e => {
    e.preventDefault();

    // Usar FormData para serializar los datos
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData
      });

      const text = await response.text();

      // Resetear clases
      formMessages.classList.remove('error', 'success');

      if (response.ok) {
        formMessages.classList.add('success');
        formMessages.textContent = text;
        if (alertBox) alertBox.innerHTML = text;

        // Limpiar formulario
        form.querySelectorAll('input, textarea').forEach(el => (el.value = ''));
      } else {
        formMessages.classList.add('error');
        formMessages.textContent =
          text || 'Oops! An error occurred and your message could not be sent.';
      }
    } catch (err) {
      formMessages.classList.remove('success');
      formMessages.classList.add('error');
      formMessages.textContent = 'Oops! Something went wrong. Please try again.';
      console.error(err);
    }
  });
});
