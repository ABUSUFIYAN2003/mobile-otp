import 'firebase/auth'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAv8uFj-IH_MqEp5FSvdOeNM9wCMmGxVJc",
    authDomain: "otp-project-b6db1.firebaseapp.com",
    projectId: "otp-project-b6db1",
    storageBucket: "otp-project-b6db1.appspot.com",
    messagingSenderId: "1023589509084",
    appId: "1:1023589509084:web:2093c3067c295d248ed119",
    measurementId: "G-1EWKMDX5BT"
};

// Initialize Firebase
const firebase_init = initializeApp(firebaseConfig);

export default firebase_init