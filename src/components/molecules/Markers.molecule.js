import { Marker } from "react-leaflet";
import IconLocation from "../atoms/IconLocation.atom";

const Markers = ({ puntos }) => {

  const markers = puntos.map((punto, index) => 
    (punto ?
    <Marker
      key={index}
      position={{lat: punto.latitud, lng: punto.longitud}}
      icon={IconLocation}
    />
    : null)
  );

  return markers;
}
 
export default Markers;