// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNMLjYZPtX1Jz3M7-Ug_r2wx6uA8VJixQ",
  authDomain: "bookmuhasaba.firebaseapp.com",
  projectId: "bookmuhasaba",
  storageBucket: "bookmuhasaba.firebasestorage.app",
  messagingSenderId: "201107723863",
  appId: "1:201107723863:web:6216c37ab05862067f3512"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

export default app;