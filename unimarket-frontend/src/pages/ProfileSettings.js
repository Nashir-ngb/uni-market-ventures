import React, { useState } from 'react';
import axios from 'axios';

export default function ProfileSettings() {
  const token = localStorage.getItem('token');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChangeEmail = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/user/change-email',
        { email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Email updated successfully!');
      setEmail('');
    } catch (err) {
      console.error(err);
      alert('Failed to change email');
    }
  };

  const handleChangePhone = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/user/change-phone',
        { phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Phone number updated successfully!');
      setPhone('');
    } catch (err) {
      console.error(err);
      alert('Failed to change phone number');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/user/change-password',
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      console.error(err);
      alert('Failed to change password');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 space-y-6">
      <h1 className="text-2xl font-bold mb-4">⚙️ Profile Settings</h1>

      {/* Change Email */}
      <form onSubmit={handleChangeEmail} className="space-y-2">
        <h2 className="font-semibold">Change Email</h2>
        <input
          type="email"
          placeholder="New email"
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700">
          Update Email
        </button>
      </form>

      {/* Change Phone */}
      <form onSubmit={handleChangePhone} className="space-y-2">
        <h2 className="font-semibold">Change Phone Number</h2>
        <input
          type="text"
          placeholder="New phone number"
          className="w-full border px-3 py-2 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button type="submit" className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700">
          Update Phone
        </button>
      </form>

      {/* Change Password */}
      <form onSubmit={handleChangePassword} className="space-y-2">
        <h2 className="font-semibold">Change Password</h2>
        <input
          type="password"
          placeholder="Current password"
          className="w-full border px-3 py-2 rounded"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New password"
          className="w-full border px-3 py-2 rounded"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700">
          Change Password
        </button>
      </form>
    </div>
  );
}
