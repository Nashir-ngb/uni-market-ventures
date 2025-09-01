import React, { useState } from 'react';
import axios from 'axios';
import SellerNavbar from '../components/SellerNavbar';

export default function SellerAddProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/seller/products`, {
        name, price
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('✅ Product added successfully!');
      setName('');
      setPrice('');
    } catch (err) {
      setMessage('❌ Failed to add product.');
    }
  };

  return (
    <>
      <SellerNavbar />
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">➕ Add New Product</h1>
        {message && <p className="mb-4 text-sm">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Price (RM)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Product
          </button>
        </form>
      </div>
    </>
  );
}
