const firebase = require("firebase");
const fs = require("fs");
const path = require("path");

const firebaseConfig = {
  apiKey: "AIzaSyBThWjVqdQVhkOm-P4VwtOkK1XvoQBFjBs",
  authDomain: "patri-chaser.firebaseapp.com",
  databaseURL:
    "https://patri-chaser-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "patri-chaser",
  storageBucket: "patri-chaser.appspot.com",
  messagingSenderId: "191999461469",
  appId: "1:191999461469:web:d17e4c14ed1ea2f1e0a5b4",
  measurementId: "G-YL17SVHMQY",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const ref = db.ref("vessels");

const firebaseLocationsRef = ref.child("locations");

firebaseLocationsRef.on(
  "value",
  (snapshot) => {
    const data = snapshot.val();

    fs.writeFileSync(path.join(__dirname, "mock.json"), JSON.stringify(data));
    process.exit(0);
  },
  (errorObject) => {
    console.error(errorObject);
  }
);
