import React, { useEffect, useState } from 'react';
import axios from 'axios';

const token = localStorage.getItem('token');

export default function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/user/dashboard/stats', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setStats(res.data))
    .catch(() => console.error('Failed to load stats'));
  }, []); // removed token

  return (
    <div>
      <h1>Dashboard Stats</h1>
      <p>Total products: {stats.totalProducts}</p>
      <p>Total orders: {stats.totalOrders}</p>
    </div>
  );
}
