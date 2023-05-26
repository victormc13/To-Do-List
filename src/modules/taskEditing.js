import { taskDescription } from './tasks.js';

export const enableTaskDescriptionEditing = () => {
  taskDescription.contentEditable = true;
  taskDescription.focus();
};
