import React from "react";
import { BaggageClaim } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { toast } from "sonner";

const Header = () => {
  const navigate =useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    toast.success("Đăng xuất thành công!");
    navigate("/login");
    window.location.reload();
  };

  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold">
          <BaggageClaim size={32} />
          AffiliateHub
        </Link>

        <nav className="flex items-center gap-8">
          <Link to="/featured" className="font-medium hover:text-gray-300">
            Sản phẩm nổi bật
          </Link>
          <Link to="/products" className="font-medium hover:text-gray-300">
            Tất cả sản phẩm
          </Link>
          {userInfo?.isAdmin && (
            <Link to="/admin" className="font-medium hover:text-gray-300">
              Quản lý sản phẩm
            </Link>
          )}

          {userInfo ? (
            <div className="flex items-center gap-4">
              <span className="font-medium italic">Chào, {userInfo.name}</span>
              <Button
                onClick={logoutHandler}
                variant="outline"
                className="font-medium text-gray-900 py-2 px-3"
              >
                Đăng xuất
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              className="font-medium text-gray-900 py-2 px-3"
              asChild
            >
              <Link to="/login">Đăng nhập</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
