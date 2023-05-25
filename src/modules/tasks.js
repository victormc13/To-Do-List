const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const saveTasks = () => localStorage.setItem('tasks', JSON.stringify(tasks));

export const renderTasks = () => {
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
    taskCheckbox.addEventListener('change', () => {
      task.completed = taskCheckbox.checked;
      saveTasks();
      renderTasks();
    });
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

      const showTrashIcon = () => {
        trashIcon.classList.remove('hidden');
        trashIcon.classList.add('show');
      };

      const enableTaskDescriptionEditing = () => {
        taskDescription.contentEditable = true;
        taskDescription.focus();
      };

      const updateTaskIndexes = () => {
        tasks.forEach((task, index) => {
          task.index = index + 1;
        });
      };

      const deleteTask = () => {
        const index = tasks.indexOf(task);
        if (index > -1) {
          tasks.splice(index, 1);
          renderTasks();
          updateTaskIndexes();
        }
        saveTasks();
      };

      const addTrashIconEventListener = () => {
        trashIcon.addEventListener('click', () => {
          if (trashIcon.classList.contains('la-trash-alt')) {
            deleteTask();
            renderTasks();
          }
        });
      };

      const disableTaskDescriptionEditing = () => {
        taskDescription.contentEditable = false;
      };

      const hideTaskMenu = () => {
        taskMenu.classList.add('hidden');
      };

      const showTaskMenu = () => {
        taskMenu.classList.remove('hidden');
        taskMenu.classList.add('show');
      };

      const addKeydownEventListener = () => {
        taskDescription.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === 'Escape') {
            event.preventDefault();
            disableTaskDescriptionEditing();
            taskItem.classList.remove('task-editing');
            trashIcon.classList.add('hidden');
            showTaskMenu();
            saveTasks();
          }
        });
      };

      const editTask = () => {
        if (taskItem.classList.contains('task-editing')) {
          showTrashIcon();
          enableTaskDescriptionEditing();
          addTrashIconEventListener();
          addKeydownEventListener();
          hideTaskMenu();
        }
      };

      updateTaskIndexes();
      editTask();
    });
    taskItem.appendChild(taskMenu);
    taskItem.appendChild(trashIcon);

    taskContainer.appendChild(taskItem);
  });
};

export const addTask = (description) => {
  const index = tasks.length + 1;
  tasks.push({
    description,
    completed: false,
    index,
  });
  saveTasks();
  renderTasks();
};

const updateTaskIndexes = () => {
  tasks.forEach((task, index) => {
    task.index = index + 1;
  });
};

export const clearCompletedTasks = () => {
  const completedTasks = tasks.filter((task) => task.completed);

  completedTasks.forEach((completedTask) => {
    const index = tasks.indexOf(completedTask);
    tasks.splice(index, 1);
  });

  updateTaskIndexes();
  saveTasks();
  renderTasks();
};
