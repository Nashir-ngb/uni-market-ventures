import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Register() {
  const [data, setData] = useState({ username: '', password: '' });

  const handleChange = e => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/user/register', {
        username: data.username,
        password: data.password
      });
      toast.success(res.data.message || 'Registered successfully!');
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow p-6 rounded-xl">
      <h2 className="text-xl font-semibold mb-4 text-[#003366]">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
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