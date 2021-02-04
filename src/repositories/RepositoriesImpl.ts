import { mapFirebaseData2 } from "../utils/mapFirebaseData";
import { Repositories } from "./Repositories";
import { firebase, FirebaseCollection } from "../firebase/firebase";
import { TimeSnapshot } from "../models/TimeSnapshot";

export class RepositoriesImpl implements Repositories {
  private locationsCollection: FirebaseCollection;

  constructor() {
    const db = firebase.firestore();
    this.locationsCollection = db.collection("locations");
  }

  async getLastTimeSnapshot(): Promise<TimeSnapshot> {
    const querySnapshot = await this.locationsCollection
      .orderBy("timestamp", "desc")
      .limit(1)
      .get();

    const data = querySnapshot.docs.map((el) => el.data());

    const newerLocations = mapFirebaseData2(data);

    return newerLocations[0];
  }

  async getTimeSnapshots(): Promise<TimeSnapshot[]> {
    const data = await import("./time-snapshot-cache.json");

    return mapFirebaseData2(data.default);
  }

  subscribeToNewerLocations(
    afterDate: Date,
    callback: (locations: TimeSnapshot[]) => void
  ): void {
    this.locationsCollection
      .orderBy("timestamp")
      .where("timestamp", ">", afterDate.getTime())
      .onSnapshot((snapshot) => {
        const newerLocations = mapFirebaseData2(
          snapshot.docs.map((el) => el.data())
        );

        callback(newerLocations);
      });
  }
}
