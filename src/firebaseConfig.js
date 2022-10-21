// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBg3sVOpNy4Q53N6VLlhGjQ1Q-OhXsSwvc",
    authDomain: "fir-b640d.firebaseapp.com",
    projectId: "fir-b640d",
    storageBucket: "fir-b640d.appspot.com",
    messagingSenderId: "1079168150716",
    appId: "1:1079168150716:web:82c9bfc95edf89481bb4b9",
    measurementId: "G-HQS584PJWV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;