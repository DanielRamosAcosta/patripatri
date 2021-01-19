import { LatLngLiteral } from "leaflet";

export function portIsTooClose(
  currentPostion: LatLngLiteral,
  portPosition: LatLngLiteral,
) {
  const a = currentPostion.lat - portPosition.lat;
  const b = currentPostion.lng - portPosition.lng;

  const c = Math.sqrt(a * a + b * b);

  return c < 0.02;
}
