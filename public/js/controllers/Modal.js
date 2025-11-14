export class Modal {

  static init(type, action) {
    const modal = document.getElementById('modal-form');
    const modalFormBody = document.getElementById('modal-form-body');
    const submitBtn = document.getElementById('modal-form-submit');
    const closeIcon = document.getElementById('modal-form-close');

    closeIcon.onclick = () =>{
      modalFormBody.innerHTML='';
      modal.close();
    }

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
        detail: { type, action, data: formData }
      });
      //lanza el evento para escucharlo desde el controller
      window.dispatchEvent(event);

      modalFormBody.innerHTML='';
      modal.close();
    };

  }

  static open(type, action, content) {
    const modal = document.getElementById('modal-form');
    const modalFormBody = document.getElementById('modal-form-body');

    modalFormBody.innerHTML = content;
    // Llamamos a init para configurar listeners si no lo hemos hecho ya
    this.init(type, action);

    modal.showModal();
  }

}

export class ModalConfirmation{

  static init(type, action){
    const modal = document.getElementById('modal-confirmation');
    const modalFormBody = modal.querySelector('#modal-confirmation-body');
    const cancelBtn = modal.querySelector('#btn-modal-cancel');
    const confirmBtn = modal.querySelector('#btn-modal-confirm');
    const dataId = modal.querySelector('[data-id]')?.dataset.id;

    cancelBtn.onclick = () =>{
      modalFormBody.innerHTML='';
      modal.close();
    }

    confirmBtn.onclick =() => {
      const event = new CustomEvent('modal:confirm', {
        detail: { type, action, data: {id:dataId} }
      });
      //lanza el evento para escucharlo desde el controller
      window.dispatchEvent(event);

      modalFormBody.innerHTML='';
      modal.close();
    };
  };

  static open(type, action, content) {
    const modal = document.getElementById('modal-confirmation');
    const modalFormBody = modal.querySelector('#modal-confirmation-body');

    modalFormBody.innerHTML = content;
    // Llamamos a init para configurar listeners si no lo hemos hecho ya
    this.init(type, action);

    modal.showModal();
  }
}