import React, { FC, useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import styles from "./App.module.css";
import "leaflet/dist/leaflet.css";
import mock from "./mock.json";
import { CenterOnLocationChange } from "./components/CenterOnLocationChange";
import { VesselLocationNode } from "./firebase/typings";

export function findIndexNearestTo(timestamp: number) {
  let last = 0;
  let lastDistance = 900000000000000;

  for (let i = 0; i < locations.length; i++) {
    const currentLocation = locations[i];

    const currentDist = Math.abs(currentLocation.timestamp - timestamp);

    if (currentDist < lastDistance) {
      last = i;
      lastDistance = currentDist;
    }
  }

  return last;
}

/*
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBThWjVqdQVhkOm-P4VwtOkK1XvoQBFjBs",
  authDomain: "patri-chaser.firebaseapp.com",
  databaseURL: "https://patri-chaser-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "patri-chaser",
  storageBucket: "patri-chaser.appspot.com",
  messagingSenderId: "191999461469",
  appId: "1:191999461469:web:d17e4c14ed1ea2f1e0a5b4",
  measurementId: "G-YL17SVHMQY"
};

// Use your config values here.
firebase.initializeApp(firebaseConfig);
*/

const PatriIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + "/patri.png",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const rawFirebaseLocations = (Object.values(
  mock
) as any) as VesselLocationNode[];

type Location = {
  timestamp: number;
  lat: number;
  lng: number;
};

const locations = rawFirebaseLocations
  .map(({ data, timestamp }) => {
    const newLocal: Location = {
      timestamp,
      lat: data.lat,
      lng: data.lon,
    };
    return newLocal;
  })
  .slice(10, rawFirebaseLocations.length);

const first = locations[0];
const last = locations[locations.length - 1];

function App() {
  const [locationIndex, setLocationIndex] = useState(locations.length - 1);

  const [sliderValue, setSliderValue] = useState(last.timestamp);

  const realPosition = locations[locationIndex];

  /* useEffect(() => {
      const baz = Object.values(locations);
      const foo = baz as any as MyNode[];

      (async () => {
        for (const data of baz) {
          

          setPosition({
            lat: data.data.lat,
            lng: data.data.lon
          })
          await sleep(10)
        }
      })();

      console.log(foo[0].data.lat);
  }, []) */

  return (
    <div className={styles.map}>
      <MapContainer center={realPosition} zoom={8}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={realPosition} icon={PatriIcon} />
        <CenterOnLocationChange lat={realPosition.lat} lng={realPosition.lng} />
      </MapContainer>
      <div className={styles.bottomMenu}>
        <div className={styles.menuContent}>
          <p className={styles.dates}>
            {new Date(sliderValue).toLocaleString()}
          </p>
          <input
            type="range"
            min={first.timestamp}
            max={last.timestamp}
            value={sliderValue}
            onChange={(e) => {
              const timestamp = parseInt(e.target.value);

              const index = findIndexNearestTo(timestamp);

              setLocationIndex(index);
              setSliderValue(timestamp);
            }}
          />
        </div>
        <div className={styles.overlay}></div>
      </div>
    </div>
  );
}

export default App;

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
