require("dotenv").config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { Request, Response } from "express";
import { AuthRequest } from "../types/types";
import pool from "../db";

export const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    // Проверка почты
    const userEmail = await pool.query("SELECT * FROM users WHERE email = $1", [
      req.body.email,
    ]);

    if (userEmail.rows.length > 0) {
      return res.status(400).json({
        msg: "Пользователь с такой именем или почтой уже существует",
      });
    }
    // Проверка username
    const userUsername = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [req.body.username]
    );

    if (userUsername.rows.length > 0) {
      return res.status(400).json({
        msg: "Пользователь с таким именем или почтой уже существует",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const query = `
      INSERT INTO users (username, email, password, tags, about, avatarurl, telegram, linkedin, discord)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`;

    const values = [
      req.body.username,
      req.body.email,
      password,
      req.body.tags,
      req.body.about,
      req.body.avatarurl,
      req.body.telegram,
      req.body.linkedin,
      req.body.discord,
    ];

    const result = await pool.query(query, values);
    const user = result.rows[0];
    const token = jwt.sign({ _id: user.id }, process.env.SECRET || "", {
      expiresIn: "30d",
    });

    res.json({
      user: {
        token: token,
        _id: user.id,
        username: user.username,
        email: user.email,
        tags: user.tags,
        about: user.about,
        avatarurl: user.avatarurl,
        telegram: user.telegram,
        linkedin: user.linkedin,
        discord: user.discord,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не уадлось зарегестрироваться",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  let userResult = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    req.body.email,
  ]);

  if (userResult.rows.length <= 0) {
    return res.status(400).json({ msg: "Неверная почта или пароль" });
  }

  const user = userResult.rows[0];
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({ msg: "Неверная почта или пароль" });
  }
  const token = jwt.sign({ _id: user.id }, process.env.SECRET || "", {
    expiresIn: "30d",
  });
  res.send(token);
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const userResult = await pool.query(`SELECT * FROM users WHERE id = $1`, [
      req.userId,
    ]);

    if (!userResult) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    const user = userResult.rows[0];

    res.json({
      user: {
        _id: user.id,
        username: user.username,
        email: user.email,
        git: user.git,
        tags: user.tags,
        about: user.about,
        telegram: user.telegram,
        linkedin: user.linkedin,
        discord: user.discord,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Нет доступа",
    });
  }
};
