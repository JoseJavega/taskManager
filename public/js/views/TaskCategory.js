export class TaskCategoryView{

  static render(container, state, categoryList){
    const categoryContainer = container.querySelector("#asideContent");

    // defaul Layout
    this.resetCategoryList(categoryContainer);
    this.renderAddCategory(categoryContainer);
    this.renderList(categoryContainer, categoryList, state);
    this.renderDelCategory(categoryContainer, state);
  };

  static resetCategoryList (container){
    if (!container) return;
    container.innerHTML='';
  };

  static renderAddCategory(categoryContainer){
    const addCategoryForm = document.createElement('form');
    addCategoryForm.innerHTML=`
      <input type="text" id="add-category-input" required>
      <button type="submit" id="add-category-btn">+ Añadir categoría</button>
    `;
    categoryContainer.appendChild(addCategoryForm);
  };

  static renderList(categoryContainer, input, state){
    const categoryUl = document.createElement('ul');
    input.forEach(element => {
      const li = document.createElement('li');
      li.dataset.id=element._id;
      li.classList.add('category-li');
      switch(state.mode){
        case 'list':
          li.innerHTML = `${element.name}`;
          break;
        case 'delete':
          const check = document.createElement('input');
          const span = document.createElement('span');
          check.type = 'checkbox';
          check.dataset.id = element._id;
          span.textContent = element.name;
          li.append(check, span);
          break;
        case 'edit':
          if (state.editingId === element._id){
            const input = document.createElement('input');
              input.type = 'text';
              input.name = element.name;
              input.value = element.name;
              input.id = element._id;
            const btnSave = document.createElement('button');
              btnSave.textContent = 'save';
              btnSave.dataset.action = 'saveEdit';
            const btnCancel = document.createElement('button');
              btnCancel.textContent = 'cancel';
              btnCancel.dataset.action = 'cancelEdit';
            li.append(input, btnSave, btnCancel);
          }else{
            li.textContent = element.name
          }
          break;
      }
      categoryUl.appendChild(li);
    });
     categoryContainer.appendChild(categoryUl);
  };

  static renderDelCategory(categoryContainer, state){
    const delCategory = document.createElement('div');
    let btnClass = 'btn-deletelist';
    let btnAction = 'activateDelete';
    let btnText = 'Eliminar Categorías';
    let btnCancel='';

    if (state.mode==='delete'){
      btnClass = 'btn-savechanges';
      btnAction = 'confirmDelete';
      btnText = 'Eliminar Seleccionadas';
      btnCancel= `<button id="del-category-cancel-button" class="cancelBtn" data-action="cancelDelete">Cancelar</button>`
    }
    delCategory.innerHTML=`
      <button id="del-category-button" class="${btnClass}" data-action="${btnAction}">${btnText}</button>
      ${btnCancel}
    `;
    categoryContainer.appendChild(delCategory);
  }

}