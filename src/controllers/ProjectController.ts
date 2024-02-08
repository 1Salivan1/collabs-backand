import { Request, Response } from "express";
import { AuthRequest } from "../types/types";
import pool from "../db";

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const allProjects = await pool.query(`SELECT * FROM projects`);
    res.json({
      projects: allProjects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Произошла ошибка при получении проектов",
    });
  }
};

export const getProject = async (req: Request, res: Response) => {
  try {
    const project = await pool.query(`SELECT * FROM projects WHERE id = $1`, [
      req.params.id,
    ]);
    if (project.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Проект не найден",
      });
    }
    res.json({
      project: project.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Произошла ошибка при получении проекта",
    });
  }
};

export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const query = `INSERT INTO projects (title, tags, text, needs, socials, creator_id) VALUES ($1, $2, $3, $4, $5, $6)`;
    const values = [
      req.body.title,
      req.body.tags,
      req.body.text,
      req.body.needs,
      req.body.socials,
      req.userId,
    ];

    const result = await pool.query(query, values);

    res.json({ success: true, message: "Проект успешно создан" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать статью",
    });
  }
};

export const deleteProject = async (req: AuthRequest, res: Response) => {
  try {
    const deletedProject = await pool.query(
      `DELETE FROM projects WHERE id = $1 RETURNING *`,
      [req.params.id]
    );

    if (deletedProject.rows.length === 0) {
      res.json({ success: false, message: "Проект не найден" });
    } else {
      res.json({
        success: true,
        message: "Проект успешно удален",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Произошла ошибка при удалении проекта",
    });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const query =
      "UPDATE projects SET title = $1, tags = $2, text = $3, needs = $4, socials = $5 WHERE id = $6 RETURNING *";
    const values = [
      req.body.title,
      req.body.tags,
      req.body.text,
      req.body.needs,
      req.body.socials,
      req.params.id,
    ];

    const result = await pool.query(query, values);

    if (result.rowCount > 0) {
      const updatedProject = result.rows[0];
      res.json({
        success: true,
        project: updatedProject,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Проект не найден",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Произошла ошибка при обновлении проекта",
    });
  }
};

export const getMyProject = async (req: AuthRequest, res: Response) => {
  try {
    const query = await pool.query(
      `SELECT * FROM projects WHERE creator_id = $1`,
      [req.userId]
    );

    if (query.rowCount === 0) {
      return res.status(404).json({
        status: "false",
        message: "Проекты не найдены",
      });
    }

    return res.status(200).json({
      projects: query.rows,
    });
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    return res.status(500).json({
      status: "error",
      message: "Внутренняя ошибка сервера",
    });
  }
};
