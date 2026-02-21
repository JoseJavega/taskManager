import { AsideController } from "./Aside.js";
import { TaskCategoryView } from "../views/TaskCategory.js";
import { TaskCategoryService } from "../services/TaskCategory.js";
import { sortCollection } from "../utils/sortCollection.js";

export class TaskCategoryController {
  constructor(apiURL) {
    this.categoryService = new TaskCategoryService(apiURL);
    this.categorieAside = new AsideController();
    this.categoryManagement = document.getElementById("btn-category-control");
    // estado de la vista para crear, editar o eliminar
    this.state = {
      mode: "",
      editingId: "",
      selectedIds: new Set(),
    };

    this.addEventListener();
  }

  async init() {
    const categories = await this.categoryService.getAll();
    const orderCategories = categories ? sortCollection(categories, "name", "asc") : null;
    TaskCategoryView.render( this.categorieAside.asidePanel, this.state, orderCategories );
  }

  async addCategory() {
    const categoryName = document.getElementById("add-category-input").value;
    if (!categoryName) return;

    try {
      const newCategory = await this.categoryService.save(categoryName);
      //lanzamos un customEvent para "avisar" del cambio a la vista de tareas
      const event = new CustomEvent('categoryUpdated', { detail: {action:'create', data: newCategory } });
      window.dispatchEvent(event);
      this.init();
    } catch (error) {
      // mostramos error
      console.error("Error al añadir categoría:", error.message);
      alert(`No se pudo guardar: ${error.message}`);
    };   
  }

  async editCategory(data) {
    const editedCategory = await this.categoryService.update(data);
    const event = new CustomEvent('categoryUpdated', { detail: {action:'update', data: editedCategory } });
    window.dispatchEvent(event);
  }

  cancelEditMode() {
    this.state.mode = "list";
    this.state.editingId = "";
    this.init();
  }

  handleClickEvent(e) {
    if (e.target.type === "submit") { e.preventDefault(); }


    if (this.categorieAside.asidePanel.dataset.context !== "categories") return;
    //add category
    if ((this.state.mode === "list") && (e.target.id === "add-category-btn")) {
      this.addCategory();
    }
    // DELETE
    // activate delete mode
    if ( (e.target.id === "del-category-button") && (e.target.dataset.action === "activateDelete") ) {
      this.state.mode = "delete";
      this.init();
    }
    // cancel delete
    if (e.target.dataset.action === "cancelDelete") {
      this.state.mode = "list";
      this.init();
    }
    // Category checked-unchecked
    if (e.target.type === "checkbox") {
      if (e.target.checked) {
        this.state.selectedIds.add(e.target.dataset.id);
      } else {
        this.state.selectedIds.delete(e.target.dataset.id);
      }
    }

    // delete selected categories
    if ( (e.target.id === "del-category-button") && (e.target.dataset.action === "confirmDelete") ) {
      const deletedCategories = this.categoryService.delete(this.state.selectedIds);
      this.state.mode="list";
      this.init();
      // creamos un evento y lo lanzamos para actualizar la vista de tareas
      const event = new CustomEvent('categoryUpdated', { detail: {action:'delete', data: deletedCategories } });
      window.dispatchEvent(event);
    }

    // EDIT
    // activate edit mode
    if ( (this.state.mode !== "delete") && (e.target.tagName.toLowerCase() === "li") ) {
      this.state.mode = "edit";
      this.state.editingId = e.target.dataset.id;
      this.init();
    }
    // cancel edit
    if (e.target.closest("[data-action]")?.dataset.action === "cancelEdit") {
      this.cancelEditMode();
    }
    // save edit
    if (e.target.closest("[data-action]")?.dataset.action === "saveEdit") {
      const data = {
        id: this.state.editingId,
        name: e.target.closest("li").querySelector("input").value,
      };
      this.editCategory(data);
      this.cancelEditMode();
    }
  }

  addEventListener() {
    this.categoryManagement.addEventListener("click", () => {
      this.categorieAside.open("Categorías", "categories");
      this.state.mode = "list";
      this.init();
    });

    this.categorieAside.asidePanel.addEventListener( "click", this.handleClickEvent.bind(this) );
  }
}
