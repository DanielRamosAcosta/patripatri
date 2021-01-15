export type MarineTrafficPort = {
  code: string;
  countryCode: string;
  id: string;
  name: string;
  offset: number;
  timestamp: number;
  timestampLabel: string;
};

export type MarineTrafficLocation = {
  areaCode: string;
  areaName: string;
  arrivalPort?: MarineTrafficPort;
  course: number;
  departurePort: MarineTrafficPort;
  draughtReported: number;
  hasNewerSatellitePosition: boolean;
  isEligibleToRequestInmarsat: boolean;
  isVesselInRange: boolean;
  lastPos: number;
  lat: number;
  lon: number;
  shipStatus: string;
  sourceType: string;
  speed: number;
  stationId: string;
  stationOperator: string;
  timezoneOffset: number;
  windAngle: number;
  windSpeed: number;
  windTemperature: number;
};

export type VesselLocationNode = {
  data: MarineTrafficLocation;
  timestamp: number;
};
