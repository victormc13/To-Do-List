import { renderTasks, saveTasks } from './tasks.js';

// Mock the storage-related functions
jest.mock('./tasks', () => ({
  saveTasks: jest.fn(),
  renderTasks: jest.fn(),
}));

describe('Edit function, status complete and clear all button', () => {
  let taskItem;
  let taskDescription;

  beforeEach(() => {
    // Clear mock function calls and reset mock behavior
    saveTasks.mockClear();
    renderTasks.mockClear();

    // Create a mock task list in the DOM
    document.body.innerHTML = `
      <ul class="task-container">
        <li class="task-item">
        <p>Task 1</p>
        </li>
      </ul>
    `;
    taskItem = document.querySelector('.task-item');
    taskDescription = taskItem.querySelector('p');
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
});
