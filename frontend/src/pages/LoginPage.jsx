import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      // Lưu token vào localStorage để sử dụng cho các yêu cầu sau này
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("Đăng nhập thành công!");
      navigate("/"); // Điều hướng về trang chủ sau khi đăng nhập thành công
      window.location.reload(); // Tải lại trang để cập nhật trạng thái đăng nhập
    } catch (error) {
      toast.error(error.response?.data?.message || "Đăng nhập thất bại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <Card className="w-full max-w-md shadow-lg p-6">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-semibold text-gray-900">
            Đăng nhập ngay
          </CardTitle>
          <CardDescription className="text-center">
            Chào mừng trở lại! Đăng nhập để khám phá thêm nhiều sản phẩm hấp
            dẫn.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Mật khẩu</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <Button type="submit" variant="default" disabled={loading}>
                {loading ? "Đang xử lý..." : "Đăng nhập"}
              </Button>
            </div>
            <p className="text-sm text-center text-gray-500">
              Bạn chưa có tài khoản?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Đăng ký
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
