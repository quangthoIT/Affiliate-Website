import React from "react";
import { BaggageClaim } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold">
          <BaggageClaim size={32} />
          AffiliateHub
        </Link>

        <nav>
          <Link to="/featured" className="font-medium mr-6 hover:text-gray-300">
            Sản phẩm nổi bật
          </Link>
          <Link
            to="/products"
            className="font-medium mr-16 hover:text-gray-300"
          >
            Tất cả sản phẩm
          </Link>

          <Link
            to="/login"
            className="font-semibold border border-gray-400 rounded px-3 py-2 hover:bg-gray-800 hover:border-gray-300"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
