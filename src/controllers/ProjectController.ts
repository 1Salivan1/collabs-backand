import mongoose from "mongoose";
import { Request, Response } from "express";
import { AuthRequest } from "../types/types";
import ProjectModel from "../models/project";
import UserModel from "../models/user";

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const allProjects = await ProjectModel.find();
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
    const project = await ProjectModel.findById(req.params.id);
    res.json({
      project: project,
    });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Проект не найден",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Произошла ошибка при получении проекта",
    });
  }
};

export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const { title, tags, text, needs, socials } = req.body;
    const doc = new ProjectModel({
      title,
      tags,
      text,
      needs,
      socials,
      user: req.userId,
    });

    const project = await doc.save();

    await UserModel.findByIdAndUpdate(
      req.userId,
      { $push: { projects: project._id } },
      { new: true }
    );

    res.json(project);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать статью",
    });
  }
};

export const deleteProject = async (req: AuthRequest, res: Response) => {
  try {
    const deletedProject = await ProjectModel.findByIdAndDelete(req.params.id);
    if (deletedProject) {
      console.log(req.userId);
      await UserModel.findByIdAndUpdate(
        req.userId,
        { $pull: { projects: req.params.id } },
        { new: true }
      );

      res.json({
        success: true,
        message: "Проект успешно удален",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Проект не найден",
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
    const updatedPost = await ProjectModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          tags: req.body.tags,
          text: req.body.text,
          needs: req.body.needs,
          socials: req.body.socials,
        },
      },
      { new: true }
    );
    if (updatedPost) {
      res.json({
        success: true,
        post: updatedPost,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Пост не найден",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Произошла ошибка при обновлении поста",
    });
  }
};
