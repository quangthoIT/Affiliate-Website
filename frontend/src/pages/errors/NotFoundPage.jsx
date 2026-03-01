import React from "react";
import Lottie from "lottie-react";
import lonely404 from "@/assets/Lonely 404.json";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Lottie animationData={lonely404} loop={true} className="w-125" />
      <h1 className="text-xl font-semibold">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
      </h1>
      <Button variant="default" asChild className="mt-4">
        <Link to="/">Quay về trang chủ</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
