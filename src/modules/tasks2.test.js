import { saveTasks, renderTasks, editTask } from './tasks.js';

// Mock the storage-related functions
jest.mock('./tasks', () => ({
  editTask: jest.fn(),
  saveTasks: jest.fn(),
  renderTasks: jest.fn(),
}));

describe('Edit function, status complete and clear all button', () => {
  let taskItem;
  let taskDescription;
  let renderTasks;

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
    renderTasks.editTask(taskItem, updatedDescription);

    // Assert
    expect(taskDescription.innerText).toBe(updatedDescription); // Check if task is updated
    expect(taskDescription.contentEditable).toBe('false'); // Check if contentEditable is set to false
    expect(taskItem.classList.contains('task-editing')).toBe(false); // Check if task-editing class is removed
    expect(renderTasks).toHaveBeenCalledTimes(1); // Check if renderTasks is called
    expect(saveTasks).toHaveBeenCalledTimes(1); // Check if saveTasks is called
  });
});
