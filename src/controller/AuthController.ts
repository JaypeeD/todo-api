/**
 * Module dependencies
 */
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserRepository from "#/repository/UserRepository";
import { UserPayload } from "#/types/User";
import config from "#config/index";

export default class AuthController {
  public static async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const { username, password } = req.body;

      // check if user already exists
      const user = await UserRepository.getUserByUsername(username);

      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // create user
      await UserRepository.createUser({
        username,
        password: hashedPassword,
      } as UserPayload);

      res.status(201).json({
        message: "User created successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  public static async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          success: false,
          error: "Bad Request",
          message: "Username and password are required.",
        });
      }

      // check if user exists
      const user = await UserRepository.getUserByUsername(username);

      if (!user) {
        return res.status(401).json({
          success: false,
          error: "Unauthorized",
          message: "Invalid username or password.",
        });
      }

      // check if password match
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          error: "Unauthorized",
          message: "Invalid username or password.",
        });
      }

      // generate token
      const token: string = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        config.get("JWT_SECRET") as string,
        {
          expiresIn: config.get("JWT_EXPIRES_IN") as string,
        } as jwt.SignOptions,
      );

      res.status(200).json({
        message: "Login successful",
        token,
      });
    } catch (error) {
      next(error);
    }
  }
}
