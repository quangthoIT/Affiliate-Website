import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Vui lòng nhập tên sản phẩm"] },
    description: {
      type: String,
    },
    price: { type: Number, required: [true, "Vui lòng nhập giá sản phẩm"] },
    image: {
      type: String,
      required: [true, "Vui lòng cung cấp hình ảnh sản phẩm"],
    },
    affLink: {
      type: String,
      required: [true, "Vui lòng cung cấp liên kết tiếp thị liên kết"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Vui lòng cung cấp danh mục sản phẩm"],
    },
    isHot: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
