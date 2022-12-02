import multer from "multer";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// custom files
import { handleValidationErrors, checkAuth } from "./utils/index.js";
import { PostController, UserController } from "./controllers/index.js";
import { postCreateValidation, loginValidation, registerValidation } from "./validations/index.js";

// connected mongoose
mongoose
	.connect("mongodb+srv://admin:7WmcJUs4xbpM0A8p@cluster.1nhr8qr.mongodb.net/?retryWrites=true&w=majority")
	.then(() => console.log("DB run"))
	.catch((err) => console.log("DB err =>", err));

const app = express();

// connected storage with multer
const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, "uploads");
	},
	filename: (_, file, cb) => {
		cb(null, file.orginalname);
	},
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// Start of Routes ==================================================================

// Auth
app.post("/auth/login", loginValidation, handleValidationErrors, UserController.login);
app.post("/auth/register", registerValidation, handleValidationErrors, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

// files
app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
	res.json({
		url: `/uploads/${req.file.originalname}`,
	});
});

// Post
app.get("/post", PostController.getAll);
app.get("/post/:id", PostController.getOne);
app.post("/post", checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.patch("/post/:id", checkAuth, postCreateValidation, handleValidationErrors, PostController.update);
app.delete("/post/:id", checkAuth, PostController.remove);

// End of Routes ==================================================================

app.listen(4444, (err) => {
	if (err) {
		return console.log(err);
	}
	console.log("Server runnig");
});
