import { AsideController } from "./Aside.js";

export class TaskCategoryController {
  constructor() {
    this.categorieAside=null;
    this.categoryManagement = document.getElementById("btn-category-control");

    this.categoryManagement.addEventListener("click", ()=>{
      this.categorieAside = new AsideController('Categorías');
      this.categorieAside.asidePanel.classList.add("aside-visible");
    })
  }

  init(){

  }
}