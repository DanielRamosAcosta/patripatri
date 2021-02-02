import { TimeSnapshot } from "../models/TimeSnapshot";

export interface Repositories {
  getLastTimeSnapshot(): Promise<TimeSnapshot>;
  getTimeSnapshots(): Promise<TimeSnapshot[]>;
  subscribeToNewerLocations(
    afterDate: Date,
    cb: (locations: TimeSnapshot[]) => void
  ): void;
}
