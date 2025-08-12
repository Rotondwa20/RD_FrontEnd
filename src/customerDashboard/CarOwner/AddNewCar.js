import React, { useState } from 'react';
import '../pagescss/AddNewCar.css'; // 🔗 Link to CSS
//import axios from 'axios';

function AddNewCar() {
  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: '',
    licensePlate: '',
    rentalRate: '',
    status: '',
    category: '',
    mileage: '',
    lastMaintenance: '',
    maintenanceDue: ''
  });

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //await axios.post('http://localhost:8080/api/cars', car); // 🟢 Adjust URL if needed
      alert('Car added successfully!');
      setCar({
        brand: '',
        model: '',
        year: '',
        licensePlate: '',
        rentalRate: '',
        status: '',
        category: '',
        mileage: '',
        lastMaintenance: '',
        maintenanceDue: ''
      });
    } catch (err) {
      console.error(err);
      alert('Failed to add car.');
    }
  };

  return (
    <div className="add-car-container">
      <h2>Add New Car</h2>
      <form onSubmit={handleSubmit} className="add-car-form">
        <input type="text" name="brand" placeholder="Brand" value={car.brand} onChange={handleChange} required />
        <input type="text" name="model" placeholder="Model" value={car.model} onChange={handleChange} required />
        <input type="number" name="year" placeholder="Year" value={car.year} onChange={handleChange} required />
        <input type="text" name="licensePlate" placeholder="License Plate" value={car.licensePlate} onChange={handleChange} required />
        <input type="number" step="0.01" name="rentalRate" placeholder="Rental Rate" value={car.rentalRate} onChange={handleChange} required />
        <input type="text" name="status" placeholder="Status (Available/Rented)" value={car.status} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category (SUV, Sedan, etc.)" value={car.category} onChange={handleChange} required />
        <input type="number" name="mileage" placeholder="Mileage" value={car.mileage} onChange={handleChange} required />
        <input type="date" name="lastMaintenance" value={car.lastMaintenance} onChange={handleChange} required />
        <input type="date" name="maintenanceDue" value={car.maintenanceDue} onChange={handleChange} required />
        
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
}

export default AddNewCar;
