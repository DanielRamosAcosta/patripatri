import firebase1 from "firebase";
import { firebaseConfig } from "../config/firebase";

firebase1.initializeApp(firebaseConfig);
firebase1.analytics();

export const firebase = firebase1;
export type FirebaseCollection = firebase1.firestore.CollectionReference<firebase1.firestore.DocumentData>;
