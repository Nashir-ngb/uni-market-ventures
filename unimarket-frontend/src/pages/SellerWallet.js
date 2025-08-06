import React from 'react';
import SellerNavbar from '../components/SellerNavbar';

export default function SellerWallet() {
  const balance = 420.00; // Ideally, you'd fetch this from backend

  return (
    <>
      <SellerNavbar />
      <div className="max-w-xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">💰 Wallet</h1>
        <div className="bg-white p-4 rounded shadow border">
          <p className="text-gray-700">Current Balance</p>
          <h2 className="text-3xl font-bold text-green-600">RM {balance.toFixed(2)}</h2>
        </div>
      </div>
    </>
  );
}
