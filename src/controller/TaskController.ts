import { Request, Response, NextFunction } from "express";

export default class TaskController {
  public static async getTasks(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      res.json({
        message: "Hello World",
      });
    } catch (error) {
      next(error);
    }
  }
}
