import { Location } from "../models/Location";

function binarySearch<T extends { timestamp: number }>(
  locations: T[],
  timestamp: number
): T {
  if (locations.length === 1) {
    return locations[0];
  }

  const middle = Math.floor(locations.length / 2);

  const lowerPart = locations.slice(0, middle);
  const upperPart = locations.slice(middle, locations.length);

  const pivot = lowerPart[lowerPart.length - 1];

  if (timestamp > pivot.timestamp) {
    return binarySearch(upperPart, timestamp);
  } else {
    return binarySearch(lowerPart, timestamp);
  }
}

export function findIndexNearestTo<T extends { timestamp: number }>(
  locations: T[],
  timestamp: number
) {
  const element = binarySearch(locations, timestamp);

  return locations.indexOf(element) - 1;
}

export function findBoundingPointsForTimestamp<T extends { timestamp: number }>(
  locations: T[],
  timestamp: number
) {
  const index = findIndexNearestTo(locations, timestamp);

  const p1 = locations[index];
  const p2 = locations[index + 1];

  if (!p2) {
    return {
      p1,
      p2: p1,
    };
  }

  return { p1, p2 };
}
