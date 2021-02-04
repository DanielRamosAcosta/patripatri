import { findIndexNearestTo } from "./findIndexNearestTo";
import mock from "../repositories/time-snapshot-cache.json";
import { mapFirebaseData } from "./mapFirebaseData";

const locations = mapFirebaseData(mock);

describe("findIndexNearestTo", () => {
  it("find the nearest location", () => {
    const index = findIndexNearestTo(locations, 1609752999920);

    expect(index).toEqual(2012);
  });

  it("finds the next one", () => {
    const index = findIndexNearestTo(locations, 1609634555996);

    expect(index).toEqual(2012);
  });

  it("finds the next after more time", () => {
    const index = findIndexNearestTo(locations, 1609755737930);

    expect(index).toEqual(2020);
  });
});
