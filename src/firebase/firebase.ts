import firebase1 from "firebase";
import { firebaseConfig } from "../config/firebase";

console.log("Inicializando");
firebase1.initializeApp(firebaseConfig);
firebase1.analytics();
console.log("Listo");

export const firebase = firebase1;
export type FirebaseCollection = firebase1.firestore.CollectionReference<firebase1.firestore.DocumentData>;
