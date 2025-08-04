import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Wallet() {
  const [balance, setBalance] = useState(0);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/user/wallet', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setBalance(res.data.balance))
    .catch(() => {});
  }, [token]);

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">💰 Wallet</h1>
      <p className="text-lg">Your balance: <strong>RM {balance}</strong></p>
    </div>
  );
}
