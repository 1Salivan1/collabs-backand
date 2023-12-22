import mongoose from "mongoose";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Request, Response } from "express";
import { postValidation, userValidation } from "./validations/validations";
import { validationResult } from "express-validator";
import UserModel from "./models/user";

const app = express();
const port = 5000;
app.use(express.json());

const start = async () => {
  try {
    mongoose
      .connect(
        "mongodb+srv://collabs:74123qwe@cluster0.l9skhwe.mongodb.net/collabs?retryWrites=true&w=majority"
      )
      .then(() => {
        console.log("DB ok");
      })
      .catch((err) => console.log("DB error", err));

    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

app.post(
  "/auth/registration",
  userValidation,
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }
      let user = await UserModel.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).send("That user already exisits!");
      } else {
        // Insert the new user if they do not exist yet
        const { username, email, password, git, tags, about, socials } =
          req.body;
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

        const token = jwt.sign(
          {
            _id: user._id,
          },
          "secret123",
          {
            expiresIn: "30d",
          }
        );

        res.json({
          token,
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
  }
);

app.post("/auth/login", async (req, res) => {
  let user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Incorrect email or password.");
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("Incorrect email or password.");
  }
  const token = jwt.sign({ _id: user._id }, "secret123", { expiresIn: "30d" });
  res.send(token);
});

// app.post("/posts/create", postValidation, (req: Request, res: Response) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json(errors.array());
//   }
//   res.json({
//     success: true,
//   });
// });
