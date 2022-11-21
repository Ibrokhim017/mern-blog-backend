import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { validationResult } from "express-validator";

// custom files
import UserModel from "./models/User.js";
import { registerValidation } from "./validations/auth.js";

mongoose
	.connect("mongodb+srv://admin:adminqwerty@cluster0.glxeezl.mongodb.net/?retryWrites=true&w=majority")
	.then(() => console.log("DB run"))
	.catch((err) => console.log("DB err =>", err));

const app = express();

app.use(express.json());

app.post("/auth/register", registerValidation, async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json(errors.array());
	}

	const password = req.body.password;
	const salt = await bcrypt.genSalt(10);
	const passwordHash = await bcrypt.hash(password, salt);

	const doc = UserModel({
		email: req.body.email,
		fullName: req.body.fullName,
		avatarUrl: req.body.avatarUrl,
		passwordHash: passwordHash,
	});

	const user = await doc.save();

	res.json({
		req: req.body,
		success: true,
	});
});

app.listen(4444, (err) => {
	if (err) {
		return console.log(err);
	}
	console.log("Server runnig");
});
