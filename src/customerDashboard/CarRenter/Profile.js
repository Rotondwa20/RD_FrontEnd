import React, { useEffect, useState } from 'react';
import '../pagescss/Profile.css';
//import axios from 'axios';

function Profile() {
  const [renter, setRenter] = useState(null);

  // useEffect(() => {
  //   // Replace with actual backend endpoint
  //   axios.get('http://localhost:8080/api/renters/profile')
  //     .then(response => {
  //       setRenter(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Failed to fetch renter profile:', error);
  //     });
  // }, []);

  return (
    <div className="renter-profile-container">
      <h2>My Profile</h2>
      {renter ? (
        <div className="profile-card">
          <p><strong>Name:</strong> {renter.name}</p>
          <p><strong>Email:</strong> {renter.email}</p>
          <p><strong>Phone:</strong> {renter.phone}</p>
          <p><strong>Address:</strong> {renter.address}</p>
          <p><strong>License Number:</strong> {renter.licenseNumber}</p>
          <p><strong>Joined:</strong> {new Date(renter.createdAt).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default Profile;
