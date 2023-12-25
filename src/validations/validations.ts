import { body } from "express-validator";

export const userValidation = [
  body("username", "Имя должно быть не менее 3 символов").isString().isLength({
    min: 3,
    max: 200,
  }),
  body("email", "Почта не валидна").isEmail().isLength({ min: 3, max: 200 }),
  body("password", "Пароль должен быть минимум 5 символов").isLength({
    min: 5,
    max: 3000,
  }),
  body("git", "Ссылка не валидна").isURL().optional(),
  body("tags", "Укажите теги").isLength({ min: 1 }),
  body("about", "Укажите подробную информацию о себе").isString().isLength({
    min: 20,
    max: 2000,
  }),
  body("socials", "Укажите контакты для связи с вами").isLength({ min: 1 }),
  body("avatarUrl", "Ссылка на аватар не валидна").isURL().optional(),
];

export const postValidation = [
  body("title", "Заголовок должен быть больше 5 символов").isString().isLength({
    min: 5,
    max: 100,
  }),
  body("tags", "Укажите теги").isLength({ min: 1 }),
  body("text", "Укажите подробную информацию о вашем проекте")
    .isString()
    .isLength({
      min: 20,
      max: 3000,
    }),
  body("needs", "Укажите кто вам нужен").isLength({ min: 1 }),
  body("socials", "Укажите контакты для связи с вами").isLength({ min: 1 }),
];
