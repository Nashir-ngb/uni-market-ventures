import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
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
import Seller from './pages/Seller';
import SellerOrders from './pages/SellerOrders';
import SellerProducts from './pages/SellerProducts';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import About from './pages/About';
import Footer from './components/Footer';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
        <Routes>
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
          <Route path="/seller" element={<Seller />} />
          <Route path="/seller/orders" element={<SellerOrders />} />
          <Route path="/seller/products" element={<SellerProducts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
        </Routes>
        </main>
        <ToastContainer position="top-center" />
        <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
