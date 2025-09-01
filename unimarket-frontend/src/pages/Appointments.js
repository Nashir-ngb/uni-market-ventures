import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const token = localStorage.getItem('token');

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');

  const loadAppointments = useCallback(() => {
    axios.get('http://localhost:5000/api/user/appointments', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setAppointments(res.data))
    .catch(() => setError('Failed to load appointments'));
  }, []); // removed token

  useEffect(() => { loadAppointments(); }, [loadAppointments]);

  return (
    <div>
      <h1>Appointments</h1>
      {error && <p>{error}</p>}
      <ul>
        {appointments.map(a => <li key={a._id}>{a.business} on {a.date}</li>)}
      </ul>
    </div>
  );
}
