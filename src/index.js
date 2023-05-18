import './style.css';
import '../src/list-icon.svg';
import { renderTasks, addTask, clearCompletedTasks } from './modules/tasks.js';

renderTasks();

const form = document.querySelector('.task-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = form.querySelector('input[type=text]');
  const description = input.value.trim();
  if (description) {
    addTask(description);
    input.value = '';
  }
});

const addTaskBtn = document.querySelector('.la-level-down-alt');
addTaskBtn.addEventListener('click', () => {
  const input = form.querySelector('input[type=text]');
  const description = input.value.trim();
  if (description) {
    addTask(description);
    input.value = '';
  }
});

const refreshTasks = document.querySelector('.la-sync');
refreshTasks.addEventListener('click', () => {
  window.location.reload();
});

const clearButton = document.querySelector('.completed-tasks-btn');
clearButton.addEventListener('click', () => {
  // Use the clearCompletedTasks() function from the tasks module
  clearCompletedTasks();
});
