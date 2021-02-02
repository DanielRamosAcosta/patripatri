import { VesselLocationNode } from "../firebase/typings";
import { TimeSnapshot } from "../models/TimeSnapshot";

export function mapFirebaseData(data: any) {
  const rawFirebaseLocations = (Object.values(
    data
  ) as any) as VesselLocationNode[];

  return rawFirebaseLocations
    .map(({ data }) => ({
      timestamp: data.lastPos * 1000,
      lat: data.lat,
      lng: data.lon,
      temperature: data.windTemperature,
      arrivalPort: data.arrivalPort,
    }))
    .slice(10, rawFirebaseLocations.length);
}

export function mapFirebaseData2(data: any): TimeSnapshot[] {
  const rawFirebaseLocations = (Object.values(
    data
  ) as any) as VesselLocationNode[];

  return rawFirebaseLocations.map(({ data }) => ({
    position: {
      lat: data.lat,
      lng: data.lon,
    },
    arrivalPortId: data.arrivalPort?.id,
    timestamp: data.lastPos * 1000,
    temperature: data.windTemperature || 0,
  }));
}
