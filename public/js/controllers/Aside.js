export class AsideController {

  constructor(){
    this.asidePanel = document.querySelector("#aside-panel");
    this.closeIcon = this.asidePanel.querySelector("#aside-icon-close");
    this.asideHeader = this.asidePanel.querySelector("#aside-header");
    this.handleClose = this.close.bind(this);

    this.closeIcon.addEventListener("click", this.handleClose);
  };

  open(title, context){
    this.asideHeader.textContent = title;
    this.asidePanel.dataset.context = context;
    this.asidePanel.classList.add('aside-visible');
  }

  close(){
    this.asidePanel.classList.remove("aside-visible");
    // Limpia contenido
    this.asidePanel.querySelector('#asideContent').innerHTML='';
    // Limpia metadata
    this.asidePanel.dataset.context='';
  }
};