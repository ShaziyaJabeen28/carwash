import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  async function fetchMe() {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching profile:", err.response?.data || err.message);
    }
  }
  fetchMe();
}, []);


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="card">
      <h2>Dashboard</h2>
      {user ? (
        <>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <button className="btn" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}
