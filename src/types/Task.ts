export interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoTask extends Task {
  position: number;
}
