const formAddTodo = document.querySelector('.form-add-todo');
const containerTodos = document.querySelector('.todos-container');
const inputSearchTodo = document.querySelector('.form-search input');

const stringInLowerCase = string => string.toLowerCase();
const resetInput = input => input.value = '';

const filterTodos = (inputValue, boolean) => {
  const todosInArray = Array.from(containerTodos.children);

  return todosInArray.filter(todo => {
      const todoInLowerCase = stringInLowerCase(todo.textContent);

      return todoInLowerCase.includes(inputValue) === boolean;
    });
};

const showOrHideTudo = (todos, classToAdd) => {
  todos.forEach(({ classList }) => {
    const classToRemove = classToAdd === "hidden" ? "d-flex" : "hidden";    
    
    classList.add(classToAdd);
    classList.remove(classToRemove);
  });
};

const addTodo = event => {
  event.preventDefault();

  const todosFound = filterTodos("", true);  

  resetInput(inputSearchTodo);
  showOrHideTudo(todosFound, "d-flex");

  const inputValue = event.target.add.value.trim();

  if (inputValue) {
    const todoId = inputValue.replaceAll(" ", "-");

    containerTodos.innerHTML +=
      `<li id="${todoId}" class="list-group-item d-flex justify-content-between align-items-center">
        <span>${inputValue}</span>
        <i class="far fa-trash-alt delete" data-id ="${todoId}"></i>
      </li>`;
  }

  event.target.reset();
};

const removeTodo = event => {
  const clickedElement = event.target;
  const isTrashCan = clickedElement.className.includes('delete');

  if (isTrashCan) {
    const todoId = clickedElement.dataset.id;
    const TodoOfTrashCan = document.getElementById(todoId);

    TodoOfTrashCan.remove();
  }
}

const searchTodo = event => {
  event.preventDefault();

  const inputValue = stringInLowerCase(event.target.value.trim());

  resetInput(formAddTodo.add)

  const todosNotFound = filterTodos(inputValue, false);
  showOrHideTudo(todosNotFound, "hidden");

  const todosFound = filterTodos(inputValue, true);
  showOrHideTudo(todosFound, "d-flex");
}

formAddTodo.addEventListener('submit', addTodo);
containerTodos.addEventListener('click', removeTodo);
inputSearchTodo.addEventListener('input', searchTodo);
