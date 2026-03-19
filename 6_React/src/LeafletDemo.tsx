/**
 * Leaflet Demo
 *
 * Install deps first:
 *   npm install leaflet react-leaflet
 *   npm install -D @types/leaflet
 *
 * Also add this to your index.html <head>:
 *   <link
 *     rel="stylesheet"
 *     href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
 *   />
 */

import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

interface Pin {
  id: number;
  lat: number;
  lng: number;
  label: string;
}

// Leaflet tries to load marker images from a relative path that doesn't exist
// after bundling. We need to load the CDNs manually
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)
  ._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface ClickHandlerProps {
  onMapClick: (lat: number, lng: number) => void;
}

function ClickHandler({ onMapClick }: ClickHandlerProps) {
  useMapEvents({
    click(e) {
      // e.latlng is a Leaflet LatLng object
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

const SFU: [number, number] = [49.2761, -122.9162];

export default function MapDemo() {
  const [pins, setPins] = useState<Pin[]>([
    { id: 0, lat: 49.2761, lng: -122.9162, label: "SFU campus" },
  ]);

  function handleMapClick(lat: number, lng: number) {
    const label = `Pin ${pins.length}`; // You can use a reverse geocoding API to get a real label if you want
    setPins((prev) => [...prev, { id: Date.now(), lat, lng, label }]);
  }

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <h2 style={{ padding: "0.75rem 1rem", margin: 0 }}>
        Leaflet demo
      </h2>

      <MapContainer
        center={SFU}
        zoom={13}
        style={{ height: "500px", width: "800px", cursor: "default", margin: "0 auto" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        <ClickHandler onMapClick={handleMapClick} />

        {pins.map((pin) => (
          <Marker key={pin.id} position={[pin.lat, pin.lng]}>
            <Popup>
              <strong>{pin.label}</strong>
              <br />
              {pin.lat.toFixed(4)}, {pin.lng.toFixed(4)}
              <br />
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div style={{ padding: "1rem" }}>
        <h3>Dropped pins ({pins.length})</h3>
        {pins.length === 0 && <p>No pins yet — click the map!</p>}
        <ul>
          {pins.map((pin) => (
            <li key={pin.id} style={{ listStyle: "none" }}>
              {pin.label} — {pin.lat.toFixed(4)}, {pin.lng.toFixed(4)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
