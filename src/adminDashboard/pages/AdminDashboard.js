import React from 'react';
import '../pagescss/AdminDashboard.css'; // ✅ Ensure this file exists
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { auth } from '../../Firebase/Firebase'; // ✅ Adjust this path if needed
import { signOut } from 'firebase/auth';
import logo from '../../Assets/logo.png';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // ✅ Redirect to login or landing page
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <img src={logo} alt="Logo" className="logo" />
        <nav>
          <ul>
            <li><Link to="/admin/overview" className="sidebar-link">Overview</Link></li>
            <li><Link to="/admin/manage-users" className="sidebar-link">Manage Users</Link></li>
            <li><Link to="/admin/manage-cars" className="sidebar-link">Manage Cars</Link></li>
            <li><Link to="/admin/manage-bookings" className="sidebar-link">Manage Bookings</Link></li>
            <li><Link to="/admin/reports" className="sidebar-link">Reports</Link></li>
          </ul>
        </nav>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="top-header">
          <div className="search-container">
            <input type="text" className="search-bar" placeholder="Search admin data..." />
            <FaSearch className="search-icon" />
          </div>
          <div className="user-profile">Hi, Admin</div>
        </div>

        <div className="admin-welcome">
          <h2>Welcome to the Admin Dashboard</h2>
          <p>Manage users, cars, bookings, and reports here.</p>
        </div>

        <div className="admin-stats">
          <div className="admin-card">Total Users: 120</div>
          <div className="admin-card">Cars Listed: 45</div>
          <div className="admin-card">Active Bookings: 22</div>
          <div className="admin-card">Pending Approvals: 6</div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
