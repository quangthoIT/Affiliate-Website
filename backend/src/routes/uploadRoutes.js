import express from "express";
import { upload } from "../config/cloudinary.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const uploadRouter = express.Router();

uploadRouter.post("/", protect, admin, upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  res.status(200).json({
    message: "File uploaded successfully.",
    url: req.file.path,
  });
});

export default uploadRouter;
