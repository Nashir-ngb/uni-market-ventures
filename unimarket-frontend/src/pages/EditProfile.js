import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function EditProfile() {
  const [user, setUser] = useState({ username: '' });
  const [newUsername, setNewUsername] = useState('');
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/user/dashboard', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setUser(res.data);
      setNewUsername(res.data.username);
    })
    .catch(() => setMessage('Failed to load user'));
  }, [token]);

  const handleUpdate = async () => {
    try {
      await axios.put('http://localhost:5000/api/user/profile', { username: newUsername }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('✅ Profile updated!');
    } catch {
      setMessage('Failed to update profile');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">🪪 Edit Profile</h1>
      <p>Current username: <strong>{user.username}</strong></p>
      <input
        type="text"
        value={newUsername}
        onChange={e => setNewUsername(e.target.value)}
        className="border w-full px-3 py-2 rounded mt-2 mb-2"
      />
      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
