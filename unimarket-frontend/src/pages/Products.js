import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data));
  }, []);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🛍 All Products</h1>
      <input
        className="border px-3 py-2 mb-4 w-full rounded"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((p, idx) => (
          <div key={idx} className="border rounded p-2">
            <img src={p.imageUrl || 'https://via.placeholder.com/150'} alt={p.name} className="mb-2" />
            <div className="font-semibold">{p.name}</div>
            <div>${p.price}</div>
            <button className="bg-green-600 text-white px-2 py-1 mt-2 rounded">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
