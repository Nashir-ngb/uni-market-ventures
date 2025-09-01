import React, { useState } from 'react';
import axios from 'axios';

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const handleChange = async () => {
    try {
      await axios.put('http://localhost:5000/api/user/change-password',
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('✅ Password changed!');
    } catch {
      setMessage('Failed to change password');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">🔑 Change Password</h1>
      <input
        type="password"
        placeholder="Old password"
        value={oldPassword}
        onChange={e => setOldPassword(e.target.value)}
        className="border w-full px-3 py-2 rounded mb-2"
      />
      <input
        type="password"
        placeholder="New password"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
        className="border w-full px-3 py-2 rounded mb-2"
      />
      <button
        onClick={handleChange}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Change Password
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
