import express from "express";
import AuthController from "#/controller/AuthController";

export default express
  .Router()
  .post("/register", AuthController.register.bind(AuthController))
  .post("/login", AuthController.login.bind(AuthController));
