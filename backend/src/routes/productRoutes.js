import express from "express";
import {
  createProduct,
  getProducts,
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const productRouter = express.Router();

// Route để tạo sản phẩm mới
productRouter.post("/", protect, admin, createProduct);
// Route để lấy danh sách sản phẩm
productRouter.get("/", getProducts);

export default productRouter;
