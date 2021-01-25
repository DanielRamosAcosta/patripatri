import { Location } from "../models/Location";

export function findIndexNearestTo(locations: Location[], timestamp: number) {
  for (let i = 0; i < locations.length; i++) {
    if (locations[i].timestamp > timestamp) {
      return i - 1;
    }
  }

  return locations.length - 1;
}
