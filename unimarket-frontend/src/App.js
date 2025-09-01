import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';

import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Appointments from './pages/Appointments';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import AddProduct from './pages/AddProduct';
import Chat from './pages/Chat';
import About from './pages/About';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

import SellerDashboard from './pages/SellerDashboard';
import SellerOrders from './pages/SellerOrders';
import SellerProducts from './pages/SellerProducts';
import SellerWallet from './pages/SellerWallet';
import SellerAddProduct from './pages/SellerAddProduct';

import RequireSeller from './components/RequireSeller';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Buyer/User Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/about" element={<About />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Seller Routes (Protected) */}
              <Route path="/seller/dashboard" element={<RequireSeller><SellerDashboard /></RequireSeller>} />
              <Route path="/seller/orders" element={<RequireSeller><SellerOrders /></RequireSeller>} />
              <Route path="/seller/products" element={<RequireSeller><SellerProducts /></RequireSeller>} />
              <Route path="/seller/wallet" element={<RequireSeller><SellerWallet /></RequireSeller>} />
              <Route path="/seller/add-product" element={<RequireSeller><SellerAddProduct /></RequireSeller>} />
            </Routes>
          </main>
          <ToastContainer position="top-center" />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
