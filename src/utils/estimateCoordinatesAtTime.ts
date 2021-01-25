export type PositionAtTime = {
  lat: number;
  lng: number;
  timestamp: number;
};

export function estimateCoordinatesAtTime(
  p2: PositionAtTime,
  p1: PositionAtTime,
  timestamp: number
) {
  const b = p2.lat - p1.lat;
  const a = p2.lng - p1.lng;

  console.log({ a, b });

  const hip = Math.sqrt(Math.pow(b, 2) + Math.pow(a, 2));
  const timeTookDistance = p2.timestamp - p1.timestamp;

  let angulo = Math.atan(Math.abs(a) / Math.abs(b));
  console.log({ angulo: (angulo * 180) / Math.PI });

  if (a > 0 && b > 0) {
    console.log("zero");
  }

  if (a < 0 && b > 0) {
    angulo = -angulo;
  }

  if (a < 0 && b < 0) {
    angulo += Math.PI / 2;
    angulo += Math.PI / 2;
  }

  if (a > 0 && b < 0) {
    angulo = -angulo + Math.PI;
  }

  if (a < 0 && b === 0) {
    angulo = (Math.PI / 2) * 3;
  }

  const speed = hip / timeTookDistance;

  const middleDuration = timestamp - p1.timestamp;

  const hip2 = speed * middleDuration;

  if (a === 0 && b < 0) {
    angulo = Math.PI;
  }

  console.log("distance", hip2);

  const x = Math.cos(angulo) * hip2 + p1.lat;
  const y = Math.sin(angulo) * hip2 + p1.lng;

  return { x, y };
}
