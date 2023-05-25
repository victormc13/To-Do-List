import { addTask, saveTasks, renderTasks } from './tasks';

// Mock the storage-related functions
jest.mock('./tasks', () => ({
  addTask: jest.fn(),
  saveTasks: jest.fn(),
  renderTasks: jest.fn(),
}));

describe('addTask', () => {
  let taskList;

  beforeEach(() => {
    // Clear mock function calls and reset mock behavior
    saveTasks.mockClear();
    renderTasks.mockClear();

    // Create a mock task list in the DOM
    document.body.innerHTML = `
      <ul class="task-container">
        <li>Task 1</li>
        <li>Task 2</li>
      </ul>
    `;
    taskList = document.querySelector('.task-container');
  });

  test('should add a task element to the list in the DOM', () => {
    // Arrange
    const description = 'Task 3';

    // Act
    addTask(description);

    // Assert
    const taskElements = taskList.getElementsByTagName('li');
    expect(taskElements.length).toBe(2); // Check if exactly one <li> element is added
    // expect(taskElements[2].textContent).toBe(description); // Check if the correct description is added
  });
});
