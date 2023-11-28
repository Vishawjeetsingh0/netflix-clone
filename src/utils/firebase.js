// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDA-1ejmg5J0oOTqMGhwg4JR7vZFuoGhJY",
  authDomain: "netflix-clone-12058.firebaseapp.com",
  projectId: "netflix-clone-12058",
  storageBucket: "netflix-clone-12058.appspot.com",
  messagingSenderId: "671004100711",
  appId: "1:671004100711:web:f04b808dd3649848956cc2",
  measurementId: "G-ZVV4KQVDZH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
