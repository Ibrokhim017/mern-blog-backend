import { body } from "express-validator";

export const registerValidation = [
	body("email", "Email xato kiritilgan").isEmail(),
	body("password", "Parol 5ta simvoldan ko'p bo'lishi kerak").isLength({ min: 5 }),
	body("fullName", "fullName 3ta simvoldan ko'p bo'lishi kerak").isLength({ min: 3 }),
	body("avatarUrl", "Rasm url to'g'ri kiritilmadi").optional().isURL()
];
