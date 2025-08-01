import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function SellerProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/user/seller/products', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setProducts(res.data))
    .catch(() => setError('Failed to load seller products'));
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">📦 My Products</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((p, idx) => (
            <div key={idx} className="border rounded p-4">
              <h2 className="font-semibold">{p.name}</h2>
              <p>RM {p.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
