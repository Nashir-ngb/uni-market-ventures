import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const token = localStorage.getItem('token');

export default function Cart() {
  const [cart, setCart] = useState([]);

  const fetchCart = useCallback(() => {
    axios.get('http://localhost:5000/api/user/cart', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setCart(res.data))
    .catch(() => console.error('Failed to load cart'));
  }, []); // removed token

  useEffect(() => { fetchCart(); }, [fetchCart]);

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cart.map(item => <li key={item._id}>{item.name} - RM {item.price}</li>)}
      </ul>
    </div>
  );
}
