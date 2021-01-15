import { VesselLocationNode } from "../firebase/typings";
import { Location } from "../models/Location";

export function mapFirebaseData(data: any) {
  const rawFirebaseLocations = (Object.values(
    data
  ) as any) as VesselLocationNode[];

  return rawFirebaseLocations
    .map(({ data, timestamp }) => {
      const newLocal = {
        timestamp: data.lastPos * 1000,
        lat: data.lat,
        lng: data.lon,
        temperature: data.windTemperature,
        arrivalPort: data.arrivalPort,
      };
      return newLocal;
    })
    .slice(10, rawFirebaseLocations.length);
}
