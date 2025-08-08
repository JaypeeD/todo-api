import express from "express";

import TaskController from "#/controller/TaskController";

export default express
  .Router()
  .get(
    "/users/:userId/tasks",
    TaskController.getUserTasks.bind(TaskController),
  );
