import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Register() {
<<<<<<< HEAD
  const [data, setData] = useState({
    email: '',
    password: '',
    role: 'buyer',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

=======
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');
>>>>>>> 034843ba7a1e565c77e4e030981c5ddbf5640c76
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
<<<<<<< HEAD
      const route = data.role === 'seller'
        ? '/api/seller/register'
        : '/api/user/register';

      const registerUrl = `${API_BASE}${route}`;

      const payload = {
        email: data.email,
        password: data.password
      };

      const response = await axios.post(registerUrl, payload);

      toast.success(response.data.message || 'Registered successfully!');
=======
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/register`, {
        email,
        password,
        role,
      });
      toast.success('Registration successful! You can now login.');
>>>>>>> 034843ba7a1e565c77e4e030981c5ddbf5640c76
      navigate('/login');
    } catch (err) {
      toast.error('Registration failed. Try again.');
    }
  };

  return (
<<<<<<< HEAD
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
=======
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block mb-1">Register as:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            required
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            required
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
>>>>>>> 034843ba7a1e565c77e4e030981c5ddbf5640c76
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Register
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
}
