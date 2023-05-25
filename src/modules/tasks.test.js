import { addTask } from './tasks'

describe('addTask', () => {
  test('should add task when addTask class is called', () => {
    expect(addTask(description)).toBe('task1')
  })
});