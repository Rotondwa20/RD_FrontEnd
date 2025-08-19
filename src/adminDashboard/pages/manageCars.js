import React, { useState } from "react";


import LocationPermission from "../../components/LocationPermission";
import Location from "../../customerDashboard/Location/Location";


const ManageCars = () => {
  const [coords, setCoords] = useState(null); // { latitude, longitude }

  return (
    <div className="manage-car">
      <h2>Manage Cars</h2>
     { }
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
