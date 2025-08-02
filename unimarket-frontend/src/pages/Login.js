import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login({ onLoginSuccess }) {
  const [data, setData] = useState({ email: '', password: '', role: 'buyer' });
  const navigate = useNavigate();

  const API_BASE = (process.env.REACT_APP_API_BASE_URL || '').replace(/\/$/, '');

  const handleChange = e =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const route = data.role === 'seller'
        ? '/api/seller/login'
        : '/api/user/login';

      const loginUrl = `${API_BASE}${route}`;

      const res = await axios.post(loginUrl, {
        email: data.email,
        password: data.password
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('username', res.data.username || '');

      toast.success('Logged in successfully!');
      if (onLoginSuccess) onLoginSuccess();
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow p-6 rounded-xl">
      <h2 className="text-xl font-semibold mb-4 text-[#003366]">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <select
          name="role"
          value={data.role}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="buyer">Login as Buyer</option>
          <option value="seller">Login as Seller</option>
        </select>
        <button
          type="submit"
          className="bg-gradient-to-r from-[#005EB8] to-[#003366] text-white px-3 py-2 rounded hover:opacity-90 w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}
