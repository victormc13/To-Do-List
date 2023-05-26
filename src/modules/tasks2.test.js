import { saveTasks, renderTasks } from "./tasks.js";
import { enableTaskDescriptionEditing } from "./taskEditing.js";

// Mock the storage-related functions
jest.mock("./tasks", () => ({
  enableTaskDescriptionEditing: jest.fn(),
  saveTasks: jest.fn(),
  renderTasks: jest.fn(),
}));

describe("Edit function, status complete and clear all button", () => {
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
    taskItem = document.querySelector(".task-item");
    taskDescription = taskItem.querySelector("p");
  });

  test("should can edit the task", () => {
    // Arrange
    const updatedDescription = "Updated Task 1";

    // Act
    enableTaskDescriptionEditing(taskItem, updatedDescription);
  });
});

// test('should save changes and update task list in the DOM', () => {
//   // Arrange
//   const updatedDescription = 'Updated Task 1';

//   // Act
//   editTask(taskItem, updatedDescription);
