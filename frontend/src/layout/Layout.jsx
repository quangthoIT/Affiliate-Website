import React from "react";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto p-6 grow">
        <Outlet />
      </main>
      <footer className="bg-gray-900 text-gray-400 text-sm italic text-center py-2">
        Copyright &copy; 2026 Affiliate Website by Nguyen Quang Tho
      </footer>
    </div>
  );
};

export default Layout;
