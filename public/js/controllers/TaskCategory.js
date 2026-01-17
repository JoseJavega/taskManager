import { AsideController } from './Aside.js';
import { TaskCategoryView } from '../views/TaskCategory.js';
import { TaskCategoryService } from '../services/TaskCategory.js';
import { sortCollection } from '../utils/sortCollection.js';

export class TaskCategoryController {
  constructor(apiURL) {
    this.categoryService = new TaskCategoryService(apiURL);
    this.categorieAside = new AsideController;
    this.categoryManagement = document.getElementById("btn-category-control");
    // estado de la vista para crear, editar o eliminar
    this.state = {
      mode: 'list',
      editingId: 'b63eec9f-be3c-47d9-b1db-708735547d9e',
      selectedIds: []
    };

    this.addEventListener();

  };

  async init(){
    const categories = await this.categoryService.getAll();
    const orderCategories = categories ? sortCollection(categories, 'name', 'asc') : null;
    TaskCategoryView.render( this.categorieAside.asidePanel, this.state, orderCategories );
  };

  async addCategory(){
    const categoryName = document.getElementById('add-category-input').value;
    if (categoryName){
      const result = await this.categoryService.save(categoryName);
      this.init();
    }
  };

  handleClickEvent(e){
    if (this.categorieAside.asidePanel.dataset.context!== 'categories' ) return;
    e.preventDefault();
    console.log(e.target);
    if ( this.state.mode==='list' & e.target.id==='add-category-btn') this.addCategory();
  };

  addEventListener(){
    this.categoryManagement.addEventListener("click", ()=>{
      this.categorieAside.open('Categorías', 'categories');
      this.init();
    });

    this.categorieAside.asidePanel.addEventListener('click', this.handleClickEvent.bind(this));
  }
}