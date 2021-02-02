import React, { FC } from "react";
import L from "leaflet";
import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";
import { Position } from "../models/MyPosition";
import { portIsTooClose } from "../utils/portIsTooClose";
import { CenterOnLocationChange } from "./CenterOnLocationChange";
import "./PatriMap.module.css";

const PatriIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + "/patri.png",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const DestinationIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + "/tracking.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

type PatriMapProps = {
  currentPosition: Position;
  nextPortPosition?: Position;
  positions: Position[];
};

export const PatriMap: FC<PatriMapProps> = ({
  currentPosition,
  nextPortPosition,
  positions,
}) => (
  <MapContainer center={currentPosition} zoom={8}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={currentPosition} icon={PatriIcon} />
    {nextPortPosition && !portIsTooClose(currentPosition, nextPortPosition) ? (
      <Marker position={nextPortPosition} icon={DestinationIcon} />
    ) : null}
    <CenterOnLocationChange
      lat={currentPosition.lat}
      lng={currentPosition.lng}
    />
    <Polyline positions={positions.concat(currentPosition)} />
  </MapContainer>
);
