export interface TodoDTO {
  id: number;
  name: string;
  description: string;
  date: string;
  status: 'todo' | 'in_progress' | 'done';
}
