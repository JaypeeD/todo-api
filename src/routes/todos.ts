import express from "express";

import TaskController from "#/controller/TaskController";

export default express
  .Router()
  .get("/tasks/:userId/todo", TaskController.getTasks.bind(TaskController));
