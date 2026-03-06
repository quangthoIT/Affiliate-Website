import express from "express";
import {
  deleteUser,
  getUsers,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.get("/", protect, admin, getUsers);
userRouter.put("/:id", protect, admin, updateUser);
userRouter.delete("/:id", protect, admin, deleteUser);

export default userRouter;
