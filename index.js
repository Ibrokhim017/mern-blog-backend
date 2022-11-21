import express from "express";
// import jwt from "jsonwebtoken";
// import mongoose from "mongoose";
import { validationResult } from "express-validator";

import { registerValidation } from "./validations/auth.js";

// mongoose
//   .connect(
//     "mongodb+srv://admin:adminqwerty@cluster0.glxeezl.mongodb.net/?retryWrites=true&w=majority"
//   )
//   .then(() => console.log("DB run"))
//   .catch((err) => console.log("DB err =>", err));

const app = express();

app.use(express.json());

app.post("/auth/register", registerValidation, (req, res) => {
	console.log("req >>> ", req.body);
	// ,
	const errors = validationResult(req);
	console.log("errors", errors);

	if (!errors.isEmpty()) {
		return res.status(400).json(errors.array());
	}

	res.json({
		req: req.body,
		success: true
	});
});

app.listen(4444, (err) => {
	if (err) {
		return console.log(err);
	}
	console.log("Server runnig");
});
