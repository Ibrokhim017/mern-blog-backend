import { body } from "express-validator";

export const loginValidation = [
	body("email", "Неверный формат почты").isEmail(),
	body("password", "Парол должен быть минимум 5 символов").isLength({ min: 5 }),
];

export const registerValidation = [
	body("email", "Неверный формат почты").isEmail(),
	body("password", "Парол должен быть минимум 5 символов").isLength({ min: 5 }),
	body("fullName", "Укажите имя").isLength({ min: 3 }),
	body("avatarUrl", "Неверная ссылка на аватарку").optional().isURL(),
];

export const postValidation = [
	body("title", "Ввыдите заголовок статьи").isLength({ min: 3 }).isString(),
	body("text", "Ввыдите текст статьи").isLength({ min: 3 }).isString(),
	body("tags", "Неверный формат тегов (укажите массив)").optional().isArray(),
	body("imageUrl", "Неверная ссылка на изображение").optional().isURL(),
];
