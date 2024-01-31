import express from "express";
import cors from "cors";

import { userValidation, postValidation } from "./validations/validations";
import { checkAuth } from "./middleware/checkAuth";
import { register, login, getMe } from "./controllers/UserController";
import {
  createProject,
  deleteProject,
  updateProject,
  getAllProjects,
  getProject,
} from "./controllers/ProjectController";
import pool from "./db";

const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
    pool.connect().then(() => {
      console.log("Connected to PostgreSQL database!");
    });
  } catch (error) {
    console.log(error);
  }
};

start();

app.post("/auth/registration", userValidation, register);
app.post("/auth/login", login);
app.get("/auth/me", checkAuth, getMe);

app.get("/projects/:id", getProject);
app.get("/projects", getAllProjects);
app.post("/projects", checkAuth, postValidation, createProject);
app.delete("/projects/:id", checkAuth, deleteProject);
app.patch("/projects/:id", checkAuth, postValidation, updateProject);
