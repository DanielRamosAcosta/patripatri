import { VesselLocationNode } from "../firebase/typings";
import { Location } from "../models/Location";

export function mapFirebaseData(data: any) {
  const rawFirebaseLocations = (Object.values(
    data
  ) as any) as VesselLocationNode[];

  return rawFirebaseLocations
    .map(({ data, timestamp }) => {
      const newLocal: Location = {
        timestamp,
        lat: data.lat,
        lng: data.lon,
        temperature: data.windTemperature,
      };
      return newLocal;
    })
    .slice(10, rawFirebaseLocations.length);
}
