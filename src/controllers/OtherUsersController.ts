import { Request, Response } from "express";
import pool from "../db";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    if (req.query.page) {
      const page: number = Number(req.query.page);
      const numberOfUsers = String(page * 10);
      const usersQuery = `SELECT * FROM users ORDER BY id LIMIT 10 OFFSET $1`;
      const users = await pool.query(usersQuery, [numberOfUsers]);

      res.json({
        users: users.rows,
      });
    } else {
      const usersQuery = `SELECT * FROM users`;
      const users = await pool.query(usersQuery);

      res.json({
        users: users.rows,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Произошла ошибка при получении пользователей",
    });
  }
};
