import {
  estimateCoordinatesAtTime,
  PositionAtTime,
} from "./estimateCoordinatesAtTime";

describe("estimateCoordinatesAtTime works when going", () => {
  it("north", () => {
    const p1: PositionAtTime = {
      lat: 0,
      lng: 0,
      timestamp: 1000,
    };

    const p2: PositionAtTime = {
      lat: 2,
      lng: 0,
      timestamp: 2000,
    };

    const estimation = estimateCoordinatesAtTime(p1, p2, 1500);

    console.log("estimation", estimation);

    const result = {
      lat: estimation.x,
      lng: estimation.y,
    };

    expect(result.lat).toBeAround(1);
    expect(result.lng).toBeAround(0);
  });

  it("north east", () => {
    const p1: PositionAtTime = {
      lat: 0,
      lng: 0,
      timestamp: 1000,
    };

    const p2: PositionAtTime = {
      lat: 2,
      lng: 2,
      timestamp: 2000,
    };

    const estimation = estimateCoordinatesAtTime(p1, p2, 1500);

    const result = {
      lat: estimation.x,
      lng: estimation.y,
    };

    expect(result.lat).toBeAround(1);
    expect(result.lng).toBeAround(1);
  });

  it("east", () => {
    const p1: PositionAtTime = {
      lat: 0,
      lng: 0,
      timestamp: 1000,
    };

    const p2: PositionAtTime = {
      lat: 0,
      lng: 2,
      timestamp: 2000,
    };

    const estimation = estimateCoordinatesAtTime(p1, p2, 1500);

    console.log("estimation", estimation);

    const result = {
      lat: estimation.x,
      lng: estimation.y,
    };

    expect(result.lat).toBeAround(0);
    expect(result.lng).toBeAround(1);
  });

  it("south east", () => {
    const p1: PositionAtTime = {
      lat: 0,
      lng: 0,
      timestamp: 1000,
    };

    const p2: PositionAtTime = {
      lat: -2,
      lng: 2,
      timestamp: 2000,
    };

    const estimation = estimateCoordinatesAtTime(p1, p2, 1500);

    const result = {
      lat: estimation.x,
      lng: estimation.y,
    };

    expect(result.lat).toBeAround(-1);
    expect(result.lng).toBeAround(1);
  });

  it("south", () => {
    const p1: PositionAtTime = {
      lat: 0,
      lng: 0,
      timestamp: 1000,
    };

    const p2: PositionAtTime = {
      lat: -2,
      lng: 0,
      timestamp: 2000,
    };

    const estimation = estimateCoordinatesAtTime(p1, p2, 1500);

    const result = {
      lat: estimation.x,
      lng: estimation.y,
    };

    expect(result.lat).toBeAround(-1);
    expect(result.lng).toBeAround(0);
  });

  it("south west", () => {
    const p1: PositionAtTime = {
      lat: 0,
      lng: 0,
      timestamp: 1000,
    };

    const p2: PositionAtTime = {
      lat: -2,
      lng: -2,
      timestamp: 2000,
    };

    const estimation = estimateCoordinatesAtTime(p1, p2, 1500);

    const result = {
      lat: estimation.x,
      lng: estimation.y,
    };

    expect(result.lat).toBeAround(-1);
    expect(result.lng).toBeAround(-1);
  });

  it("north west", () => {
    const p1: PositionAtTime = {
      lat: 0,
      lng: 0,
      timestamp: 1000,
    };

    const p2: PositionAtTime = {
      lat: 2,
      lng: -2,
      timestamp: 2000,
    };

    const estimation = estimateCoordinatesAtTime(p1, p2, 1500);

    const result = {
      lat: estimation.x,
      lng: estimation.y,
    };

    expect(result.lat).toBeAround(1);
    expect(result.lng).toBeAround(-1);
  });
});
