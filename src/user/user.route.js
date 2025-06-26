import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "./user.schema.js";
import { authMiddleware } from "../middleware/auth.js";
const router = express.Router();

//Validating token
router.get("/:userid", authMiddleware, async (req, res, next) => {
  const { userId } = req;
  const userIdParams = req.params?.userid;

  if (userId !== userIdParams) {
    const error = new Error("Unauthorized access");
    error.statusCode = 403;
    next(error);
    return;
  }
  try {
    const user = await UserModel.findOne(
      { _id: userId },
      { password: false, _v: false }
    );
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// User Login
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const error = new Error("Invalid credentials");
    error.statusCode = 400;
    next(error);
    return;
  }

  const user = await UserModel.findOne({ email: email });

  if (!user) {
    const error = new Error("User does not exist");
    error.statusCode = 401;
    next(error);
    return;
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    const error = new Error("Invalid Credentials");
    error.statusCode = 400;
    next(error);
    return;
  }
  console.log("userid while login", user._id);
  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
  res.status(200).json({
    token: token,
  });
});

//user creation
router.post("/", async (req, res, next) => {
  console.log("body", req.body);
  const { name, email, password } = req.body;
  //Validate fields
  if (!name || !email || !password) {
    const err = new Error("All field are required");
    err.statusCode = 400;
    next(err);
  }

  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const user = await UserModel.create({
      name: name,
      email: email,
      password: hashPassword,
    });

    res.status(201).json({ id: user._id });
  } catch (error) {
    next(error);
  }
});

export default router;
