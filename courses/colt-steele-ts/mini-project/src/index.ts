// const btn = document.getElementById("btn")!;

// btn.addEventListener("click", () => console.log("clicked"));

// console.dir(btn);

// // ============================================================

// let mystery: unknown = "Hello World !!!";

// // type assertion. It does not change the type of the variable, but enables to treat it as it is a string in this context
// const numChars = (mystery as string).length;

// ===============================================================

const form = document.getElementById("js-todo-form")! as HTMLFormElement;
const input = document.getElementById("js-todo-input")! as HTMLInputElement;
const btn = document.getElementById("js-add-todo-btn")! as HTMLButtonElement;
const list = document.getElementById("js-todo-list")! as HTMLUListElement;

interface Todo {
  text: string;
  completed: boolean;
}

function readTodos(): Todo[] {
  const todosJSON = localStorage.getItem("todos");
  if (todosJSON === null) return [];
  return JSON.parse(todosJSON);
}

const todos: Todo[] = readTodos();

todos.forEach(createTodo);

form.addEventListener("submit", handleSubmit);

function handleSubmit(e: SubmitEvent) {
  e.preventDefault();
  if (!input.value.trim()) return;
  const newtodo: Todo = {
    text: input.value,
    completed: false,
  };

  createTodo(newtodo);
  todos.push(newtodo);

  localStorage.setItem("todos", JSON.stringify(todos));
  input.value = "";
}

function createTodo(todo: Todo) {
  const newLi = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", function () {
    todo.completed = checkbox.checked;
    localStorage.setItem("todos", JSON.stringify(todos));

    // todo.completed = this.checked;
  });
  // checkbox.addEventListener("change", handleClickCheckbox);

  newLi.append(todo.text);
  newLi.append(checkbox);
  list.append(newLi);
}

// function handleClickCheckbox(e: Event) {
//   if (e.target === null) return;
//   const eventTarget = e.target as HTMLInputElement;

//   const clickedTodo = todos.find((todo) => todo.id === eventTarget.id);
//   if (clickedTodo) {
//     clickedTodo.completed = eventTarget.checked;
//   }

//   localStorage.setItem("todos", JSON.stringify(todos));
// }
