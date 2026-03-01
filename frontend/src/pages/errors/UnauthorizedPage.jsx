import React from "react";
import security_icon from "@/assets/security-icon.json";
import Lottie from "lottie-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Lottie animationData={security_icon} loop={true} className="w-125" />
      <h1 className="text-xl font-semibold">
        Bạn không có quyền truy cập vào trang này. Vui lòng đăng nhập bằng tài
        khoản phù hợp.
      </h1>
      <div className="flex gap-4 mt-4">
        <Button variant="outline" asChild>
          <Link to="/login">Đăng nhập</Link>
        </Button>

        <Button variant="default" asChild>
          <Link to="/">Trang chủ</Link>
        </Button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
