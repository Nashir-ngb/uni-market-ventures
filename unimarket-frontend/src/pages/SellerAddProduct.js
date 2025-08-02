import React, { useState } from 'react';
import axios from 'axios';

export default function SellerAddProduct() {
  const [product, setProduct] = useState({ name: '', price: '', description: '', imageUrl: '' });
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const handleChange = (e) =>
    setProduct({ ...product, [e.target.name]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/user/products/add', product, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(res.data.message);
      setProduct({ name: '', price: '', description: '', imageUrl: '' });
    } catch {
      setMessage('Failed to add product');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">➕ Add Product</h1>
      {message && <p className="mb-2">{message}</p>}
      <form onSubmit={handleAdd} className="space-y-2">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={product.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price (RM)"
          value={product.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL (optional)"
          value={product.imageUrl}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Add</button>
      </form>
    </div>
  );
}
