import firebase1 from "firebase";
import { firebaseConfig } from "../config/firebase";

firebase1.initializeApp(firebaseConfig);
firebase1.analytics();

export const firebase = firebase1;