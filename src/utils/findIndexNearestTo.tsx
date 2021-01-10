import { Location } from "../models/Location";

export function findIndexNearestTo(locations: Location[], timestamp: number) {
  let last = 0;
  let lastDistance = 900000000000000;

  for (let i = 0; i < locations.length; i++) {
    const currentLocation = locations[i];

    const currentDist = Math.abs(currentLocation.timestamp - timestamp);

    if (currentDist < lastDistance) {
      last = i;
      lastDistance = currentDist;
    }
  }

  return last;
}
