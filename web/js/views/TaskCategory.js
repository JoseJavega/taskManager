export class TaskCategoryView {
  static render(container, state, categoryList) {
    const categoryContainer = container.querySelector("#asideContent");

    // defaul Layout
    this.resetCategoryList(categoryContainer);
    this.renderAddCategory(categoryContainer, state);
    if (categoryList){
      this.renderList(categoryContainer, categoryList, state);
      this.renderDelCategory(categoryContainer, state);
    }
  }

  static resetCategoryList(container) {
    if (!container) return;
    container.innerHTML = "";
  }

  static renderAddCategory(categoryContainer, state) {
    const addCategoryForm = document.createElement("form");
    const formState = state.mode!="list" ? 'disabled' : '' ;  

    addCategoryForm.innerHTML = `
      <input type="text" id="add-category-input" required placeholder="Nombre nueva categoría" ${formState}>
      <button type="submit" id="add-category-btn" ${formState}>+ Añadir categoría</button>
    `;
    categoryContainer.appendChild(addCategoryForm);
  }

  static renderList(categoryContainer, input, state) {
    const categoryUl = document.createElement("ul");
    input.forEach((element) => {
      const li = document.createElement("li");
      li.dataset.id = element._id;
      li.classList.add("category-li");
      switch (state.mode) {
        case "list":
          li.innerHTML = `${element.name}`;
          break;
        case "delete":
          const check = document.createElement("input");
          const label = document.createElement("label");
          check.type = "checkbox";
          check.dataset.id = element._id;
          check.id = element._id;
          label.textContent = element.name;
          label.htmlFor = element._id;
          li.append(check, label);
          break;
        case "edit":
          if (state.editingId === element._id) {
            const input = document.createElement("input");
            input.type = "text";
            input.name = element.name;
            input.value = element.name;
            const btnSave = document.createElement("button");
            btnSave.innerHTML = '<img src="./assets/icons/save.svg">';
            btnSave.dataset.action = "saveEdit";
            btnSave.classList.add("save_edit");
            const btnCancel = document.createElement("button");
            btnCancel.innerHTML = '<img src="./assets/icons/close.svg">';
            btnCancel.dataset.action = "cancelEdit";
            btnCancel.classList.add("cancel_edit");
            li.append(input, btnSave, btnCancel);
          } else {
            li.textContent = element.name;
          }
          break;
      }
      categoryUl.appendChild(li);
    });
    categoryContainer.appendChild(categoryUl);
  }

  static renderDelCategory(categoryContainer, state) {
    const delCategory = document.createElement("div");
    delCategory.classList.add("aside_btn_wrapper");
    let btnClass = "btn-deletelist";
    let btnAction = "activateDelete";
    let btnText = "Eliminar Categorías";
    let btnCancel = "";

    if (state.mode === "delete") {
      btnClass = "btn-savechanges";
      btnAction = "confirmDelete";
      btnText = "Eliminar Seleccionadas";
      btnCancel = `<button id="del-category-cancel-button" class="cancelBtn" data-action="cancelDelete">Cancelar</button>`;
    }
    delCategory.innerHTML = `
      <button id="del-category-button" class="${btnClass}" data-action="${btnAction}">${btnText}</button>
      ${btnCancel}
    `;
    categoryContainer.appendChild(delCategory);
  }
}
