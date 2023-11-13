const todo_Form = document.getElementById("js-todo-form")! as HTMLFormElement;
const toDo_Input = document.getElementById("js-todo-input")! as HTMLInputElement;
const addTodo_Btn = document.getElementById("js-add-todo-btn")! as HTMLButtonElement;
const todo_List = document.getElementById("js-todo-list")! as HTMLUListElement;
let todo_Checkbox = document.querySelectorAll(".input-checkbox")! as NodeList;

let localStorageTodos = localStorage.getItem("todoApp")!;

localStorageTodos = JSON.parse(localStorageTodos);


const todo_Array: Todoo[] = [...localStorageTodos];
renderTodoList();

interface Todoo {
  id: number;
  value: string;
  isSelected: boolean;
}

todo_Form.addEventListener("submit", handleSubmitt);

function handleSubmitt(e: SubmitEvent) {
  e.preventDefault();
  addTodoo();
  renderTodoList();
  todo_Form.reset();
}

function addTodoo() {
  const newtodo: Todoo = {
    id: Math.random() * 1_000_000,
    value: toDo_Input.value,
    isSelected: false,
  };
  todo_Array.push(newtodo);
  localStorage.setItem("todoApp", JSON.stringify(todo_Array));
}

function renderTodoList() {
  todo_List.innerHTML = "";
  todo_Array.forEach((todo: Todoo) => {
    const listItem = document.createElement("li");
    listItem.id = `${todo.id}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.isSelected;

    checkbox.className = "input-checkbox";

    listItem.innerText = todo.value;
    listItem.appendChild(checkbox);

    todo_List.appendChild(listItem);
  });

  todo_Checkbox = document.querySelectorAll(".input-checkbox")! as NodeList;
  todo_Checkbox?.forEach((listCheckbox) => {
    listCheckbox.addEventListener("click", handleClickTodo);
  });
}

function handleClickTodo(e: Event) {
  const target = e.target as HTMLInputElement;
  const targetParent = target.parentElement as HTMLElement;
  let parentId = targetParent.id;

  const data = todo_Array.find((todo) => todo.id === Number(parentId)) as Todoo;

  data.isSelected = !data.isSelected;

  localStorage.setItem("todoApp", JSON.stringify(todo_Array));
}
