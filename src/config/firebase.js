import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQ5iu2dG1pm7CSQT6chCg_9vg9DSx2MP0",
    authDomain: "curious-e5c8d.firebaseapp.com",
    projectId: "curious-e5c8d",
    storageBucket: "curious-e5c8d.firebasestorage.app",
    messagingSenderId: "363360752878",
    appId: "1:363360752878:web:1be040f1b830fa1303cfff",
    measurementId: "G-2ET4CMX2Z8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
