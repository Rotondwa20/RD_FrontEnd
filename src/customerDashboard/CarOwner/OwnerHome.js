import React from 'react';
import '../pagescss/OwnerHome.css';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import logo from '../../Assets/logo.png';

function OwnerHome() {
  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
         <img src={logo} alt="Logo" className="logo" />
        <nav>
          <ul>
            <li><Link to="/dashboard" className="sidebar-link">Dashboard</Link></li>
            <li><Link to="/Earnings" className="sidebar-link">Earnings</Link></li>
            <li><Link to="/AddNewCar" className="sidebar-link">Add New Car</Link></li>
            <li><Link to="/Rentals" className="sidebar-link">Bookings</Link></li>
            <li><Link to="/OwnnerProfile" className="sidebar-link">Profile</Link></li>
          </ul>
        </nav>
        <button className="logout-button">Logout</button>
      </aside>

      {/* Main content area */}
      <main className="main-content">
        <div className="top-header">
          <div className="search-container">
            <input type="text" className="search-bar" placeholder="Search cars..." />
            <FaSearch className="search-icon" />
          </div>
          <div className="user-profile">Hi, Car Owner</div>
        </div>

        <div className="filters">
          <button className="filter-button">All</button>
          <button className="filter-button">Available</button>
          <button className="filter-button">Rented</button>
        </div>

        <div className="car-grid">
          <div className="car-card">Car 1</div>
          <div className="car-card">Car 2</div>
          <div className="car-card">Car 3</div>
        </div>

        <div className="pagination">
          <button>Prev</button>
          <button className="active">1</button>
          <button>2</button>
          <button>Next</button>
        </div>

        {/* Optional: no car message */}
        {/* <div className="no-cars-msg">No cars found.</div> */}
      </main>
    </div>
  );
}

export default OwnerHome;
