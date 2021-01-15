import React, { useEffect, useState } from "react";
import L, { LatLngLiteral } from "leaflet";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import styles from "./App.module.css";
import "leaflet/dist/leaflet.css";
import mock from "./mock.json";
import differenceInDays from "date-fns/differenceInDays";
import { CenterOnLocationChange } from "./components/CenterOnLocationChange";
import { findIndexNearestTo2 } from "./utils/findIndexNearestTo";
import firebase from "firebase";
import { mapFirebaseData } from "./utils/mapFirebaseData";
import { Location } from "./models/Location";
import { portsMapInfo } from "./utils/portsMapInfo";
import { portIsTooClose } from "./utils/portIsTooClose";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const DISABLE_FIREBASE = false;

const firebaseConfig = {
  apiKey: "AIzaSyBThWjVqdQVhkOm-P4VwtOkK1XvoQBFjBs",
  authDomain: "patri-chaser.firebaseapp.com",
  databaseURL:
    "https://patri-chaser-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "patri-chaser",
  storageBucket: "patri-chaser.appspot.com",
  messagingSenderId: "191999461469",
  appId: "1:191999461469:web:d17e4c14ed1ea2f1e0a5b4",
  measurementId: "G-YL17SVHMQY",
};

if (!DISABLE_FIREBASE) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}

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

const cachedLocations = mapFirebaseData(mock);

function App() {
  const [locations, setLocations] = useState(cachedLocations);
  const [currentPosition, setCurrentPosition] = useState(
    cachedLocations[cachedLocations.length - 1]
  );
  const [sliderValue, setSliderValue] = useState(Date.now());

  useEffect(() => {
    if (!DISABLE_FIREBASE) {
      const db = firebase.database();
      const ref = db.ref("vessels");

      const firebaseLocationsRef = ref.child("locations");

      firebaseLocationsRef.on(
        "value",
        (snapshot) => {
          const data = snapshot.val();

          console.log(data);
          const locations = mapFirebaseData(data);
          setLocations(locations);
          const lastLocation = locations[locations.length - 1];
          setCurrentPosition(lastLocation);
        },
        (errorObject: any) => {
          console.error(errorObject);
        }
      );
    }
  }, []);

  const patriArrival = new Date(2021, 3, 10);
  const patriDeparture = new Date(2020, 11, 22, 22, 0, 0);

  const daysToPatri = differenceInDays(patriArrival, new Date());

  function foo(timestamp: number) {
    setSliderValue(timestamp);
    const index = findIndexNearestTo2(locations, timestamp);
    const p1 = locations[index];
    const p2 = locations[index + 1];

    if (!p2) {
      setCurrentPosition(p1);
      return;
    }

    const { x, y } = somethingDude(p2, p1, timestamp);

    setCurrentPosition({
      ...p1,
      lat: x,
      lng: y,
      temperature: ((p1.temperature || 0) + (p2.temperature || 0)) / 2,
    });
    setSliderValue(timestamp);
  }

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
        <Polyline positions={polyLinePositions}></Polyline>
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

              foo(timestamp);
            }}
          />
          <p className={styles.countDown}>Patri llega en {daysToPatri} días</p>
          <button
            style={{ display: "none" }}
            onClick={async () => {
              const start = 1610199959804;
              const end = 1610306207605;

              for (let timestamp = start; timestamp < end; timestamp += 50000) {
                await sleep(100);

                foo(timestamp);
              }

              console.log("done");
            }}
          >
            D
          </button>
          <progress
            value={new Date().getTime() - patriDeparture.getTime()}
            max={patriArrival.getTime() - patriDeparture.getTime()}
            className={styles.progress}
          ></progress>
        </div>
        <div className={styles.overlay}></div>
      </div>
    </div>
  );
}

export default App;

function somethingDude(p2: Location, p1: Location, timestamp: number) {
  const b = p2.lat - p1.lat;
  const a = p2.lng - p1.lng;

  if (a === 0 || b === 0) {
    return {
      x: p1.lat,
      y: p1.lng,
    };
  }

  const hip = Math.sqrt(Math.pow(b, 2) + Math.pow(a, 2));
  const timeTookDistance = p2.timestamp - p1.timestamp;

  let angulo = Math.atan(Math.abs(a) / Math.abs(b));
  console.log({ angulo: (angulo * 180) / Math.PI });

  if (a > 0 && b > 0) {
    console.log("zero");
  }

  if (a < 0 && b > 0) {
    angulo = -angulo;
  }

  if (a < 0 && b < 0) {
    angulo += Math.PI / 2;
    angulo += Math.PI / 2;
  }

  if (a > 0 && b < 0) {
    angulo = -angulo + Math.PI;
  }

  const speed = hip / timeTookDistance;

  const middleDuration = timestamp - p1.timestamp;

  const hip2 = speed * middleDuration;

  const x = Math.cos(angulo) * hip2 + p1.lat;
  const y = Math.sin(angulo) * hip2 + p1.lng;

  return { x, y };
}

/*

const db = firebase.database()
      const ref = db.ref("vessels")

      const foo = ref.child("locations")


      foo.on("value", function(snapshot) {
        console.log(snapshot.val());
      }, function (errorObject: any) {
        console.log("The read failed: " + errorObject.code);
      });


      


*/
