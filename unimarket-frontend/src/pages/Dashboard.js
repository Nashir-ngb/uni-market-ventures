// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:5000/api/user/dashboard/stats', {
        // eslint-disable-next-line no-template-curly-in-string
        headers: { Authorization: 'Bearer ${token}' }  // fixed the template literal
      })
        .then(res => setStats(res.data))
        .catch(err => console.error('Failed to load stats', err));
    }
  }, [token]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Dashboard</h1>
      <div className="space-y-2">
        <p>Total products: {stats.totalProducts ?? 0}</p>
        <p>Total orders: {stats.totalOrders ?? 0}</p>
      </div>
    </div>
  );
}