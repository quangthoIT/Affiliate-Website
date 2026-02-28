import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import Featured from "./pages/Featured";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Toaster } from "sonner";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster richColors closeButton position="top-right" duration={1500} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/featured" element={<Featured />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
