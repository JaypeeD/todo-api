import TaskRepository from "#/repository/TaskRepository";
import TodoTaskRepository from "#/repository/TodoTaskRepository";
import { Task } from "#/types/Task";
import PositionHelper from "#/utils/PositionHelper";

export default class TaskService {
  public static async getUserTasks(userId: string): Promise<Task[]> {
    return TaskRepository.getUserTasks(userId);
  }

  public static async getUserTask(
    userId: string,
    taskId: string,
  ): Promise<Task | undefined> {
    return TaskRepository.getUserTask(userId, taskId);
  }

  public static async getUserTodoTasksDetails(userId: string): Promise<Task[]> {
    return TodoTaskRepository.getUserTodoTasksDetails(userId);
  }

  public static async getUserTodoTask(
    userId: string,
    taskId: string,
  ): Promise<Task | undefined> {
    return TodoTaskRepository.getUserTodoTask(userId, taskId);
  }

  public static async createUserTask(
    userId: string,
    title: string,
    description: string,
  ): Promise<void> {
    return TaskRepository.createUserTask(userId, title, description);
  }

  public static async updateUserTask(
    userId: string,
    taskId: string,
    updateData: { title?: string; description?: string },
  ): Promise<void> {
    return TaskRepository.updateUserTask(userId, taskId, updateData);
  }

  public static async removeUserTaskFromTodoList(
    userId: string,
    taskId: string,
  ): Promise<void> {
    return TodoTaskRepository.removeUserTaskFromTodoList(userId, taskId);
  }

  public static async addUserTaskToTodoList(
    userId: string,
    taskId: number,
    beforeTaskId: number | null = null,
  ): Promise<void> {
    let todoTasks = await TodoTaskRepository.getTodoTasksByUserId(userId);
    let newPosition = PositionHelper.calculateNewPosition(
      todoTasks,
      beforeTaskId,
    );

    if (beforeTaskId) {
      const beforeTask = todoTasks.find((task) => task.taskId === beforeTaskId);

      if (!beforeTask) {
        throw new Error("Before task not found in user's todo list");
      }

      if (
        PositionHelper.needsRedistribution(newPosition, beforeTask.position)
      ) {
        const redistributed = PositionHelper.redistribute(todoTasks);
        await TodoTaskRepository.updateTasksPosition(userId, redistributed);
        todoTasks = redistributed;
        newPosition = PositionHelper.calculateNewPosition(
          todoTasks,
          beforeTaskId,
        );
      }
    }

    const task = {
      user_id: userId,
      task_id: taskId,
      position: newPosition,
    };

    await TodoTaskRepository.addUserTaskToTodoList(task);
  }

  public static async reorderUserTodoTasks(
    userId: string,
    taskId: number,
    beforeTaskId: number | null = null,
  ): Promise<void> {
    let todoTasks = await TodoTaskRepository.getTodoTasksByUserId(userId);

    if (todoTasks.length === 0) {
      return;
    }

    const task = todoTasks.find((task) => task.taskId === taskId);

    if (!task) {
      throw new Error("Task not found in user's todo list");
    }

    let newPosition = PositionHelper.calculateNewPosition(
      todoTasks,
      beforeTaskId,
    );

    if (beforeTaskId) {
      const beforeTask = todoTasks.find((task) => task.taskId === beforeTaskId);

      if (!beforeTask) {
        throw new Error("Before task not found in user's todo list");
      }

      // If positions are too close, redistribute positions
      if (
        PositionHelper.needsRedistribution(newPosition, beforeTask.position)
      ) {
        const redistributed = PositionHelper.redistribute(todoTasks);
        await TodoTaskRepository.updateTasksPosition(userId, redistributed);
        todoTasks = redistributed;
        newPosition = PositionHelper.calculateNewPosition(
          todoTasks,
          beforeTaskId,
        );
      }
    }

    await TodoTaskRepository.updateTaskPosition(userId, taskId, newPosition);
  }
}
