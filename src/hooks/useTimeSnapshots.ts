import { useEffect, useState } from "react";
import { useRepositories } from "./useRepositories";
import { TimeSnapshot } from "../models/TimeSnapshot";
import { TimeSnapshots } from "../models/TimeSnapshots";

export function useTimeSnapshots(): {
  timeSnapshots: TimeSnapshots;
  lastTimeSnapshot: TimeSnapshot | null;
} {
  const [timeSnapshots, setTimeSnapshots] = useState<TimeSnapshots>([]);
  const [
    timeSnapshotsFromListener,
    setTimeSnapshotsFromListener,
  ] = useState<TimeSnapshots>([]);
  const { repositories } = useRepositories();

  useEffect(() => {
    const last = timeSnapshots[timeSnapshots.length - 1];
    const newer = timeSnapshotsFromListener.filter(
      (el) => el.timestamp > last.timestamp
    );

    console.log({ newer });

    setTimeSnapshots([...timeSnapshots, ...newer]);
  }, [timeSnapshotsFromListener]);

  useEffect(() => {
    Promise.resolve()
      .then(() => repositories.getLastTimeSnapshot())
      .then((timeSnapshot) => {
        setTimeSnapshots([timeSnapshot]);
      })
      .then(() => repositories.getTimeSnapshots())
      .then((timeSnapshots) => {
        setTimeSnapshots(timeSnapshots);

        return new Date(timeSnapshots[timeSnapshots.length - 1].timestamp);
      })
      .then((lastTimestamp) => {
        repositories.subscribeToNewerLocations(
          lastTimestamp,
          setTimeSnapshotsFromListener
        );
      });
  }, []);

  const lastTimeSnapshot = timeSnapshots[timeSnapshots.length - 1];

  return { timeSnapshots, lastTimeSnapshot };
}
