import React from "react";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto p-6 grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
