/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import Form from "./Form.jsx";
import { useState } from "react";
import styles from "./Map.module.css";
import useGeolocation from "./geoLocation.jsx";
import styles1 from "./Button.module.css";
// import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect } from "react";
import { PostProvider } from "../contexts/CitiesContext.jsx";
function Map() {
  const n = useNavigate();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = PostProvider();
  const [searchParam, setSearchParam] = useSearchParams();
  const { isLoading, position, error, getPosition } = useGeolocation();
  // setMapPosition([searchParam.get('lat'),searchParam.get("lng")]);
  // setSearchParam({ lat: 23, lng: 23 });
  // console.log(searchParam);
  // useEffect(() => {
  //   setMapPosition([searchParam.get("lat"), searchParam.get("lng")]);
  //   console.log("set to: ", mapPosition);
  // }, [searchParam, mapPosition]);
  // console.log(searchParam);
  const lat = searchParam.get("lat");
  const long = searchParam.get("lng");
  console.log(
    "llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll",
    lat,
    long
  );
  useEffect(() => {
    if (lat && long) setMapPosition([lat, long]);
  }, [searchParam]);
  useEffect(() => {
    if (position.lat && position.lng) {
      setMapPosition([position.lat, position.lng]);
    }
    console.log(position);
  }, [position]);
  return (
    <div
      className={styles.mapContainer}
      onClick={(e) => {
        // n("form");
      }}
    >
      <button onClick={getPosition}></button>
      <MapContainer
        center={mapPosition}
        className={styles.map}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          return (
            <Marker position={[city.position.lat, city.position.lng]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPosition}></ChangeCenter>
        <DetectClick></DetectClick>
        <button
          onClick={getPosition}
          className={`${styles1.btn} ${styles1.position}`}
        ></button>
      </MapContainer>{" "}
    </div>
  );
}
function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
export default Map;
