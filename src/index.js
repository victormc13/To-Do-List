import './style.css';

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const taskContainer = document.querySelector('.task-container');
  taskContainer.innerHTML = '';

  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach((task) => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item', 'flex-row');

    if (task.completed) {
      taskItem.classList.add('task-completed');
    }

    const taskCheckbox = document.createElement('input');
    taskCheckbox.type = 'checkbox';
    taskCheckbox.checked = task.completed;
    taskCheckbox.addEventListener('change', () => {
      task.completed = taskCheckbox.checked;
      saveTasks();
      renderTasks();
    });
    taskItem.appendChild(taskCheckbox);

    const taskDescription = document.createElement('p');
    taskDescription.innerText = task.description;
    taskDescription.contentEditable = false;
    taskDescription.addEventListener('input', () => {
      task.description = taskDescription.innerText;
      saveTasks();
    });
    taskItem.appendChild(taskDescription);

    const taskMenu = document.createElement('i');
    taskMenu.classList.add('las', 'la-ellipsis-v', 'btn');
    const trashIcon = document.createElement('i');
    trashIcon.classList.add('las', 'la-trash-alt', 'btn');
    trashIcon.classList.add('hidden');

    taskMenu.addEventListener('click', () => {
      taskItem.classList.add('task-editing');
      taskMenu.classList.add('hidden');

      if (taskItem.classList.contains('task-editing')) {
        trashIcon.classList.remove('hidden');
        trashIcon.classList.add('show');

        taskDescription.contentEditable = true;
        taskDescription.focus();

        trashIcon.addEventListener('click', () => {
          if (trashIcon.classList.contains('la-trash-alt')) {
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
          }
        });

        // add event listener to handle key presses
        taskDescription.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === 'Escape') {
            event.preventDefault(); // prevent default behavior
            taskDescription.contentEditable = false; // disable editing
            taskItem.classList.remove('task-editing');
            trashIcon.classList.add('hidden');
            taskMenu.classList.remove('hidden');
            taskMenu.classList.add('show');
            saveTasks(); // save changes
          }
        });

        taskMenu.classList.add('hidden');
      }
    });
    taskItem.appendChild(taskMenu);
    taskItem.appendChild(trashIcon);

    taskContainer.appendChild(taskItem);
  });
}

renderTasks();

const form = document.querySelector('.task-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = form.querySelector('input[type=text]');
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
    input.value = '';
  }
});

const addTaskBtn = document.querySelector('.la-level-down-alt');
addTaskBtn.addEventListener('click', () => {
  const input = form.querySelector('input[type=text]');
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
    input.value = '';
  }
});

const refreshTasks = document.querySelector('.la-sync');
refreshTasks.addEventListener('click', () => {
  window.location.reload();
});

const clearButton = document.querySelector('.completed-tasks-btn');
clearButton.addEventListener('click', () => {
  for (let i = tasks.length - 1; i >= 0; i -= 1) {
    if (tasks[i].completed) {
      tasks.splice(i, 1);
    }
  }
  tasks.forEach((task, index) => {
    task.index = index;
  });
  saveTasks();
  renderTasks();
});
