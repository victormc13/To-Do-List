import { addTask } from './tasks'

describe('addTask', () => {
  test('should generate p element with task description when addTask is called', () => {
    document.body.innerHTML =
  '<div>' +
  '  <ul class="task-container"><li></li></ul>' +
  '</div>';
  addTask();
  const list = document.querySelectorAll('.task-item p');
  expect(list).toHaveLength(1);
  })
});