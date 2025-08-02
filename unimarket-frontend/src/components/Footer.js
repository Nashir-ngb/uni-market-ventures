import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#003366] to-[#005EB8] text-white">
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        
        <div className="flex flex-col items-center md:items-start space-y-1">
          <p className="font-semibold text-lg">UniMarket Hub</p>
          <p className="text-sm">Empowering campus commerce & community.</p>
        </div>

        <div className="flex justify-center space-x-4 text-sm font-medium">
          <Link to="/about" className="hover:text-[#FFB6C1]">About Us</Link>
          <Link to="/products" className="hover:text-[#FFB6C1]">Products</Link>
          <Link to="/chat" className="hover:text-[#FFB6C1]">Chat</Link>
        </div>

        <div className="flex flex-col items-center md:items-end space-y-1 text-sm">
          <div className="flex space-x-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="hover:text-[#FFB6C1]" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-[#FFB6C1]" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="hover:text-[#FFB6C1]" />
            </a>
          </div>
          <p>📧 support@unimarket.edu.my</p>
          <p>© 2025 UniMarket. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
