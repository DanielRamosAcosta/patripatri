import { findIndexNearestTo } from "./findIndexNearestTo";
import { TimeSnapshots } from "../models/TimeSnapshots";
import { TimeSnapshot } from "../models/TimeSnapshot";
import { cleanTimeSnapshots } from "./cleanTimeSnapshot";

describe("findIndexNearestTo", () => {
  it("does nothing if already sorted", () => {
    const timeSnapshots: TimeSnapshots = [
      createTimeSnapshot({ timestamp: 1 }),
      createTimeSnapshot({ timestamp: 2 }),
      createTimeSnapshot({ timestamp: 3 }),
    ];

    const result = cleanTimeSnapshots(timeSnapshots);

    expect(result[0].timestamp).toEqual(1);
    expect(result[1].timestamp).toEqual(2);
    expect(result[2].timestamp).toEqual(3);
  });

  it("sorts by timestamp", () => {
    const timeSnapshots: TimeSnapshots = [
      createTimeSnapshot({ timestamp: 3 }),
      createTimeSnapshot({ timestamp: 1 }),
      createTimeSnapshot({ timestamp: 2 }),
    ];

    const result = cleanTimeSnapshots(timeSnapshots);

    expect(result[0].timestamp).toEqual(1);
    expect(result[1].timestamp).toEqual(2);
    expect(result[2].timestamp).toEqual(3);
  });

  it("remove duplicates", () => {
    const timeSnapshots: TimeSnapshots = [
      createTimeSnapshot({ timestamp: 1 }),
      createTimeSnapshot({ timestamp: 2 }),
      createTimeSnapshot({ timestamp: 2 }),
      createTimeSnapshot({ timestamp: 3 }),
    ];

    const result = cleanTimeSnapshots(timeSnapshots);

    expect(result[0].timestamp).toEqual(1);
    expect(result[1].timestamp).toEqual(2);
    expect(result[2].timestamp).toEqual(3);
  });
});

function createTimeSnapshot({ timestamp = 0 } = {}): TimeSnapshot {
  return {
    timestamp,
    temperature: 0,
    position: { lat: 0, lng: 0 },
    arrivalPortId: "any",
  };
}
