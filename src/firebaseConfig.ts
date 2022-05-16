import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAL54Yt2Zz8nJ-5aiB0PFt3vDYD4bv8HGI",
    authDomain: "elekid-5410f.firebaseapp.com",
    projectId: "elekid-5410f",
    storageBucket: "elekid-5410f.appspot.com",
    messagingSenderId: "169746207542",
    appId: "1:169746207542:web:3b8f92ae9cc1d7f5761997",
    measurementId: "G-J348RDEHNC"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore()