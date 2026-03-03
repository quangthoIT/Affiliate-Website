import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import FeaturedPage from "./pages/FeaturedPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import AdminPage from "./pages/admin/AdminPage";
import AdminRoute from "./components/AdminRoute";
import NotFoundPage from "./pages/errors/NotFoundPage";
import UnauthorizedPage from "./pages/errors/UnauthorizedPage";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster richColors closeButton position="top-right" duration={1500} />

      <Routes>
        {/* Nhóm các trang không sử dụng giao diện chung */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Nhóm các trang sử dụng giao diện chung (Header, Footer) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="featured" element={<FeaturedPage />} />
          {/* Nhóm các trang bảo vệ bởi quyền Admin */}
          <Route element={<AdminRoute />}>
            <Route path="admin" element={<AdminPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
