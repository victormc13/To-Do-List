const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function renderTasks() {
  const taskContainer = document.querySelector('.task-container');
  taskContainer.innerHTML = '';

  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach((task) => {
    // Create the task item HTML element
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item', 'flex-row');

    // Add the completed class if the task has been completed
    if (task.completed) {
      taskItem.classList.add('task-completed');
    }

    // Create the task checkbox
    const taskCheckbox = document.createElement('input');
    taskCheckbox.type = 'checkbox';
    taskCheckbox.checked = task.completed;
    taskItem.appendChild(taskCheckbox);

    // Create the task description element
    const taskDescription = document.createElement('p');
    taskDescription.innerText = task.description;
    taskDescription.contentEditable = false;
    taskDescription.addEventListener('input', () => {
      task.description = taskDescription.innerText;
      saveTasks();
    });
    taskItem.appendChild(taskDescription);

    // Create the task menu icon and trash icon
    const taskMenu = document.createElement('i');
    taskMenu.classList.add('las', 'la-ellipsis-v', 'btn');
    const trashIcon = document.createElement('i');
    trashIcon.classList.add('las', 'la-trash-alt', 'btn');
    trashIcon.classList.add('hidden');

    // Add event listener to handle task editing functionality
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

export function addTask(description) {
  const index = tasks.length;
  tasks.push({
    description,
    completed: false,
    index,
  });
  saveTasks();
  renderTasks();
}
