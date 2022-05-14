// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBgjLlXRw-i6yLPf35KMvUq-HgamxEkXAU",
  authDomain: "uber-next-clone-f817d.firebaseapp.com",
  projectId: "uber-next-clone-f817d",
  storageBucket: "uber-next-clone-f817d.appspot.com",
  messagingSenderId: "939270238037",
  appId: "1:939270238037:web:7333b8acd1004a70c589dc",
  measurementId: "G-E5TCE77KCZ"
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export { app, provider, auth }
