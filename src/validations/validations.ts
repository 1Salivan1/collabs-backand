import { body } from "express-validator";

export const postValidation = [
  body("title", "Заголовок должен быть больше 5 символов").isLength({ min: 5 }),
  body("tags", "Укажите теги").isLength({ min: 1 }),
  body("text", "Укажите подробную информацию о вашем проекте").isLength({
    min: 50,
  }),
  body("needs", "Укажите кто вам нужен").isLength({ min: 1 }),
  body("socials", "Укажите контакты для связи с вами").isLength({ min: 1 }),
];

export const userValidation = [
  body("username", "Имя должно быть не менее 3 символов").isLength({
    min: 3,
    max: 200,
  }),
  body("email", "Почта не валидна").isEmail().isLength({ min: 3, max: 200 }),
  body("password", "Пароль должен быть минимум 5 символов").isLength({
    min: 5,
  }),
  body("git", "Ссылка не валидна").isURL().optional(),
  body("tags", "Укажите теги").isLength({ min: 1 }),
  body("about", "Укажите подробную информацию о себе").isLength({
    min: 20,
    max: 1000,
  }),
  body("socials", "Укажите контакты для связи с вами").isLength({ min: 1 }),
];
