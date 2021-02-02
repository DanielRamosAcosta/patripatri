import { TimeSnapshot } from "./TimeSnapshot";
import { Positions } from "./Positions";
import { findBoundingPointsForTimestamp } from "../utils/findIndexNearestTo";

export type TimeSnapshots = TimeSnapshot[];

export function timeSnapshotsBefore(
  self: TimeSnapshots,
  date: Date
): TimeSnapshots {
  return self.filter((e) => e.timestamp <= date.getTime());
}

export function timeSnapshotsGetPositions(self: TimeSnapshots): Positions {
  return self.map((s) => s.position);
}

export function timeSnapshotsFindBoundingSnapshotsForTimestamp(
  self: TimeSnapshots,
  date: Date
) {
  const { p1, p2 } = findBoundingPointsForTimestamp(self, date.getTime());

  return { left: p1, right: p2 };
}
