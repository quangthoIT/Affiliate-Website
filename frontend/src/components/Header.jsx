import React from "react";
import { BaggageClaim, Menu, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Header = () => {
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    toast.success("Đăng xuất thành công!");
    navigate("/");
    window.location.reload();
  };

  const navLinks = [
    { name: "Trang chủ", path: "/" },
    { name: "Sản phẩm nổi bật", path: "/featured" },
    { name: "Tất cả sản phẩm", path: "/products" },
  ];

  return (
    <header className="bg-blue-800 text-white p-4 shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between items-center gap-2">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg lg:text-xl font-semibold shrink-0"
          >
            <BaggageClaim className="w-9 h-9 md:w-8 md:h-8" />
            <span className="hidden md:inline">AffiliateHub</span>
          </Link>

          {/* Mobile quick search bar */}
          <div className="flex-1 max-w-60 md:hidden">
            <form onSubmit={handleSearch} className="relative">
              <Search
                size={18}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-300"
              />
              <Input
                type="text"
                placeholder="Tìm kiếm sản phẩm"
                className="pl-8 text-white border-gray-300 focus-visible:ring-white placeholder:text-gray-300 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>

          <nav className="hidden md:flex items-center md:gap-4 lg:gap-8 text-sm lg:text-base">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="font-medium hover:text-gray-300"
              >
                {link.name}
              </Link>
            ))}
            {userInfo?.isAdmin && (
              <DropdownMenu>
                <DropdownMenuTrigger className="font-medium hover:text-gray-300 cursor-pointer">
                  Trung tâm quản lý
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 mt-2">
                  <DropdownMenuItem
                    className="text-sm md:text-base"
                    onClick={() => navigate("/admin?tab=products")}
                  >
                    Quản lý sản phẩm
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-sm md:text-base"
                    onClick={() => navigate("/admin?tab=categories")}
                  >
                    Quản lý danh mục
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-sm md:text-base"
                    onClick={() => navigate("/admin?tab=users")}
                  >
                    Quản lý người dùng
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-sm md:text-base"
                    onClick={() => navigate("/admin?tab=analytics")}
                  >
                    Thống kê báo cáo
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {userInfo ? (
              <div className="flex items-center md:gap-2 lg:gap-4">
                <span className="font-medium italic text-xs lg:text-sm">
                  <span className="hidden lg:inline">Xin chào, </span>
                  {userInfo.name}
                </span>
                <Button
                  onClick={logoutHandler}
                  variant="outline"
                  className="font-medium text-gray-900 py-1.5 px-2 lg:py-2 lg:px-3 text-xs lg:text-sm h-8 lg:h-10"
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

          {/* Mobile menu trigger */}
          <div className="flex md:hidden shrink-0">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="text-black h-9 w-9">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-60 bg-blue-800 text-white p-4 flex flex-col"
              >
                <div className="mt-10 flex-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="flex items-center p-2 rounded-md hover:bg-gray-100 hover:text-gray-900 mb-2"
                    >
                      {link.name}
                    </Link>
                  ))}

                  {userInfo?.isAdmin && (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="hover:bg-gray-100 hover:text-gray-900 rounded-md cursor-pointer p-2 w-full text-left">
                        Trung tâm quản lý
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-48 bg-blue-800 border-none text-white shadow-none -mt-2 hover:none">
                        <DropdownMenuItem
                          onClick={() => navigate("/admin?tab=products")}
                        >
                          Quản lý sản phẩm
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => navigate("/admin?tab=categories")}
                        >
                          Quản lý danh mục
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => navigate("/admin?tab=users")}
                        >
                          Quản lý người dùng
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => navigate("/admin?tab=analytics")}
                        >
                          Thống kê báo cáo
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>

                <div className="border-t border-gray-300 mb-2">
                  {userInfo ? (
                    <div className="mt-2">
                      <p className="text-center">
                        Xin chào,{" "}
                        <span className="font-medium italic">
                          {userInfo.name}
                        </span>
                      </p>

                      <Button
                        variant="outline"
                        onClick={logoutHandler}
                        className="w-full text-gray-900 mt-2"
                      >
                        Đăng xuất
                      </Button>
                    </div>
                  ) : (
                    <Button
                      asChild
                      variant="outline"
                      className="w-full text-gray-900 mt-4"
                    >
                      <Link to="/login">Đăng nhập</Link>
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
