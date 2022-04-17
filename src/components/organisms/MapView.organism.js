import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import Markers from "../molecules/Markers.molecule";

const MapView = ({ puntos }) => {

  return (
    <MapContainer center={[20, 11]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
      />
      <Markers puntos={puntos}/>
    </MapContainer>
  );
}
 
export default MapView;