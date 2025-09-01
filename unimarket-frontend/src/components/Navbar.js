import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser({ isLoggedIn: false, role: null, username: null });
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    navigate('/login');
    window.location.reload(); // Ensures context resets completely
  };

  const isBuyer = user.isLoggedIn && user.role !== 'seller';
  const isSeller = user.isLoggedIn && user.role === 'seller';

  const renderLinks = (isMobile = false) => (
    <>
      <Link to="/products" onClick={() => isMobile && setMenuOpen(false)}>Products</Link>
      <Link to="/about" onClick={() => isMobile && setMenuOpen(false)}>About Us</Link>
      <Link to="/chat" onClick={() => isMobile && setMenuOpen(false)}>Chat</Link>

      {isBuyer && (
        <>
          <Link to="/cart" onClick={() => isMobile && setMenuOpen(false)}>Cart</Link>
          <Link to="/orders" onClick={() => isMobile && setMenuOpen(false)}>Orders</Link>
          <Link to="/appointments" onClick={() => isMobile && setMenuOpen(false)}>Appointments</Link>
        </>
      )}

      {isSeller && (
        <>
          <Link to="/seller" onClick={() => isMobile && setMenuOpen(false)}>Seller</Link>
          <Link to="/seller/orders" onClick={() => isMobile && setMenuOpen(false)}>Seller Orders</Link>
          <Link to="/seller/products" onClick={() => isMobile && setMenuOpen(false)}>Seller Products</Link>
        </>
      )}

      {user.isLoggedIn ? (
        <>
          <Link to="/profile" onClick={() => isMobile && setMenuOpen(false)}>Profile</Link>
          <Link to="/settings" onClick={() => isMobile && setMenuOpen(false)}>Settings</Link>
          <button
            onClick={() => { handleLogout(); isMobile && setMenuOpen(false); }}
            className="bg-pink-500 px-2 py-1 rounded hover:bg-pink-600"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" onClick={() => isMobile && setMenuOpen(false)}>Login</Link>
          <Link to="/register" onClick={() => isMobile && setMenuOpen(false)}>Register</Link>
        </>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 bg-gradient-to-r from-[#003366] to-[#005EB8] text-white shadow z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/logo.jpg" alt="Logo" className="h-8 w-auto mr-2 rounded" />
          <span className="font-bold text-lg">UniMarket</span>
        </Link>
        <div className="hidden md:flex space-x-3 items-center text-sm">
          {renderLinks()}
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-xl">☰</button>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col px-4 pb-3 space-y-2 bg-gradient-to-r from-[#003366] to-[#005EB8] text-sm">
          {renderLinks(true)}
        </div>
      )}
    </nav>
  );
}
