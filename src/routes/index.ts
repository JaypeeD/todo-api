import express from "express";
import todos from "./todos";
import auth from "./auth";
import { authenticate as authMiddleware } from "#/middleware/auth";

export default (): express.Router =>
  express.Router().use(auth).use(authMiddleware, todos);
