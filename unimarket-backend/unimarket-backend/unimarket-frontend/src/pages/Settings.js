import React, { useState } from 'react';
import axios from 'axios';

export default function Settings() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const handleChangePassword = async () => {
    if (!password) return;
    try {
      await axios.post('http://localhost:5000/api/user/change-password', 
        { password }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('✅ Password changed successfully');
      setPassword('');
    } catch {
      setMessage('❌ Failed to change password');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">⚙️ Settings</h1>
      <div className="space-y-3">
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
        <button
          onClick={handleChangePassword}
          className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
        >
          Change Password
        </button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
