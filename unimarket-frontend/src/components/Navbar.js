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
    window.location.reload(); // Optional: force refresh after logout
  };

  const renderCommonLinks = (isMobile = false) => (
    <>
      <Link to="/products" onClick={() => isMobile && setMenuOpen(false)}>Products</Link>
      <Link to="/about" onClick={() => isMobile && setMenuOpen(false)}>About Us</Link>
      <Link to="/chat" onClick={() => isMobile && setMenuOpen(false)}>Chat</Link>
    </>
  );

  const renderBuyerLinks = (isMobile = false) => (
    <>
      <Link to="/cart" onClick={() => isMobile && setMenuOpen(false)}>Cart</Link>
      <Link to="/orders" onClick={() => isMobile && setMenuOpen(false)}>Orders</Link>
      <Link to="/appointments" onClick={() => isMobile && setMenuOpen(false)}>Appointments</Link>
    </>
  );

  const renderSellerLinks = (isMobile = false) => (
    <>
      <Link to="/seller" onClick={() => isMobile && setMenuOpen(false)}>Seller</Link>
      <Link to="/seller/orders" onClick={() => isMobile && setMenuOpen(false)}>Seller Orders</Link>
      <Link to="/seller/products" onClick={() => isMobile && setMenuOpen(false)}>Seller Products</Link>
    </>
  );

  const renderAuthLinks = (isMobile = false) => (
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
  );

  const renderGuestLinks = (isMobile = false) => (
    <>
      <Link to="/login" onClick={() => isMobile && setMenuOpen(false)}>Login</Link>
      <Link to="/register" onClick={() => isMobile && setMenuOpen(false)}>Register</Link>
    </>
  );

  const isBuyer = user.isLoggedIn && user.role !== 'seller';
  const isSeller = user.isLoggedIn && user.role === 'seller';

  const renderLinks = (isMobile = false) => (
    <>
      {renderCommonLinks(isMobile)}

      {isBuyer && renderBuyerLinks(isMobile)}
      {isSeller && renderSellerLinks(isMobile)}

      {user.isLoggedIn ? renderAuthLinks(isMobile) : renderGuestLinks(isMobile)}
    </>
  );

  return (
    <nav className="sticky top-0 bg-gradient-to-r from-[#003366] to-[#005EB8] text-white shadow z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/logo.jpg" alt="Logo" className="h-8 w-auto mr-2 rounded" />
          <span className="font-bold text-lg">UniMarket</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-3 items-center text-sm">
          {renderLinks()}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-xl">☰</button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col px-4 pb-3 space-y-2 bg-gradient-to-r from-[#003366] to-[#005EB8] text-sm">
          {renderLinks(true)}
        </div>
      )}
    </nav>
  );
}
