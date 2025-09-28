import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <div className="app-container">
      <header className="topbar">
        <h1 className="brand">Car Wash Booking</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
        </nav>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
        </Routes>
      </main>

      <footer className="footer">© {new Date().getFullYear()} CarWash</footer>
    </div>
  );
}

export default App;
