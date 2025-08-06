import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SellerNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-700 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link to="/seller/dashboard" className="font-bold text-xl">
            UniMarket Seller
          </Link>
          <Link to="/seller/orders">Orders</Link>
          <Link to="/seller/products">Products</Link>
          <Link to="/seller/wallet">Wallet</Link>
          <Link to="/seller/add-product">Add Product</Link>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
