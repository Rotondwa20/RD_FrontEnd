import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Authentication/pages/Login';
import Register from './Authentication/pages/Register';
import Home from './customerDashboard/Home';
import ViewCars from './customerDashboard/CarRenter/ViewCars';
import Profile from './customerDashboard/CarRenter/Profile';
import logo from "../src/Assets/logo.png"; // Import logo
import OwnerHome from './customerDashboard/CarOwner/OwnerHome';
import AdmimDashboard from '../src/adminDashboard/pages/AdminDashboard'; 
import AddNewCar from './customerDashboard/CarOwner/AddNewCar';// Assuming you have an AdminDashboard component 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />}/>
      <Route path="/ViewCars" element={<ViewCars />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/OwnerHome" element={<OwnerHome />} />
      <Route path="/AdminDashboard" element={<AdmimDashboard />} />
      <Route path="/AddNewCar" element={<AddNewCar />} />
      {/* Add other routes as needed */}
    </Routes>
  );
}

export default App;
