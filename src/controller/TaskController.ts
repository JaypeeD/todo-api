/**
 * Module dependencies
 */
import { Response, NextFunction } from "express";

import { AuthRequest } from "#/types/AuthRequest";
import TaskRepository from "#/repository/TaskRepository";

export default class TaskController {
  public static async getUserTasks(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const { userId } = req.params;

      // validate if userId is equal to token user id
      if (Number(userId) !== req.user.id) {
        return res.status(403).json({
          success: false,
          error: "Access denied",
          message: "You are not authorized to view someone else's tasks.",
        });
      }
      // fetch user tasks
      const tasks = await TaskRepository.getUserTasks(userId);

      res.status(200).json({
        success: true,
        tasks,
      });
    } catch (error) {
      next(error);
    }
  }
}
