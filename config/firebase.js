// /config/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env. FIREBASE_API_KEY,
  authDomain: "eatwithme-d8f67.firebaseapp.com",
  projectId: "eatwithme-d8f67",
  storageBucket: "eatwithme-d8f67.appspot.com",
  messagingSenderId: "966824605610",
  appId: "1:966824605610:web:eb7bf2fb13644ac0f29dd3",
  measurementId: "G-YL60MCZDC6"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
