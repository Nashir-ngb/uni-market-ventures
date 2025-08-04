import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      axios
        .get('http://localhost:5000/api/user/dashboard/stats', {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => setStats(res.data))
        .catch(err => console.error('Failed to load stats', err));
    }
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6 text-[#003366]">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h2 className="text-lg font-semibold text-[#005EB8]">📦Total Orders</h2>
          <p className="text-3xl mt-2">{stats.totalOrders || 0}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h2 className="text-lg font-semibold text-[#005EB8]">💰Total Spent</h2>
          <p className="text-3xl mt-2">RM {stats.totalSpent || 0}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h2 className="text-lg font-semibold text-[#005EB8]">📅Upcoming Appointments</h2>
          <p className="text-3xl mt-2">{stats.upcomingAppointments || 0}</p>
        </div>
      </div>
    </div>
  );
}
