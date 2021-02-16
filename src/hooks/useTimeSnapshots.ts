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
    setTimeSnapshots(cleanTimeSnapshots([...timeSnapshots, ...timeSnapshotsFromListener]));
  }, [timeSnapshotsFromListener]);

  useEffect(() => {
    async function effect() {
      let timeSnapshots: TimeSnapshot[] = defaultValue;
      console.log("asking getLastTimeSnapsho");
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
        new Date(cachedTimeSnapshots[cachedTimeSnapshots.length - 1].timestamp),
          locations => {
            console.log("Locations after", new Date(cachedTimeSnapshots[cachedTimeSnapshots.length - 1].timestamp))
            console.log(locations)
            setTimeSnapshotsFromListener(locations)
          }
      );
    }

    effect();
  }, []);

  localStorage.setItem("timeSnapshots", JSON.stringify(timeSnapshots));

  const lastTimeSnapshot = timeSnapshots[timeSnapshots.length - 1];

  return { timeSnapshots, lastTimeSnapshot };
}
