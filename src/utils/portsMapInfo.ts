import { LatLngLiteral } from "leaflet";

export type PortInfo = {
  id: string;
  position: LatLngLiteral;
  country: string;
  city: string;
};

export const portsMapInfo: PortInfo[] = [
  {
    id: "3302",
    country: "España",
    city: "Algeciras",
    position: {
      lat: 36.17549129756906,
      lng: -5.418971717099447,
    },
  },
  {
    id: "21826",
    country: "España",
    city: "Algeciras",
    position: {
      lat: 36.17549129756906,
      lng: -5.418971717099447,
    },
  },
  {
    id: "343",
    country: "Suecia",
    city: "Malmo",
    position: {
      lat: 55.617983507540984,
      lng: 13.001871231147542,
    },
  },
  {
    id: "233",
    country: "Polonia",
    city: "Gdynia",
    position: {
      lat: 54.54480274086806,
      lng: 18.509637289041667,
    },
  },
  {
    id: "22450",
    country: "Polonia",
    city: "Puerto de Gdynia",
    position: {
      lat: 54.54480274086806,
      lng: 18.509637289041667,
    },
  },
  {
    id: "771",
    country: "Lituania",
    city: "Klaipėda",
    position: {
      lat: 55.714,
      lng: 21.11567,
    },
  },
  {
    id: "251",
    country: "Irlanda",
    city: "Greenore",
    position: {
      lat: 54.034677,
      lng: -6.133334,
    },
  },
  {
    id: "21652",
    country: "Irlanda",
    city: "Ringaskiddy",
    position: {
      lat: 51.83541,
      lng: -8.330348,
    },
  },
  {
    id: "2036",
    country: "Países Bajos",
    city: "Róterdam",
    position: {
      lat: 51.90404732155975,
      lng: 4.356333,
    },
  },
  {
    id: "2104",
    country: "Países Bajos",
    city: "Vlaardingen",
    position: {
      lat: 51.90404732155975,
      lng: 4.356333,
    },
  },
  {
    id: "502",
    country: "Francia",
    city: "Lorient",
    position: {
      lat: 47.734040,
      lng: -3.362030,
    },
  },
  {
    id: "89",
    country: "Francia",
    city: "Nantes",
    position: {
      lat: 47.213910,
      lng: -1.541655,
    },
  },
  {
    id: "122",
    country: "Bélgica",
    city: "Ghent",
    position: {
      lat: 51.119525,
      lng: 3.766277,
    },
  },
];
