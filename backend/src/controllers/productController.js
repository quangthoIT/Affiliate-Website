import express from "express";
import Product from "../models/productModel.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, affLink, category, isHot } =
      req.body;
    // Tạo instance mới từ Model
    const product = new Product({
      name,
      description,
      price,
      image,
      affLink,
      category,
      isHot,
    });
    const savedProduct = await product.save();
    res.status(201).json({ success: true, data: savedProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res
      .status(200)
      .json({ success: true, count: products.length, data: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
