import { TimeSnapshots } from "../models/TimeSnapshots";

export function cleanTimeSnapshots(
  timeSnapshots: TimeSnapshots
): TimeSnapshots {
  return [
    ...uniqueElementsBy(timeSnapshots, (a, b) => a.timestamp === b.timestamp),
  ].sort((a, b) => a.timestamp - b.timestamp);
}

const uniqueElementsBy = <T>(arr: T[], fn: (a: T, b: T) => boolean) =>
  arr.reduce((acc, v) => {
    if (!acc.some((x) => fn(v, x))) acc.push(v);
    return acc;
  }, [] as T[]);
