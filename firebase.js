// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyAKoogkyT6Igb259hgWWLUvkx2xkmaMsH4",
  // authDomain: "flashcardsass-3b685.firebaseapp.com",
  // projectId: "flashcardsass-3b685",
  // storageBucket: "flashcardsass-3b685.appspot.com",
  // messagingSenderId: "7808030413",
  // appId: "1:7808030413:web:d4ed68285e789b27d87b84"
  apiKey: "AIzaSyBIJuA_0iTu_v5HFuZOMnqEWxlhlgPNfBw",
  authDomain: "flashcards-3bce5.firebaseapp.com",
  projectId: "flashcards-3bce5",
  storageBucket: "flashcards-3bce5.appspot.com",
  messagingSenderId: "443680447928",
  appId: "1:443680447928:web:b6dd712f317c667a1e434d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
