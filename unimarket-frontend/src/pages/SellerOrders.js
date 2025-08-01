import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const token = localStorage.getItem('token');

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = useCallback(() => {
    axios.get('http://localhost:5000/api/user/seller/orders', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setOrders(res.data))
    .catch(() => console.error('Failed to load seller orders'));
  }, []); // removed token

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  return (
    <div>
      <h1>Seller Orders</h1>
      <ul>
        {orders.map(o => <li key={o._id}>Order #{o._id} - RM {o.total}</li>)}
      </ul>
    </div>
  );
}
