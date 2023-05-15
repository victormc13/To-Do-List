import '../src/style.css';

const tasks = [
  {
    description: "Buy some food",
    completed: true,
    index: 1,
  },
  {
    description: "Go for walk",
    completed: false,
    index: 2,
  },
  {
    description: "Do laundry",
    completed: false,
    index: 3,
  },
];

const renderTasks = () => {
  const taskContainer = document.querySelector(".task-container");
  taskContainer.innerHTML = "";

  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item", "flex-row");

    if (task.completed) {
      taskItem.classList.add("task-completed");
    }

    const taskCheckbox = document.createElement("input");
    taskCheckbox.type = "checkbox";
    taskItem.appendChild(taskCheckbox);

    const taskDescription = document.createElement("p");
    taskDescription.innerText = task.description;
    taskItem.appendChild(taskDescription);

    const taskMenu = document.createElement("i");
    taskMenu.classList.add("las", "la-ellipsis-v", "btn");
    taskItem.appendChild(taskMenu);

    taskContainer.appendChild(taskItem);
  });
}

window.addEventListener("load", () => {
  renderTasks();
});
