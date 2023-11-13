"use strict";
// const btn = document.getElementById("btn")!;
// btn.addEventListener("click", () => console.log("clicked"));
// console.dir(btn);
// // ============================================================
// let mystery: unknown = "Hello World !!!";
// // type assertion. It does not change the type of the variable, but enables to treat it as it is a string in this context
// const numChars = (mystery as string).length;
// ===============================================================
const form = document.getElementById("js-todo-form");
const input = document.getElementById("js-todo-input");
const btn = document.getElementById("js-add-todo-btn");
const list = document.getElementById("js-todo-list");
function readTodos() {
    const todosJSON = localStorage.getItem("todos");
    if (todosJSON === null)
        return [];
    return JSON.parse(todosJSON);
}
const todos = readTodos();
todos.forEach(createTodo);
form.addEventListener("submit", handleSubmit);
function handleSubmit(e) {
    e.preventDefault();
    if (!input.value.trim())
        return;
    const newtodo = {
        text: input.value,
        completed: false,
    };
    createTodo(newtodo);
    todos.push(newtodo);
    localStorage.setItem("todos", JSON.stringify(todos));
    input.value = "";
}
function createTodo(todo) {
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
