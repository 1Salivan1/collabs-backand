import mongoose from "mongoose";
import express from "express";

import { userValidation, postValidation } from "./validations/validations";
import { checkAuth } from "./middleware/checkAuth";
import { register, login, getMe } from "./controllers/UserController";
import {
  createProject,
  deleteProject,
  updateProject,
} from "./controllers/ProjectController";

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

app.post("/auth/registration", userValidation, register);
app.post("/auth/login", login);
app.get("/auth/me", checkAuth, getMe);

app.post("/projects/create", checkAuth, postValidation, createProject);
app.delete("/projects/:id", checkAuth, deleteProject);
app.patch("/projects/:id", checkAuth, postValidation, updateProject);
