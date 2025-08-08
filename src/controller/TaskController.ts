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

  public static async updateUserTask(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const { userId, taskId } = req.params;

      // validate if userId is equal to token user id
      if (Number(userId) !== req.user.id) {
        return res.status(403).json({
          success: false,
          error: "Access denied",
          message: "You are not authorized to update someone else's task.",
        });
      }

      // check if task belongs to user
      const task = await TaskRepository.getUserTask(userId, taskId);

      if (!task) {
        return res.status(404).json({
          success: false,
          error: "Not Found",
          message: "Task not found.",
        });
      }

      const { title, description } = req.body;

      const updateData: {
        title?: string;
        description?: string;
      } = {};

      if (title !== undefined) {
        updateData.title = title;
      }
      if (description !== undefined) {
        updateData.description = description;
      }

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          success: false,
          error: "Bad Request",
          message: "At least one field (title or description) is required.",
        });
      }

      // update task
      await TaskRepository.updateUserTask(userId, taskId, updateData);

      res.status(200).json({
        success: true,
        message: "Task updated successfully.",
      });
    } catch (error) {
      next(error);
    }
  }

  public static async addUserTaskToTodoList(
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
          message:
            "You are not authorized to add a task to someone else's todo list.",
        });
      }

      const { taskId } = req.body;

      // validate if taskId is required
      if (!taskId) {
        return res.status(400).json({
          success: false,
          error: "Bad Request",
          message: "Task ID is required.",
        });
      }

      // check if task belongs to user
      const task = await TaskRepository.getUserTask(userId, taskId);

      if (!task) {
        return res.status(404).json({
          success: false,
          error: "Not Found",
          message: "Task not found.",
        });
      }

      // add task to todo list
      await TaskRepository.addUserTaskToTodoList(userId, taskId);

      res.status(201).json({
        success: true,
        message: "Task added to todo list successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
}
