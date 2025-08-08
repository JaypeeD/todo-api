import { Task } from "#/types/Task";
import knex from "#lib/knex";

export default class TaskRepository {
  public static async getUserTasks(userId: string): Promise<Task[]> {
    return knex("tasks").where("user_id", userId);
  }

  public static async getUserTodoTasks(userId: string): Promise<Task[]> {
    return knex("tasks as t")
      .join("todo_tasks as tt", "tt.task_id", "t.id")
      .where("t.user_id", userId)
      .orderBy("position", "asc");
  }
}
