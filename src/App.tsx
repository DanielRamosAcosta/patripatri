import React, { useEffect, useState } from "react";
import L, { LatLngLiteral } from "leaflet";
import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";
import styles from "./App.module.css";
import "leaflet/dist/leaflet.css";
import differenceInDays from "date-fns/differenceInDays";
import { CenterOnLocationChange } from "./components/CenterOnLocationChange";
import { findBoundingPointsForTimestamp } from "./utils/findIndexNearestTo";
import { portsMapInfo } from "./utils/portsMapInfo";
import { portIsTooClose } from "./utils/portIsTooClose";
import { usePatriLocations } from "./hooks/usePatriLocations";
import { estimateCoordinatesAtTime } from "./utils/estimateCoordinatesAtTime";

const PatriIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + "/patri.png",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const DestinationIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + "/tracking.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

function App() {
  const { locations, lastLocation } = usePatriLocations();
  const [currentPosition, setCurrentPosition] = useState(lastLocation);
  const [sliderValue, setSliderValue] = useState(Date.now());

  useEffect(() => {
    setCurrentPosition(lastLocation);
  }, [lastLocation]);

  const patriArrival = new Date(2021, 3, 10);
  const patriDeparture = new Date(2020, 11, 22, 22, 0, 0);

  const daysToPatri = differenceInDays(patriArrival, new Date());

  const filteredPolylinesLocations: LatLngLiteral[] = locations.filter(
    (e) => e.timestamp <= sliderValue
  );
  const polyLinePositions = filteredPolylinesLocations.concat({
    lat: currentPosition.lat,
    lng: currentPosition.lng,
  });

  console.log(currentPosition);

  const nextPort = portsMapInfo.find(
    (port) => port.id === currentPosition.arrivalPort?.id
  );
  const nextPortLocationPosition = nextPort?.position;

  return (
    <div className={styles.map}>
      <MapContainer center={currentPosition} zoom={8}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={currentPosition} icon={PatriIcon} />
        {nextPortLocationPosition &&
        !portIsTooClose(currentPosition, nextPortLocationPosition) ? (
          <Marker position={nextPortLocationPosition} icon={DestinationIcon} />
        ) : null}
        <CenterOnLocationChange
          lat={currentPosition.lat}
          lng={currentPosition.lng}
        />
        <Polyline positions={polyLinePositions} />
      </MapContainer>
      <div className={styles.bottomMenu}>
        <div className={styles.menuContent}>
          <p className={styles.dates}>
            {new Date(sliderValue).toLocaleString()}
            {currentPosition.temperature != null
              ? ` | ${currentPosition.temperature}ºC`
              : null}
            {" | "}
            {nextPort ? `${nextPort.city} (${nextPort.country})` : null}
          </p>
          <input
            type="range"
            min={1608802672283}
            max={Date.now()}
            value={sliderValue}
            onChange={(e) => {
              const timestamp = parseInt(e.target.value);
              const { p1, p2 } = findBoundingPointsForTimestamp(
                locations,
                timestamp
              );

              const { lat, lng } = estimateCoordinatesAtTime(p2, p1, timestamp);

              setCurrentPosition({ ...p1, lat, lng });
              setSliderValue(timestamp);
            }}
          />
          <p className={styles.countDown}>Patri llega en {daysToPatri} días</p>
          <progress
            value={new Date().getTime() - patriDeparture.getTime()}
            max={patriArrival.getTime() - patriDeparture.getTime()}
            className={styles.progress}
          />
        </div>
        <div className={styles.overlay} />
      </div>
    </div>
  );
}

export default App;
