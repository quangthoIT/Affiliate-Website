import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/users/register", formData);
      toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Đăng ký thất bại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <Card className="w-full max-w-md shadow-lg p-6">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-semibold text-gray-900">
            Tạo tài khoản
          </CardTitle>
          <CardDescription className="text-center">
            Tạo tài khoản để khám phá các sản phẩm chất lượng và ưu đãi tốt nhất
            dành riêng cho bạn.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Họ và tên</Label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Nguyễn Văn A"
                autoComplete="name"
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="nguyenvana@example.com"
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label>Mật khẩu</Label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                variant="default"
                disabled={loading}
                className="cursor-pointer"
              >
                {loading ? "Đang xử lý..." : "Đăng ký"}
              </Button>
            </div>
            <p className="text-sm text-center text-gray-500">
              Bạn đã có tài khoản?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Đăng nhập
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
