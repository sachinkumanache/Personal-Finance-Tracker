import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // 🔑 Import auth

const firebaseConfig = {
  apiKey: "AIzaSyBulEjd2OpgjmjWUvso-3ts8uqOXQ4RrtE",
  authDomain: "personalfinanacetracker.firebaseapp.com",
  projectId: "personalfinanacetracker",
  storageBucket: "personalfinanacetracker.firebasestorage.app",
  messagingSenderId: "691785852805",
  appId: "1:691785852805:web:886c951fb4c532270406ec",
  measurementId: "G-M5JF9ZC08E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export Firebase Authentication instance
export const auth = getAuth(app);
