import { useEffect, useState } from "react";
import { mapFirebaseData } from "../utils/mapFirebaseData";
import mock from "../mock.json";
import { firebase } from "../firebase/firebase";

const cachedLocations = mapFirebaseData(mock);

const db = firebase.firestore();
const locationsCollection = db.collection("locations");

export function usePatriLocations() {
  const [locations, setLocations] = useState(cachedLocations);

  useEffect(() => {
    const lastLocation = locations[locations.length - 1];

    locationsCollection
      .orderBy("timestamp")
      .where("timestamp", ">", lastLocation.timestamp)
      .onSnapshot((snapshot) => {
        console.log("ON SNAPSHOT");
        const lastOldLocation = locations[locations.length - 1];

        console.log("last old location", lastOldLocation.timestamp);
        const newerLocations = mapFirebaseData(
          snapshot.docs.map((el) => el.data())
        ).filter((e) => e.timestamp > lastOldLocation.timestamp);

        console.log({
          newerLocations: JSON.parse(JSON.stringify(newerLocations)),
        });

        const allLocations = locations.concat(newerLocations);

        setLocations(allLocations);
      });
  }, []);

  const lastLocation = locations[locations.length - 1];

  return { locations, lastLocation };
}
