import { showAlert } from './alert.js';

const CONTACT_US_ENDPOINT = '/api/v1/contact-us';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contact-form');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());
    const jsonData = JSON.stringify(formObject);
    try {
      const response = await fetch(CONTACT_US_ENDPOINT, {
        method: 'POST',
        body: jsonData,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      let type = 'warning';
      let titleNotification = 'Alerta ';
      let messageNotification = 'Ha ocurrido un inconveniente. Inténtelo más tarde';
      if (response.ok) {
        const responseJson = await response.json();
        const { ok, message } = responseJson;
        if (ok) {
          type = 'success';
          titleNotification = 'Bien! ';
          messageNotification = message;
          form.reset;
        } else {
          console.error(message);
        }
      } else {
        console.error(`Error al procesar `, response.text);
      }

      form.reset();

      showAlert({ title: titleNotification, message: messageNotification }, 'notification', type);
    } catch (err) {
      console.error(`Ha ocurrido un error`, err);
      title = 'Ha ocurrido un error! ';
      message = 'Por favor comuníquese con servicio técnico';
      showAlert({ title, message }, 'notification', 'danger');
    }
  });
});
