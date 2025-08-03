import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'buyer',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const API_BASE = (process.env.REACT_APP_API_BASE_URL || '').replace(/\/$/, '');

  const handleChange = (e) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const route = data.role === 'seller'
        ? '/api/seller/register'
        : '/api/user/register';

      const registerUrl = `${API_BASE}${route}`;

      // ✅ Always send username, email and password
      const payload = {
        username: data.username,
        email: data.email,
        password: data.password
      };

      const response = await axios.post(registerUrl, payload);

      toast.success(response.data.message || 'Registered successfully!');
      navigate('/login');
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
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
          required
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
          disabled={isSubmitting}
          className={`bg-gradient-to-r from-[#005EB8] to-[#003366] text-white px-3 py-2 rounded hover:opacity-90 w-full ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
