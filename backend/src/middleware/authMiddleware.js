import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  let token;

  // Kiểm tra token trong header Authorization và định dạng Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Lấy token sau "Bearer}
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Giải mã token để lấy thông tin người dùng

      // Lấy thông tin người dùng từ database và gán vào req.user, loại bỏ trường password
      req.user = await User.findById(decoded.id).select("-password"); // Tìm người dùng trong database và gán vào req.user, loại bỏ trường password
    } catch (error) {
      return res.status(401).json({ message: "Không xác thực được token" });
    }
  }
  if (!token) {
    return res
      .status(401)
      .json({ message: "Không có token, xác thực thất bại" });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // Nếu người dùng là admin, tiếp tục xử lý yêu cầu
  } else {
    res.status(403).json({ message: "Yêu cầu bị cấm, chỉ dành cho admin" }); // Nếu không phải admin, trả về lỗi 403 Forbidden
  }
};
