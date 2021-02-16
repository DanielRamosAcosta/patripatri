import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import "leaflet/dist/leaflet.css";
import differenceInDays from "date-fns/differenceInDays";
import { portsMapInfo } from "./utils/portsMapInfo";
import { useTimeSnapshots } from "./hooks/useTimeSnapshots";
import { timeSnapshotEstimateAtTime } from "./models/TimeSnapshot";
import {
  timeSnapshotsBefore,
  timeSnapshotsFindBoundingSnapshotsForTimestamp,
  timeSnapshotsGetPositions,
} from "./models/TimeSnapshots";
import { PatriMap } from "./components/PatriMap";
import { BottomMenu } from "./components/BottomMenu";

const PATRI_ARRIVAL_DATE = new Date(2021, 3, 10);
const PATRI_DEPARTURE_DATE = new Date(2020, 11, 22, 22, 0, 0);
const DATS_TO_PATRI = differenceInDays(PATRI_ARRIVAL_DATE, new Date());

function App() {
  const { timeSnapshots, lastTimeSnapshot } = useTimeSnapshots();
  const [currentTimeSnapshot, setCurrentTimeSnapshot] = useState(
    lastTimeSnapshot
  );

  useEffect(() => {
    setCurrentTimeSnapshot(lastTimeSnapshot);
  }, [lastTimeSnapshot]);

  if (!currentTimeSnapshot) {
    return (
      <div>
        <p>Cargando...</p>
      </div>
    );
  }

  const filteredTimeSnapshots = timeSnapshotsBefore(
    timeSnapshots,
    new Date(currentTimeSnapshot.timestamp)
  );
  const polyLinePositions = timeSnapshotsGetPositions(filteredTimeSnapshots);

  const nextPort = portsMapInfo.find(
    (port) => port.id === currentTimeSnapshot.arrivalPortId
  );

  console.log("NEXT PORT", currentTimeSnapshot)

  return (
    <div className={styles.map}>
      <PatriMap
        currentPosition={currentTimeSnapshot.position}
        nextPortPosition={nextPort?.position}
        positions={polyLinePositions}
      />
      <BottomMenu
        currentPosition={currentTimeSnapshot}
        nextPort={nextPort}
        onChange={(timestamp) => {
          const bounds = timeSnapshotsFindBoundingSnapshotsForTimestamp(
            timeSnapshots,
            new Date(timestamp)
          );

          const snapshot = timeSnapshotEstimateAtTime(
            bounds.left,
            bounds.right,
            new Date(timestamp)
          );

          setCurrentTimeSnapshot(snapshot);
        }}
        daysToPatri={DATS_TO_PATRI}
        patriDeparture={PATRI_DEPARTURE_DATE}
        patriArrival={PATRI_ARRIVAL_DATE}
      />
    </div>
  );
}

export default App;
