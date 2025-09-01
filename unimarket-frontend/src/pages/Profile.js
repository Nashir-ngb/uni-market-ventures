import React, { useEffect, useState } from 'react';
import axios from 'axios';

const token = localStorage.getItem('token');

export default function Profile() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/user/dashboard', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setProfile(res.data))
    .catch(() => console.error('Failed to load profile'));
  }, []); // removed token

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
    </div>
  );
}
