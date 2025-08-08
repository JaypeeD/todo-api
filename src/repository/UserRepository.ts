import { User, UserPayload } from "#/types/User";
import knex from "#lib/knex";

export default class UserRepository {
  public static async getUserByUsername(
    username: string,
  ): Promise<User | undefined> {
    return knex("users as u").where("u.username", username).first();
  }

  public static async createUser(user: UserPayload): Promise<void> {
    await knex("users").insert(user);
  }
}
