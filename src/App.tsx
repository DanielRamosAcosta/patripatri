import React, { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import styles from "./App.module.css";
import "leaflet/dist/leaflet.css";
import mock from "./mock.json";
import { CenterOnLocationChange } from "./components/CenterOnLocationChange";
import { findIndexNearestTo } from "./utils/findIndexNearestTo";

import firebase from "firebase";
import { mapFirebaseData } from "./utils/mapFirebaseData";

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

// Use your config values here.
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const PatriIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + "/patri.png",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const cachedLocations = mapFirebaseData(mock);

function App() {
  const [locations, setLocations] = useState(cachedLocations);
  const [locationIndex, setLocationIndex] = useState(locations.length - 1);
  const [sliderValue, setSliderValue] = useState(Date.now());

  const position = locations[locationIndex];

  useEffect(() => {
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
        setLocationIndex(locations.length - 1);
      },
      (errorObject: any) => {
        console.error(errorObject);
      }
    );
  }, []);

  return (
    <div className={styles.map}>
      <MapContainer center={position} zoom={8}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={PatriIcon} />
        <CenterOnLocationChange lat={position.lat} lng={position.lng} />
      </MapContainer>
      <div className={styles.bottomMenu}>
        <div className={styles.menuContent}>
          <p className={styles.dates}>
            {new Date(sliderValue).toLocaleString()}
            {position.temperature ? ` | ${position.temperature}ºC` : null}
          </p>
          <input
            type="range"
            min={1608802672283}
            max={Date.now()}
            value={sliderValue}
            onChange={(e) => {
              const timestamp = parseInt(e.target.value);

              const index = findIndexNearestTo(locations, timestamp);

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
