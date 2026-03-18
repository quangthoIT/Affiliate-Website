import React from "react";
import { useSearchParams } from "react-router-dom";
import ProductManagement from "./ProductManagement";
import Analytics from "./Analytics";
import UserManagement from "./UserManagement";
import CategoriesManagement from "./CategoriesManagement";
import BannerManagement from "./BannerManagement";

const AdminPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "product";

  const renderModule = () => {
    switch (activeTab) {
      case "products":
        return <ProductManagement />;
      case "users":
        return <UserManagement />;
      case "analytics":
        return <Analytics />;
      case "categories":
        return <CategoriesManagement />;
      case "banners":
        return <BannerManagement />;
      default:
        return <ProductManagement />;
    }
  };

  return (
    <div className="min-h-screen container my-2 md:my-6">
      <div className="rounded-xl shadow-sm border p-6 min-h-150">
        {renderModule()}
      </div>
    </div>
  );
};

export default AdminPage;
