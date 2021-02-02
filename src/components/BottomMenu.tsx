import { TimeSnapshot } from "../models/TimeSnapshot";
import { PortInfo } from "../utils/portsMapInfo";
import styles from "./BottomMenu.module.css";
import React, { useState } from "react";

const MIN_TIME_RANGE = 1608802672283;
const HOUR_IN_MILLIS = 1000 * 60 * 60;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function BottomMenu(props: {
  currentPosition: TimeSnapshot;
  nextPort?: PortInfo;
  onChange: (e: number) => void;
  daysToPatri: number;
  patriDeparture: Date;
  patriArrival: Date;
}) {
  const MAX_TIME_RANGE = Date.now();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={styles.bottomMenu}>
      <div className={styles.menuContent}>
        <p className={styles.dates}>
          {new Date(props.currentPosition.timestamp).toLocaleString()}
          {props.currentPosition.temperature != null
            ? ` | ${props.currentPosition.temperature}ºC`
            : null}
          {" | "}
          {props.nextPort
            ? `${props.nextPort.city} (${props.nextPort.country})`
            : null}
        </p>
        <input
          type="range"
          min={MIN_TIME_RANGE}
          max={MAX_TIME_RANGE}
          value={props.currentPosition.timestamp}
          onChange={(e) => {
            const timestamp = parseInt(e.target.value);
            props.onChange(timestamp);
          }}
        />
        <div
          style={{ display: "flex", alignItems: "center", gap: 10 }}
          onClick={async () => {
            if (isPlaying) {
              return;
            }

            setIsPlaying(true);

            for (
              let i = MIN_TIME_RANGE;
              i < MAX_TIME_RANGE;
              i += HOUR_IN_MILLIS
            ) {
              await sleep(100);
              console.log("Is playing", isPlaying);

              props.onChange(i);
            }

            setIsPlaying(false);
          }}
        >
          <button>Ver el viaje</button>
          <p className={styles.countDown}>
            Patri llega en {props.daysToPatri} días
          </p>
        </div>
        <progress
          value={new Date().getTime() - props.patriDeparture.getTime()}
          max={props.patriArrival.getTime() - props.patriDeparture.getTime()}
          className={styles.progress}
        />
      </div>
      <div className={styles.overlay} />
    </div>
  );
}
