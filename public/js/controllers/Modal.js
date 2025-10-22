export class Modal {

  static init(type) {
    const modal = document.getElementById('modal-form');
    const modalFormBody = document.querySelector('#modal-form-body');
    const submitBtn = document.getElementById('modal-form-submit');
    const closeIcon = document.getElementById('modal-form-close');

    // cancelBtn.onclick = () => modal.close();
    closeIcon.onclick = () => modal.close();

    submitBtn.onclick = () => {
      const form = modalFormBody.querySelector('form');
      if (!form) {
        console.error('No se encontró ningún formulario dentro del modal');
        modal.close();
      }
      //lee los campos del formulario
      const formData = Object.fromEntries(new FormData(form));
      //custon event para general el evento
      const event = new CustomEvent('modal:confirm', {
        detail: { type, data: formData }
      });
      //lanza el evento para escucharlo desde el controller
      window.dispatchEvent(event);
      modal.close();
    };

  }

  static open(type, content) {
    const modal = document.getElementById('modal-form');
    const modalFormBody = document.querySelector('#modal-form-body');

    modalFormBody.innerHTML = content;
    // Llamamos a init para configurar listeners si no lo hemos hecho ya
    this.init(type);

    modal.showModal();
  }

}