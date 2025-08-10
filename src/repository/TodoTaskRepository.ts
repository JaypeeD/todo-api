import { Task, TodoTask } from "#/types/Task";
import knex from "#lib/knex";

export default class TodoTaskRepository {
  public static getTodoTasksByUserId(userId: string): Promise<TodoTask[]> {
    return knex("todo_tasks")
      .where("user_id", userId)
      .orderBy("position", "asc")
      .select(["task_id", "position"]);
  }

  public static async getUserTodoTasksDetails(userId: string): Promise<Task[]> {
    return knex("todo_tasks as tt")
      .select([
        "t.id",
        "t.title",
        "t.description",
        "t.created_at",
        "t.updated_at",
        "tt.position",
      ])
      .join("tasks as t", "t.id", "tt.task_id")
      .where("tt.user_id", userId)
      .orderBy("tt.position", "asc");
  }

  public static async getUserTodoTask(
    userId: string,
    taskId: string,
  ): Promise<Task | undefined> {
    return knex("todo_tasks as tt")
      .where("tt.user_id", userId)
      .where("tt.task_id", taskId)
      .first();
  }

  public static async addUserTaskToTodoList(task: {
    user_id: string;
    task_id: number;
    position: number;
  }): Promise<void> {
    await knex("todo_tasks").insert(task);
  }

  public static async removeUserTaskFromTodoList(
    userId: string,
    taskId: string,
  ): Promise<void> {
    await knex("todo_tasks")
      .where("user_id", userId)
      .where("task_id", taskId)
      .delete();
  }

  public static async updateTaskPosition(
    userId: string,
    taskId: number,
    position: number,
  ): Promise<void> {
    await knex("todo_tasks")
      .where("user_id", userId)
      .where("task_id", taskId)
      .update({ position: position });
  }

  public static async updateTasksPosition(
    userId: string,
    updates: { taskId: number; position: number }[],
  ): Promise<void> {
    // Update all positions in a transaction
    await knex.transaction(async (trx) => {
      for (const update of updates) {
        await trx("todo_tasks")
          .where("user_id", userId)
          .where("task_id", update.taskId)
          .update({ position: update.position });
      }
    });
  }
}
