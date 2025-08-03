import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const token = localStorage.getItem('token');

export default function SellerWallet() {
  const [balance, setBalance] = useState(0);

  const fetchBalance = useCallback(() => {
    axios.get('http://localhost:5000/api/user/wallet', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setBalance(res.data.balance))
    .catch(() => console.error('Failed to load balance'));
  }, []); // removed token

  useEffect(() => { fetchBalance(); }, [fetchBalance]);

  return (
    <div>
      <h1>Wallet</h1>
      <p>Balance: RM {balance}</p>
    </div>
  );
}
