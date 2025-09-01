import React, { useEffect, useState } from 'react';
import axios from 'axios';

const token = localStorage.getItem('token');

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/user/orders', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setOrders(res.data))
    .catch(() => console.error('Failed to load orders'));
  }, []); // removed token

  return (
    <div>
      <h1>My Orders</h1>
      <ul>
        {orders.map(o => <li key={o._id}>Order #{o._id} - RM {o.total}</li>)}
      </ul>
    </div>
  );
}
