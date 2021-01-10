import { FC, useEffect } from "react";
import { useMap } from "react-leaflet";

export const CenterOnLocationChange: FC<{ lat: number; lng: number }> = ({
  lat,
  lng,
}) => {
  const map = useMap();

  useEffect(() => {
    const zoom = map.getZoom();
    map.setView({ lat, lng }, zoom);
  }, [lat, lng]);

  return null;
};
