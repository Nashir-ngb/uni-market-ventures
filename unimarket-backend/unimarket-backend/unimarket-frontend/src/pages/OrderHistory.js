// src/pages/OrderHistory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/user/orders', {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load orders');
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">📦 Your Orders</h2>
      {error && <p className="text-red-500">{error}</p>}
      {orders.length === 0 ? (
        <p>No past orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="mb-4 border-b pb-2">
            <p className="font-medium">Order ID: {order._id}</p>
            <p className="text-sm text-gray-500">Date: {new Date(order.date).toLocaleDateString()}</p>
            <ul className="ml-4 list-disc">
              {order.items.map(item => (
                <li key={item.product._id}>{item.product.name} × {item.quantity}</li>
              ))}
            </ul>
            <p className="font-semibold">Total: ${order.total.toFixed(2)}</p>
          </div>
        ))
      )}
    </div>
  );
}
