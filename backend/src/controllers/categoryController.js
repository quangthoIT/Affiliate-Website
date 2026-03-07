import Category from "../models/categoryModel.js";

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách danh mục", error: error.message });
  }
};

// @desc    Create a new category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;

    const categoryExists = await Category.findOne({ slug });
    if (categoryExists) {
      return res.status(400).json({ message: "Slug danh mục đã tồn tại" });
    }

    const category = await Category.create({ name, slug });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi tạo danh mục", error: error.message });
  }
};

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
export const updateCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;
    const category = await Category.findById(req.params.id);

    if (category) {
      category.name = name || category.name;
      category.slug = slug || category.slug;

      const updatedCategory = await category.save();
      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: "Không tìm thấy danh mục" });
    }
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi cập nhật danh mục", error: error.message });
  }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (category) {
      await Category.deleteOne({ _id: req.params.id });
      res.json({ message: "Đã xóa danh mục thành công" });
    } else {
      res.status(404).json({ message: "Không tìm thấy danh mục" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa danh mục", error: error.message });
  }
};
