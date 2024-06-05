import express from "express";
import cors from "cors";

import { userValidation, postValidation } from "./validations/validations";
import { checkAuth } from "./middleware/checkAuth";
import { register, login, getMe } from "./controllers/UserController";
import {
  createProject,
  deleteProject,
  updateProject,
  getProjects,
  getOneProject,
  getMyProject,
} from "./controllers/ProjectController";
import pool from "./db";
import { getAllUsers } from "./controllers/OtherUsersController";

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

app.get("/projects/:id", getOneProject);
app.get("/projects", getProjects);
app.get("/my_projects", checkAuth, getMyProject);
app.post("/projects", checkAuth, postValidation, createProject);
app.delete("/projects/:id", checkAuth, deleteProject);
app.patch("/projects/:id", checkAuth, postValidation, updateProject);

app.get("/users", getAllUsers);
