import { Repositories } from "./Repositories";
import { TimeSnapshot } from "../models/TimeSnapshot";
import { mapFirebaseData2 } from "../utils/mapFirebaseData";

export class RepositoriesFake implements Repositories {
  async getLastTimeSnapshot(): Promise<TimeSnapshot> {
    return version2[version2.length - 1];
  }

  async getTimeSnapshots(): Promise<TimeSnapshot[]> {
    const data = await import("./time-snapshot-cache.json");

    return mapFirebaseData2(data.default);
  }

  subscribeToNewerLocations(
    afterDate: Date,
    cb: (locations: TimeSnapshot[]) => void
  ): void {
    setTimeout(() => {
      cb(version1);

      setTimeout(() => {
        cb(version2);
      }, 2000);
    }, 2000);
  }
}

const version1 = [
  {
    position: { lat: 51.8355, lng: -8.330334 },
    arrivalPortId: "21652",
    timestamp: 1612296013000,
    temperature: 11,
  },
  {
    position: { lat: 51.83541, lng: -8.330347 },
    arrivalPortId: "21652",
    timestamp: 1612296191000,
    temperature: 11,
  },
  {
    position: { lat: 51.83541, lng: -8.33034 },
    arrivalPortId: "21652",
    timestamp: 1612296371000,
    temperature: 11,
  },
  {
    position: { lat: 51.83533, lng: -8.330334 },
    arrivalPortId: "21652",
    timestamp: 1612296554000,
    temperature: 11,
  },
  {
    position: { lat: 51.8354, lng: -8.330363 },
    arrivalPortId: "21652",
    timestamp: 1612297993000,
    temperature: 11,
  },
];

const version2 = [
  {
    position: { lat: 51.8355, lng: -8.330334 },
    arrivalPortId: "21652",
    timestamp: 1612296013000,
    temperature: 11,
  },
  {
    position: { lat: 51.83541, lng: -8.330347 },
    arrivalPortId: "21652",
    timestamp: 1612296191000,
    temperature: 11,
  },
  {
    position: { lat: 51.83541, lng: -8.33034 },
    arrivalPortId: "21652",
    timestamp: 1612296371000,
    temperature: 11,
  },
  {
    position: { lat: 51.83533, lng: -8.330334 },
    arrivalPortId: "21652",
    timestamp: 1612296554000,
    temperature: 11,
  },
  {
    position: { lat: 51.8354, lng: -8.330363 },
    arrivalPortId: "21652",
    timestamp: 1612297993000,
    temperature: 11,
  },
  {
    position: { lat: 51.8354, lng: -8.330379 },
    arrivalPortId: "21652",
    timestamp: 1612298172000,
    temperature: 11,
  },
];
