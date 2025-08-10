export interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  position?: number;
}

export interface TodoTask {
  taskId: number;
  position: number;
}
