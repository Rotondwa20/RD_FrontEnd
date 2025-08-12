import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // ✅ added signOut
import { doc, getDoc } from "firebase/firestore";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import { db } from "../../Firebase/Firebase";
import logo from '../../Assets/logo.png';
import CarCard from "../../components/CarCard";
import "../pagescss/ViewCars.css";

const ViewCars = () => {
  const [cars] = useState([]);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/profile");
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const userData = userSnap.data();
            setUserName(userData.name || "User");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    });
  }, []);

  return (
    <div className="layout">
      <aside className="sidebar">
        <img src={logo} alt="Logo" className="logo" />

        <nav>
          <ul>
            <li><Link to="/dashboard" className="sidebar-link">Dashboard</Link></li>
            <li><Link to="/my-rentals" className="sidebar-link">My Rentals</Link></li>
            <li><Link to="/wallet" className="sidebar-link">Wallet</Link></li>
            <li><Link to="/rewards" className="sidebar-link">Rewards</Link></li>
            <li><Link to="/profile" className="sidebar-link">Profile</Link></li>
          </ul>
        </nav>

        <button onClick={handleLogout} className="logout-button">Logout</button>
      </aside>

      <main className="main-content">
        <header className="top-header">
          <div className="search-container">
            <input type="text" placeholder="Search Cars" className="search-bar" />
            <FaSearch className="search-icon" />
          </div>

          <div className="user-profile" onClick={goToProfile}>
            <FaUserCircle className="account-icon" />
            <span className="user-name">{userName}</span>
          </div>
        </header>

        <div className="filters">
          <select className="filter-button"><option>Filter by Brand</option></select>
          <select className="filter-button"><option>Filter by Category</option></select>
          <select className="filter-button"><option>Sort by</option></select>
        </div>

        {cars.length === 0 ? (
          <p className="no-cars-msg">No cars available. Please check back later.</p>
        ) : (
          <>
            <div className="car-grid">
              {cars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
            <div className="pagination">
              <button>Prev</button>
              <button className="active">1</button>
              <button>2</button>
              <button>3</button>
              <button>Next</button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default ViewCars;
