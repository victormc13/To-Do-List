import { taskDescription } from './tasks';

export const enableTaskDescriptionEditing = () => {
  taskDescription.contentEditable = true;
  taskDescription.focus();
};
