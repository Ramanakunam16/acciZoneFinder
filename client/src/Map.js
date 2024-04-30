import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";

import L from "leaflet";
// const icon=L.icon({
//   iconUrl:
// })
export function Map() {
  return (
    <MapContainer center={[17.435852, 78.4400384]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker>
        <Popup>accident Zone</Popup>
      </Marker>
    </MapContainer>
  );
}
