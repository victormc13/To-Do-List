import '../src/style.css';

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
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
    taskCheckbox.checked = task.completed;
    taskCheckbox.addEventListener("change", () => {
      task.completed = taskCheckbox.checked;
      saveTasks();
      renderTasks();
    });
    taskItem.appendChild(taskCheckbox);

    const taskDescription = document.createElement("p");
    taskDescription.innerText = task.description;
    taskDescription.contentEditable = true;
    taskDescription.addEventListener("input", () => {
      task.description = taskDescription.innerText;
      saveTasks();
    });
    taskItem.appendChild(taskDescription);

    const taskMenu = document.createElement("i");
    taskMenu.classList.add("las", "la-ellipsis-v", "btn");
    taskMenu.addEventListener("click", () => {
      const index = tasks.indexOf(task);
      if (index > -1) {
        tasks.splice(index, 1);
        saveTasks();
        // loop through remaining tasks and update their indexes
        tasks.forEach((task, index) => {
          task.index = index;
        });
        renderTasks();
      }
    });
    taskItem.appendChild(taskMenu);

    taskContainer.appendChild(taskItem);
  });
}

renderTasks();

const form = document.querySelector(".task-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = form.querySelector("input[type=text]");
  const description = input.value.trim();
  if (description) {
    const index = tasks.length;
    tasks.push({
      description,
      completed: false,
      index,
    });
    saveTasks();
    renderTasks();
    input.value = "";
  }
});

const clearButton = document.querySelector(".completed-tasks-btn");
clearButton.addEventListener("click", () => {
  tasks.forEach((task, index) => {
    if (task.completed) {
      tasks.splice(index, 1);
    }
  });
  tasks.forEach((task, index) => {
    task.index = index;
  });
  saveTasks();
  renderTasks();
});

