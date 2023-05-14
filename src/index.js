import './style.css';

const tasks = [
  { description: 'task1', completed: false, index: 1 },
  { description: 'task2', completed: false, index: 2 },
  { description: 'task3', completed: false, index: 3 },
  { description: 'task4', completed: false, index: 4 },
];

const createTaskItem = (task) => {
  const li = document.createElement('li');
  li.classList.add('task-item', 'flex-row');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', () => {
    if (checkbox.checked === true) {
      li.classList.add('task-completed');
      task.completed = true;
    } else {
      li.classList.remove('task-completed');
      task.completed = false;
    }
  });

  li.appendChild(checkbox);

  const p = document.createElement('p');
  p.textContent = task.description;
  li.appendChild(p);

  const icon = document.createElement('i');
  icon.classList.add('las', 'la-ellipsis-v', 'btn');
  li.appendChild(icon);

  return li;
};

const iterateTask = (tasks) => {
  const tasksContainer = document.querySelector('.task-container');

  tasks.forEach((task) => {
    const taskItem = createTaskItem(task);
    tasksContainer.appendChild(taskItem);
  });
};

// Call iterateTask function after HTML has loaded
window.addEventListener('DOMContentLoaded', () => {
  iterateTask(tasks);
});
