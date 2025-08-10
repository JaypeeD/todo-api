import { Task } from "#/types/Task";
import knex from "#lib/knex";

export default class TaskRepository {
  public static async getUserTasks(userId: string): Promise<Task[]> {
    return knex("tasks as t")
      .select([
        "t.id",
        "t.title",
        "t.description",
        "t.created_at",
        "t.updated_at",
      ])
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
