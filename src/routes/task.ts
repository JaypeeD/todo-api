import express from "express";

import TaskController from "#/controller/TaskController";

export default express
  .Router()
  .get("/users/:userId/tasks", TaskController.getUserTasks.bind(TaskController))
  .get(
    "/users/:userId/todo-tasks",
    TaskController.getUserTodoTasks.bind(TaskController),
  )
  .post(
    "/users/:userId/tasks",
    TaskController.createUserTask.bind(TaskController),
  )
  .put(
    "/users/:userId/tasks/:taskId",
    TaskController.updateUserTask.bind(TaskController),
  )
  .post(
    "/users/:userId/todo-tasks",
    TaskController.addUserTaskToTodoList.bind(TaskController),
  )
  .delete(
    "/users/:userId/todo-tasks/:taskId",
    TaskController.removeUserTaskFromTodoList.bind(TaskController),
  )
  .put(
    "/users/:userId/todo-tasks/reorder",
    TaskController.reorderUserTodoTasks.bind(TaskController),
  );
