import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SellerNavbar from '../components/SellerNavbar';

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/seller/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <>
      <SellerNavbar />
      <div className="max-w-5xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">📑 Orders</h1>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Order ID</th>
              <th className="border px-2 py-1">Total (RM)</th>
              <th className="border px-2 py-1">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="border px-2 py-1">{order._id.slice(-5)}</td>
                <td className="border px-2 py-1">{order.total}</td>
                <td className="border px-2 py-1">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
