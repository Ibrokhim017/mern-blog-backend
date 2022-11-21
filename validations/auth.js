import { body } from "express-validator";

export const registerValidation = [
	body("email", "Pochta xato kitirilgan").isEmail(),
	body("password", "Parol 5ta simvoldan kam bo'lmasin").isLength({ min: 5 }),
	body("fullName", "Isim 3ta simvoldan kam bo'lmasin").isLength({ min: 3 }),
	body("avatarUrl", "Fayl url xato kiritilgan").optional().isURL(),
];
