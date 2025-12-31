export class AsideController {

  constructor(header){
    this.asidePanel = document.querySelector("#aside-panel");

    this.closeIcon = this.asidePanel.querySelector("#aside-icon-close");
    this.asideHeader= this.asidePanel.querySelector("#aside-header");

    this.asideHeader.innerHTML=header;

    this.closeIcon.addEventListener("click",()=>{
      this.asidePanel.classList.remove("aside-visible");
    })
  }
}