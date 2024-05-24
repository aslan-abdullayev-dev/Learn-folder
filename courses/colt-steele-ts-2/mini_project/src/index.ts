const btn = document.querySelector("#btn") as HTMLButtonElement;
const input = document.querySelector("#todoinput") as HTMLInputElement;
const form = document.querySelector("#todoform") as HTMLFormElement;
const list = document.querySelector("#todolist") as HTMLUListElement;

interface ITodo {
  text: string;
  completed: boolean;
}

const todos: ITodo[] = readTodos()
todos.forEach(t => createTodo(t))

form.addEventListener("submit", submitForm)

function readTodos(): ITodo[] {
  return JSON.parse(localStorage.getItem("todos") ?? "[]")
}

function submitForm(e: SubmitEvent) {
  e.preventDefault();
  const newTodo = { completed: false, text: input.value };
  createTodo(newTodo)
  todos.push(newTodo)
  localStorage.setItem("todos", JSON.stringify(todos))
  input.value = "";
}

function createTodo(todo: ITodo) {
  const newLi = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", function (e) {
    todo.completed = checkbox.checked;
    localStorage.setItem("todos", JSON.stringify(todos));
  })
  newLi.append(todo.text);
  newLi.append(checkbox);
  list.append(newLi);
}
