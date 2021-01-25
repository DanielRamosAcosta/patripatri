export type PositionAtTime = {
  lat: number;
  lng: number;
  timestamp: number;
};

export function estimateCoordinatesAtTime(
  p2: PositionAtTime,
  p1: PositionAtTime,
  timestamp: number
): PositionAtTime {
  const angle = calculateAngle(p1, p2);
  const speed = calculateSpeed(p1, p2);

  const duration = calculateDuration(timestamp, p1);

  const distanceTraveledEstimation = speed * duration;

  const lat = Math.cos(angle) * distanceTraveledEstimation + p1.lat;
  const lng = Math.sin(angle) * distanceTraveledEstimation + p1.lng;

  return { lat, lng, timestamp };
}

function calculateSpeed(p1: PositionAtTime, p2: PositionAtTime) {
  const b = p2.lat - p1.lat;
  const a = p2.lng - p1.lng;

  const hip = Math.sqrt(Math.pow(b, 2) + Math.pow(a, 2));
  const timeTookDistance = p2.timestamp - p1.timestamp;

  const speed = hip / timeTookDistance;

  return speed;
}

function calculateAngle(p1: PositionAtTime, p2: PositionAtTime) {
  const distanceLatitude = p2.lat - p1.lat;
  const distanceLongitude = p2.lng - p1.lng;

  return Math.atan2(distanceLongitude, distanceLatitude);
}

function calculateDuration(timestamp: number, p1: PositionAtTime) {
  return timestamp - p1.timestamp;
}
