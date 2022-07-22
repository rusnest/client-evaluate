// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBvJ7Sf0PczvHee4izfH_GSI5b99_1S5WM",
    authDomain: "server-38776.firebaseapp.com",
    databaseURL: "https://server-38776-default-rtdb.firebaseio.com",
    projectId: "server-38776",
    storageBucket: "server-38776.appspot.com",
    messagingSenderId: "257329342841",
    appId: "1:257329342841:web:24b2f9f167d1a06fd3a7a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);