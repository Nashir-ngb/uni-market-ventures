// src/layouts/SellerLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
import SellerNavbar from "../components/SellerNavbar";

export default function SellerLayout() {
  return (
    <>
      {/* Seller Navigation Bar */}
      <SellerNavbar />

      {/* Page Content */}
      <div className="p-6 max-w-7xl mx-auto">
        <Outlet />
      </div>
    </>
  );
}
