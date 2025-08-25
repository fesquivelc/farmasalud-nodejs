export const showAlert = (content, elementId = 'alert', type = 'warning') => {
  const { title, message } = content;
  const alert = document.getElementById(elementId);
  alert.innerHTML = '';
  alert.className = `alert alert-${type} alert-dismissible fade show`;
  alert.setAttribute('role', 'alert');

  // contenido fuerte
  const titleElement = document.createElement('strong');
  titleElement.textContent = `${title} `;
  alert.appendChild(titleElement);

  // mensaje
  alert.append(document.createTextNode(message));

  // botón cerrar
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'btn-close';
  button.setAttribute('data-bs-dismiss', 'alert');
  button.setAttribute('aria-label', 'Close');
  alert.appendChild(button);

  return alert;
};
