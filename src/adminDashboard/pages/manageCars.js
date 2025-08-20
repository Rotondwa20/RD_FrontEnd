import React, { useState } from "react";


import LocationPermission from "../../components/LocationPermission";
import Location from "../../customerDashboard/Location/Location";
import { sendLocationToBackend } from "../../customerDashboard/Location/LocationSandR";

const ManageCars = () => {
  const [coords, setCoords] = useState(null); // { latitude, longitude }
const handleSendLocation = async () => {
    if (!coords) {
      alert("No coordinates available yet!");
      return;
    }

    try {
      const result = await sendLocationToBackend(coords);
      console.log("Location saved:", result);
      alert(`Location saved! ID: ${result.locationID}`);
    } catch (error) {
      console.error("Failed to send location:", error);
      alert("Failed to save location. Check console for details.");
    }
  };
  return (
    <div className="manage-car">
      <h2>Manage Cars</h2>
     { }
     <button type="button" onClick={handleSendLocation} style={{ marginLeft: '10px' }}>
        Send Location to Backend
      </button>
      {}
      <button type="button">Test Button</button>
      {}
  <LocationPermission setCoords={setCoords} />
  {}
  <Location coords={coords} />
    </div>
  );
};

export default ManageCars;
