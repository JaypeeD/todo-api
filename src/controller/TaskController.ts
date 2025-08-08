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

  public static async getUserTodoTasks(
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
          message: "You are not authorized to view someone else's todo tasks.",
        });
      }

      // fetch user todo tasks
      const todoTasks = await TaskRepository.getUserTodoTasks(userId);

      res.status(200).json({
        success: true,
        todoTasks,
      });
    } catch (error) {
      next(error);
    }
  }

  public static async createUserTask(
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
          message: "You are not authorized to create a task for someone else.",
        });
      }

      const { title, description } = req.body;

      // validate if title is required
      if (!title) {
        return res.status(400).json({
          success: false,
          error: "Bad Request",
          message: "Title is required.",
        });
      }

      // create task
      await TaskRepository.createUserTask(userId, title, description);

      res.status(201).json({
        success: true,
        message: "Task created successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
}
