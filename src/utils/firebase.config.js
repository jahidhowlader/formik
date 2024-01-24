// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCWylNFGW4pdag9A9xF1-972HS_PJSHq6A",
    authDomain: "authentication-92f96.firebaseapp.com",
    projectId: "authentication-92f96",
    storageBucket: "authentication-92f96.appspot.com",
    messagingSenderId: "536781523337",
    appId: "1:536781523337:web:8dffa0439150b697bcb958"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = 

const auth = getAuth(app);

export default auth 