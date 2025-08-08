import { Task } from "#/types/Task";
import knex from "#lib/knex";

export default class TaskRepository {
  public static async getUserTasks(userId: string): Promise<Task[]> {
    return knex("tasks as t")
      .select(["t.title", "t.description", "t.created_at", "t.updated_at"])
      .where("t.user_id", userId);
  }

  public static async getUserTask(
    userId: string,
    taskId: string,
  ): Promise<Task | undefined> {
    return knex("tasks as t")
      .where("t.user_id", userId)
      .where("t.id", taskId)
      .first();
  }

  public static async getUserTodoTasks(userId: string): Promise<Task[]> {
    return knex("todo_tasks as tt")
      .select([
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

  public static async createUserTask(
    userId: string,
    title: string,
    description: string,
  ): Promise<void> {
    await knex("tasks").insert({
      user_id: userId,
      title,
      description,
    });
  }

  public static async addUserTaskToTodoList(
    userId: string,
    taskId: string,
  ): Promise<void> {
    const position = await knex("todo_tasks")
      .max("position")
      .where("user_id", userId)
      .first()
      .then((result) => result?.max || 0);

    const newPosition = position + 1;

    await knex("todo_tasks").insert({
      user_id: userId,
      task_id: taskId,
      position: newPosition,
    });
  }

  public static async updateUserTask(
    userId: string,
    taskId: string,
    updateData: { title?: string; description?: string },
  ): Promise<void> {
    await knex("tasks")
      .where("user_id", userId)
      .where("id", taskId)
      .update(updateData);
  }
}
