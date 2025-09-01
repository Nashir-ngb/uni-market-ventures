// src/pages/Checkout.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const placeOrder = async () => {
    try {
      await axios.post('http://localhost:5000/api/user/checkout', {}, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      });
      setMessage('✅ Order placed successfully!');
      setTimeout(() => navigate('/orders'), 1500);
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to place order');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded shadow text-center">
      <h2 className="text-xl font-semibold mb-4">Checkout</h2>
      <p>Ready to confirm your order?</p>
      {message && <p className="mt-2 text-green-600">{message}</p>}
      <button
        onClick={placeOrder}
        className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
        Confirm & Place Order
      </button>
    </div>
  );
}
