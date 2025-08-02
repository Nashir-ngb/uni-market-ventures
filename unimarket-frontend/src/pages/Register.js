import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'buyer', // default role
  });

  const navigate = useNavigate();
  const API_BASE = process.env.REACT_APP_API_BASE_URL;

  const handleChange = e =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Choose the correct route based on role
      const route =
        data.role === 'seller' ? '/api/seller/register' : '/api/user/register';

      const res = await axios.post(`${API_BASE}${route}`, data);

      toast.success(res.data.message || 'Registered successfully!');
      navigate('/login');
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow p-6 rounded-xl">
      <h2 className="text-xl font-semibold mb-4 text-[#003366]">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <select
          name="role"
          value={data.role}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded text-gray-700"
        >
          <option value="buyer">Register as Buyer</option>
          <option value="seller">Register as Seller</option>
        </select>
        <input
          type="text"
          name="username"
          value={data.username}
          onChange={handleChange}
          placeholder="Username"
          required
          className="w-full border px-3 py-2 rounded"
        />
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
        <button
          type="submit"
          className="bg-gradient-to-r from-[#005EB8] to-[#003366] text-white px-3 py-2 rounded hover:opacity-90 w-full"
        >
          Register
        </button>
      </form>
    </div>
  );
}
