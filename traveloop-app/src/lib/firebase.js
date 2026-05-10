// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAR7HFdg-KK5hyXN0nZc8NW8EAPZLo2gL4",
    authDomain: "traveloop-d1b43.firebaseapp.com",
    projectId: "traveloop-d1b43",
    storageBucket: "traveloop-d1b43.firebasestorage.app",
    messagingSenderId: "750624799696",
    appId: "1:750624799696:web:6ff957102d4f5a143817d5",
    measurementId: "G-L5W0EC0CPT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);