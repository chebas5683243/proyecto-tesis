import { MapContainer, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import Markers from "../molecules/Markers.molecule";
import { useEffect, useState } from "react";

const MapView = ({ puntos }) => {

  const [map, setmap] = useState(null);

  const getClosestPointToCenter = () => {
    const centro = getCenter();
    let minimo = {distancia: 1000000, punto: null}
    puntos.forEach(punto => {
      let distancia = getEuclideanDistance(centro, punto);
      if (minimo.distancia > distancia) {
        minimo.distancia = distancia;
        minimo.punto = punto;
      }
    });

    map.flyTo([minimo.punto.latitud, minimo.punto.longitud]);
  }

  const getCenter = () => {
    let centro = {lat: 0, long: 0};
    puntos.forEach(punto => {
      centro.lat += punto.latitud;
      centro.long += punto.longitud;
    })
    centro.lat /= puntos.length;
    centro.long /= puntos.length;

    return centro;
  }

  const getEuclideanDistance = (centro, punto) => {
    return (Math.abs( centro.lat - punto.latitud ) ** 2 + Math.abs( centro.long - punto.longitud ) ** 2) ** (1/2)
  }

  useEffect(() => {
    if(puntos.length && puntos[0] !== null && map) getClosestPointToCenter();
  }, [puntos, map]);

  return (
    <MapContainer center={[-10, -60]} zoom={10} scrollWheelZoom={false} whenCreated={setmap}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.osm.ch/switzerland/{z}/{x}/{y}.png"
      />
      <Markers puntos={puntos}/>
    </MapContainer>
  );
}
 
export default MapView;