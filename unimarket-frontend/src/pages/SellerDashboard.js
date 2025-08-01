import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function SellerDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prodRes = await axios.get('http://localhost:5000/api/seller/products', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProducts(prodRes.data);

        const orderRes = await axios.get('http://localhost:5000/api/seller/orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(orderRes.data);
      } catch {
        setError('Failed to load seller data');
      }
    };
    fetchData();
  }, [token]);

  return (
    <div className="max-w-5xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">📦 Seller Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Your Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map(p => (
            <div key={p._id} className="border rounded p-4">
              <h3 className="font-semibold">{p.name}</h3>
              <p>RM {p.price}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Recent Orders</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Order ID</th>
              <th className="border px-2 py-1">Total (RM)</th>
              <th className="border px-2 py-1">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o._id}>
                <td className="border px-2 py-1">{o._id.slice(-5)}</td>
                <td className="border px-2 py-1">{o.total}</td>
                <td className="border px-2 py-1">{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
