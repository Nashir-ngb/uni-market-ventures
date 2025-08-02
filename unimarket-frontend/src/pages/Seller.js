import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

export default function Seller() {
  const [products, setProducts] = useState([]);

  const fetchMyProducts = useCallback(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    axios.get('http://localhost:5000/api/seller/my-products', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setProducts(res.data))
    .catch(err => {
      console.error('Failed to load my products:', err.response?.data || err.message);
    });
  }, []);

  useEffect(() => {
    fetchMyProducts();
  }, [fetchMyProducts]);

  return (
    <div>
      <h1>My Products</h1>
      <ul>
        {products.map(p => <li key={p._id}>{p.name} - RM {p.price}</li>)}
      </ul>
    </div>
  );
}
