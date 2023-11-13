const draggables = document.querySelectorAll(".draggable");

const containers = document.querySelectorAll(".container");

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", (e) => handleDragStart(e, draggable));
  draggable.addEventListener("dragend", (e) => handleDragEnd(e, draggable));
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) =>
    handleContainerDragOver(e, container)
  );
});

function handleDragStart(e, draggable) {
  draggable.classList.add("dragging");
}

function handleDragEnd(e, draggable) {
  draggable.classList.remove("dragging");
}

function handleContainerDragOver(e, container) {
  e.preventDefault();
  const draggable = document.querySelector(".dragging");
  container.append(draggable);
  getDragAfterElement(container, e.clientY);
}

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];
  draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      console.log(box);
    },
    {
      offset: Number.POSITIVE_INFINITY,
    }
  );
}
