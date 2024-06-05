import { body } from "express-validator";

export const userValidation = [
  body("username", "Имя должно быть не менее 2 символов").isString().isLength({
    min: 2,
    max: 200,
  }),
  body("email", "Почта не валидна").isEmail().isLength({ min: 3, max: 200 }),
  body("password", "Пароль должен быть минимум 5 символов").isLength({
    min: 5,
    max: 3000,
  }),
  body("tags", "Укажите теги").isArray({ min: 1 }),
  body("about", "Укажите подробную информацию о себе").isString().isLength({
    min: 20,
    max: 2000,
  }),
  body("socials").custom((value, { req }) => {
    if (!req.body.telegram && !req.body.linkedin && !req.body.discord) {
      throw new Error("Укажите хотя бы один контакт для связи");
    }
    return true;
  }),
  body("telegram", "Ссылка на Telegram не валидна")
    .if((value, { req }) => req.body.telegram !== "")
    .isURL()
    .optional(),
  body("linkedin", "Ссылка на Linkedin не валидна")
    .if((value, { req }) => req.body.linkedin !== "")
    .isURL()
    .optional(),
  body("avatarUrl", "Ссылка на аватар не валидна").isURL().optional(),
];

export const postValidation = [
  body("title", "Заголовок должен быть больше 5 символов").isString().isLength({
    min: 5,
    max: 100,
  }),
  body("tags", "Укажите теги").isArray({ min: 1 }),
  body("text", "Укажите подробную информацию о вашем проекте")
    .isString()
    .isLength({
      min: 20,
      max: 5000,
    }),
  body("needs", "Укажите кто вам нужен").isArray({ min: 1 }),
  body("socials").custom((value, { req }) => {
    if (!req.body.telegram && !req.body.linkedin && !req.body.discord) {
      throw new Error("Укажите хотя бы один контакт для связи");
    }
    return true;
  }),
  body("telegram", "Ссылка на Telegram не валидна")
    .if((value, { req }) => req.body.telegram !== "")
    .isURL()
    .optional(),
  body("linkedin", "Ссылка на Linkedin не валидна")
    .if((value, { req }) => req.body.linkedin !== "")
    .isURL()
    .optional(),
];
