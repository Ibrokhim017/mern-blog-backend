import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://admin:adminqwerty@cluster0.glxeezl.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB run"))
  .catch((err) => console.log("DB err =>", err));

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world123");
});

app.post("/auth/login", (req, res) => {
  console.log(req.body);

  const token = jwt.sign(
    {
      email: req.body.email,
      fullname: req.body.fullname,
    },
    "keyString"
  );

  res.json({ success: true, token });
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server runnig");
});
