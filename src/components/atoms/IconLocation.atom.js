import L from "leaflet";
import Marker from "../../assets/marker.png";

const IconLocation = L.icon({
  iconUrl: Marker,
  // iconRetinaUrl: require("../../assets/marker.png"),
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [25, 25],
  className: "leaflet-venue-icon",
})
 
export default IconLocation;