import { renderTasks, saveTasks } from './tasks.js';

// Mock the storage-related functions
jest.mock('./tasks', () => ({
  saveTasks: jest.fn(),
  renderTasks: jest.fn(),
}));

describe('Edit function, status complete and clear all button', () => {
  let taskItem;
  let taskDescription;
  let taskCheckbox;

  beforeEach(() => {
    // Clear mock function calls and reset mock behavior
    saveTasks.mockClear();
    renderTasks.mockClear();

    // Create a mock task list in the DOM
    document.body.innerHTML = `
      <ul class="task-container">
        <li class="task-item task-completed">
        <input type="checkbox">
        <p>Task 1</p>
        </li>
      </ul>
    `;
    taskItem = document.querySelector('.task-item');
    taskDescription = taskItem.querySelector('p');
    taskCheckbox = taskItem.querySelector('input[type="checkbox"]');
  });

  test('should save changes and update task list in the DOM', () => {
    // Arrange
    const updatedDescription = 'Updated Task 1';

    // Act
    renderTasks();
    taskDescription.innerText = updatedDescription;
    saveTasks();

    // Assert
    expect(taskDescription.innerText).toBe(updatedDescription);
    expect(renderTasks).toHaveBeenCalledTimes(1);
    expect(saveTasks).toHaveBeenCalledTimes(1);
  });

  test('should mark task as completed when checkbox is checked', () => {
    // Act
    taskCheckbox.checked = true;
    taskCheckbox.dispatchEvent(new Event('change'));
    saveTasks();
    renderTasks();

    // Assert
    expect(taskItem.classList.contains('task-completed')).toBe(true);
    expect(saveTasks).toHaveBeenCalledTimes(1);
    expect(renderTasks).toHaveBeenCalledTimes(1);
  });

  test('should mark task as not completed when checkbox is unchecked', () => {
    // Arrange
    taskItem.classList.remove('task-completed');

    // Act
    taskCheckbox.checked = false;
    taskCheckbox.dispatchEvent(new Event('change'));
    saveTasks();
    renderTasks();

    // Assert
    expect(taskItem.classList.contains('task-completed')).toBe(false);
    expect(saveTasks).toHaveBeenCalledTimes(1);
    expect(renderTasks).toHaveBeenCalledTimes(1);
  });
});
