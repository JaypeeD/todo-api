import { Task } from "#/types/Task";
import knex from "#lib/knex";

export default class TaskRepository {
  public static async getUserTasks(userId: string): Promise<Task[]> {
    return knex("tasks").where("user_id", userId);
  }
}
