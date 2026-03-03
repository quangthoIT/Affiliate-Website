import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const productRouter = express.Router();

// Route để tạo sản phẩm mới
productRouter.post("/", protect, admin, createProduct);
// Route để lấy danh sách sản phẩm
productRouter.get("/", getProducts);
// Route để xóa sản phẩm
productRouter.delete("/:id", protect, admin, deleteProduct);
// Route để cập nhật thông tin sản phẩm
productRouter.put("/:id", protect, admin, updateProduct);

export default productRouter;
