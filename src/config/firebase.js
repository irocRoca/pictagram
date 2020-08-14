import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBaMnSU_Wwo-DJRyZHMOGPho1Lvl9z8H1U",
  authDomain: "pictagram-43b8a.firebaseapp.com",
  databaseURL: "https://pictagram-43b8a.firebaseio.com",
  projectId: "pictagram-43b8a",
  storageBucket: "pictagram-43b8a.appspot.com",
  messagingSenderId: "934088410606",
  appId: "1:934088410606:web:e3b8906feab19c3c403aff",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const fbStorage = firebase.storage();
const db = firebase.firestore();
const auth = firebase.auth();
const timeStamp = firebase.firestore.FieldValue.serverTimestamp;

export { db, fbStorage, auth, timeStamp };
