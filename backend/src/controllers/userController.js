import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm user theo email
    const user = await User.findOne({ email });

    // Kiểm tra user tồn tại và mật khẩu đúng mã hóa hay chưa
    if (user && (await bcrypt.compare(password, user.password))) {
      // Tạo JWT token
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token,
      });
    } else {
      res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Kiểm tra người dùng đã tồn tại chưa
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email đã được sử dụng" });
    }

    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Tạo người dùng mới
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (typeof req.body.isAdmin === "boolean") {
        user.isAdmin = req.body.isAdmin;
      }
      const updatedUser = await user.save();
      res.status(200).json({ success: true, data: updatedUser });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user._id.toString() === req.user._id.toString()) {
        return res.status(400).json({ message: "Bạn không thể tự xóa chính mình" });
      }
      await User.findByIdAndDelete(req.params.id);
      res.json({ success: true, message: "Xóa người dùng thành công" });
    } else {
      res.status(404).json({ success: false, message: "Không tìm thấy người dùng" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
