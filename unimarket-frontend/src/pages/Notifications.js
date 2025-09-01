import React, { useEffect, useState } from 'react';
import axios from 'axios';

const token = localStorage.getItem('token');

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/user/notifications', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setNotifications(res.data))
    .catch(() => console.error('Failed to load notifications'));
  }, []); // removed token

  return (
    <div>
      <h1>Notifications</h1>
      <ul>
        {notifications.map(n => <li key={n._id}>{n.message}</li>)}
      </ul>
    </div>
  );
}
