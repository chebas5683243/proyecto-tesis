import { MapContainer, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import Markers from "../molecules/Markers.molecule";

const MapView = ({ puntos }) => {

  return (
    <MapContainer center={[-10.595669, -74.926453]} zoom={10} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.osm.ch/switzerland/{z}/{x}/{y}.png"
      />
      <Markers puntos={puntos}/>
    </MapContainer>
  );
}
 
export default MapView;