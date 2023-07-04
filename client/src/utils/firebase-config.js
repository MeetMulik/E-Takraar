import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBFX-DvVLHhiRXA9wGFzM9dOo0zTSBRvlE",
  authDomain: "e-takraar.firebaseapp.com",
  projectId: "e-takraar",
  storageBucket: "e-takraar.appspot.com",
  messagingSenderId: "405263946605",
  appId: "1:405263946605:web:beb572fc290ed3ba8c8064",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { firestore, storage, app };
