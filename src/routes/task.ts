import express from "express";

import TaskController from "#/controller/TaskController";

export default express
  .Router()
  .get("/users/:userId/tasks", TaskController.getUserTasks.bind(TaskController))
  .get(
    "/users/:userId/tasks/todo",
    TaskController.getUserTodoTasks.bind(TaskController),
  )
  .post(
    "/users/:userId/tasks",
    TaskController.createUserTask.bind(TaskController),
  );
