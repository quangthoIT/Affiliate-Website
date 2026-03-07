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
    const { category } = req.query;
    const filter = category ? { category } : {};
    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .populate("category");
    res
      .status(200)
      .json({ success: true, count: products.length, data: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (product) {
      res.status(200).json({ success: true, data: product });
    } else {
      res.status(404).json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }, // Trả về object sau khi đã cập nhật
    );
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json({ success: true, message: "Product deleted" });
    } else {
      res.status(404).json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
