import { useEffect, useState } from "react";
import { useRepositories } from "./useRepositories";
import { TimeSnapshot } from "../models/TimeSnapshot";
import { TimeSnapshots } from "../models/TimeSnapshots";
import { cleanTimeSnapshots } from "../utils/cleanTimeSnapshot";

export function useTimeSnapshots(): {
  timeSnapshots: TimeSnapshots;
  lastTimeSnapshot: TimeSnapshot | null;
} {
  const localCache = localStorage.getItem("timeSnapshots");
  const defaultValue = localCache ? JSON.parse(localCache) : [];

  const [timeSnapshots, setTimeSnapshots] = useState<TimeSnapshots>(
    defaultValue
  );
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
    async function effect() {
      let timeSnapshots: TimeSnapshot[] = defaultValue;
      console.log("asking getLastTimeSnapshot");
      const lastTimeSnapshot = await repositories.getLastTimeSnapshot();
      timeSnapshots = cleanTimeSnapshots([...timeSnapshots, lastTimeSnapshot]);
      setTimeSnapshots(timeSnapshots);

      const cachedTimeSnapshots = await repositories.getTimeSnapshots();
      timeSnapshots = cleanTimeSnapshots([
        ...timeSnapshots,
        ...cachedTimeSnapshots,
      ]);
      setTimeSnapshots(timeSnapshots);

      console.log("asking subscribeToNewerLocations");
      repositories.subscribeToNewerLocations(
        new Date(timeSnapshots[timeSnapshots.length - 1].timestamp),
        setTimeSnapshotsFromListener
      );
    }

    effect();
  }, []);

  localStorage.setItem("timeSnapshots", JSON.stringify(timeSnapshots));

  const lastTimeSnapshot = timeSnapshots[timeSnapshots.length - 1];

  return { timeSnapshots, lastTimeSnapshot };
}
