import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_CONNECTION_STRING);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Thoát khỏi ứng dụng nếu không thể kết nối đến MongoDB
  }
};
