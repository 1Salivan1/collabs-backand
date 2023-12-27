import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user";
import { SECRET } from "../config";
import { validationResult } from "express-validator";
import { Request, Response } from "express";
import { AuthRequest } from "../types/types";

export const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    let user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send("That user already exisits!");
    } else {
      const { username, email, password, git, tags, about, socials } = req.body;
      const doc = new UserModel({
        username,
        email,
        password,
        git,
        tags,
        about,
        socials,
      });

      const salt = await bcrypt.genSalt(10);
      doc.password = await bcrypt.hash(doc.password, salt);
      const user = await doc.save();

      res.json({
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          git: user.git,
          tags: user.tags,
          about: user.about,
          socials: user.socials,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не уадлось зарегестрироваться",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  let user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Incorrect email or password.");
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("Incorrect email or password.");
  }
  const token = jwt.sign({ _id: user._id }, SECRET, { expiresIn: "30d" });
  res.send(token);
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }
    res.json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        git: user.git,
        tags: user.tags,
        about: user.about,
        socials: user.socials,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Нет доступа",
    });
  }
};
