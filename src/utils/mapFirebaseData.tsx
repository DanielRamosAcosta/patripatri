import { VesselLocationNode } from "../firebase/typings";

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
