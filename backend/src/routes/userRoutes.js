import express from "express";
import {
  getUsers,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.get("/", protect, admin, getUsers);

export default userRouter;
