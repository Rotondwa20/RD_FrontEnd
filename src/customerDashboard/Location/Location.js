import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Location = ({ coords }) => {
  const mapRef = useRef(null);
  const [center, setCenter] = useState([0, 0]);
  const ZOOM_LEVEL = 13;

  useEffect(() => {
    if (coords && coords.lat !== undefined && coords.lng !== undefined) {
      const newCenter = [coords.lat, coords.lng];
      setCenter(newCenter);
      if (mapRef.current) {
        mapRef.current.setView(newCenter, ZOOM_LEVEL);
      }
    }
  }, [coords, ZOOM_LEVEL]);

  return (
    <MapContainer
      center={center}
      zoom={ZOOM_LEVEL}
      style={{ height: "400px", width: "100%" }}
      ref={mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {coords && coords.lat !== undefined && coords.lng !== undefined && (
        <Marker position={[coords.lat, coords.lng]}>
          <Popup>Your location</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default Location;