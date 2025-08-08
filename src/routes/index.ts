import express from "express";
import task from "./task";
import auth from "./auth";
import { authenticate as authMiddleware } from "#/middleware/auth";

export default (): express.Router =>
  express.Router().use(auth).use(authMiddleware, task);
