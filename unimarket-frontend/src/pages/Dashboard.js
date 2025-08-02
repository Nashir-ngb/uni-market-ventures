import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      axios
        .get('http://localhost:5000/api/user/dashboard/stats', {
          // eslint-disable-next-line no-template-curly-in-string
          headers: { Authorization: 'Bearer ${token}' }
        })
        .then(res => setStats(res.data))
        .catch(err => console.error('Failed to load stats', err));
    }
  }, [token]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Dashboard Stats</h1>
      <p>Total orders: {stats.totalOrders || 0}</p>
      <p>Total spent: RM{stats.totalSpent || 0}</p>
      <p>Upcoming appointments: {stats.upcomingAppointments || 0}</p>
    </div>
  );
}