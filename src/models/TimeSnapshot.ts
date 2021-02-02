import { Position } from "./MyPosition";
import { estimateCoordinatesAtTime } from "../utils/estimateCoordinatesAtTime";

export type TimeSnapshot = {
  timestamp: number;
  temperature: number;
  position: Position;
  arrivalPortId?: string;
};

export function timeSnapshotEstimateAtTime(
  self: TimeSnapshot,
  other: TimeSnapshot,
  time: Date
): TimeSnapshot {
  const coords = estimateCoordinatesAtTime(
    {
      lat: self.position.lat,
      lng: self.position.lng,
      timestamp: self.timestamp,
    },
    {
      lat: other.position.lat,
      lng: other.position.lng,
      timestamp: other.timestamp,
    },
    time.getTime()
  );

  return {
    timestamp: time.getTime(),
    position: {
      lat: coords.lat,
      lng: coords.lng,
    },
    temperature: self.temperature,
    arrivalPortId: self.arrivalPortId,
  };
}
