export interface User {
  id: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPayload {
  username: string;
  password: string;
}
