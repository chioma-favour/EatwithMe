// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB_qjPzOVdk9JpJ1QC_2LHyTMeGiPdx6Vc",
  authDomain: "eatwithme-d8f67.firebaseapp.com",
  projectId: "eatwithme-d8f67",
  storageBucket: "eatwithme-d8f67.firebasestorage.app",
  messagingSenderId: "966824605610",
  appId: "1:966824605610:web:eb7bf2fb13644ac0f29dd3",
  measurementId: "G-YL60MCZDC6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);