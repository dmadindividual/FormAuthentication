// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBImISQcmMUK9E6G2YxeJk7vZeyaD9-sRY",
  authDomain: "fir-frontend-df0cf.firebaseapp.com",
  projectId: "fir-frontend-df0cf",
  storageBucket: "fir-frontend-df0cf.appspot.com",
  messagingSenderId: "720385313749",
  appId: "1:720385313749:web:8d6c68d870c31135cb0b5c",
  measurementId: "G-TM7XEKB8XT"
};
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app)