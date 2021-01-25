import { LatLngLiteral } from "leaflet";

const VERY_NEAR_EPSILON = 0.02;

export function portIsTooClose(
  currentPosition: LatLngLiteral,
  portPosition: LatLngLiteral
) {
  const a = currentPosition.lat - portPosition.lat;
  const b = currentPosition.lng - portPosition.lng;

  const distance = Math.sqrt(a * a + b * b);

  return distance < VERY_NEAR_EPSILON;
}
