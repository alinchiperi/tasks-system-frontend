import { Tag } from './Tag';

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  taskStatus: string;
  userId: number;
  tags: Tag[];
}
