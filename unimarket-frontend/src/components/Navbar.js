// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ isLoggedIn, role, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 bg-gradient-to-r from-[#003366] to-[#005EB8] text-white shadow z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.jpg" alt="Logo" className="h-8 w-auto mr-2 rounded" />
          <span className="font-bold text-lg">UniMarket</span>
        </div>

        <div className="hidden md:flex space-x-3 items-center text-sm">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          {isLoggedIn && (
            <>
              <Link to="/cart">Cart</Link>
              <Link to="/orders">Orders</Link>
              <Link to="/appointments">Appointments</Link>
              <Link to="/notifications">Notifications</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/settings">Settings</Link>
              <Link to="/add-product">Add Product</Link>
              <Link to="/chat">Chat</Link>
            </>
          )}
          {isLoggedIn && role === 'seller' && (
            <>
              <Link to="/seller">Seller</Link>
              <Link to="/seller/orders">Seller Orders</Link>
              <Link to="/seller/products">Seller Products</Link>
            </>
          )}
          {!isLoggedIn && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
          {isLoggedIn && (
            <button onClick={onLogout} className="bg-pink-500 px-2 py-1 rounded hover:bg-pink-600">Logout</button>
          )}
        </div>

        {/* Mobile menu icon */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-xl">
          ☰
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden flex flex-col px-4 pb-3 space-y-2 bg-gradient-to-r from-[#003366] to-[#005EB8] text-sm">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
          {isLoggedIn && (
            <>
              <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link>
              <Link to="/orders" onClick={() => setMenuOpen(false)}>Orders</Link>
              <Link to="/appointments" onClick={() => setMenuOpen(false)}>Appointments</Link>
              <Link to="/notifications" onClick={() => setMenuOpen(false)}>Notifications</Link>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
              <Link to="/settings" onClick={() => setMenuOpen(false)}>Settings</Link>
              <Link to="/add-product" onClick={() => setMenuOpen(false)}>Add Product</Link>
              <Link to="/chat" onClick={() => setMenuOpen(false)}>Chat</Link>
            </>
          )}
          {isLoggedIn && role === 'seller' && (
            <>
              <Link to="/seller" onClick={() => setMenuOpen(false)}>Seller</Link>
              <Link to="/seller/orders" onClick={() => setMenuOpen(false)}>Seller Orders</Link>
              <Link to="/seller/products" onClick={() => setMenuOpen(false)}>Seller Products</Link>
            </>
          )}
          {!isLoggedIn && (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
          {isLoggedIn && (
            <button onClick={() => { onLogout(); setMenuOpen(false); }} className="bg-pink-500 px-2 py-1 rounded hover:bg-pink-600">
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
