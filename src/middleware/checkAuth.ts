import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../types/types";
import jwt from "jsonwebtoken";

interface TokenPayload {
  _id: string;
}

export const checkAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.SECRET || ""
      ) as TokenPayload;

      req.userId = decoded._id;
      next();
    } catch (error) {
      return res.status(403).json({
        message: "Нет доступа",
      });
    }
  } else {
    return res.status(403).json({
      message: "Нет доступа",
    });
  }
};
