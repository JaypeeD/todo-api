import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { AuthRequest } from "#/types/AuthRequest";

interface JWTPayload {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

/**
 * Middleware to verify JWT token and extract user information
 */
export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({
      success: false,
      error: "Access token required",
      message: "No token provided",
    });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET not configured");
    }

    const decoded = jwt.verify(token, secret) as JWTPayload;

    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        success: false,
        error: "Token expired",
        message: "Your session has expired. Please login again.",
      });
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        success: false,
        error: "Invalid token",
        message: "Invalid or malformed token",
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Authentication error",
        message: "An error occurred during authentication",
      });
    }
  }
};
