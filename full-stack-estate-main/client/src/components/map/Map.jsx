import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "./map.scss";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/Pin";

// Fallback center used only when there are no items with valid coordinates.
// Centered on India instead of the old hardcoded London/Birmingham point.
const DEFAULT_CENTER = [20.5937, 78.9629];
const DEFAULT_ZOOM = 5;

// Re-centers/fits the map whenever the list of items changes.
function FitBounds({ items }) {
  const map = useMap();

  useEffect(() => {
    const points = items
      .filter((item) => item.latitude && item.longitude)
      .map((item) => [parseFloat(item.latitude), parseFloat(item.longitude)]);

    if (points.length === 1) {
      map.setView(points[0], 12);
    } else if (points.length > 1) {
      map.fitBounds(points, { padding: [50, 50], maxZoom: 13 });
    } else {
      map.setView(DEFAULT_CENTER, DEFAULT_ZOOM);
    }
  }, [items, map]);

  return null;
}

function Map({ items }) {
  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds items={items} />
      {items.map((item) => (
        <Pin item={item} key={item.id} />
      ))}
    </MapContainer>
  );
}

export default Map;