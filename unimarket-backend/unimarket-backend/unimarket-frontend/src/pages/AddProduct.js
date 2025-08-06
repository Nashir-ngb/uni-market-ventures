import React, { useState } from 'react';
import axios from 'axios';

export default function AddProduct() {
  const [form, setForm] = useState({ name: '', price: '', description: '', imageUrl: '' });
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/user/products/add', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('✅ Product added!');
      setForm({ name: '', price: '', description: '', imageUrl: '' });
    } catch {
      setMessage('❌ Failed to add product');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-xl font-bold mb-4">Add New Product</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-2">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full border px-2 py-1 rounded" required />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" className="w-full border px-2 py-1 rounded" required />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border px-2 py-1 rounded" />
        <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Image URL" className="w-full border px-2 py-1 rounded" />
        <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Add Product</button>
      </form>
    </div>
  );
}
