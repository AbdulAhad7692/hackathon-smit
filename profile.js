import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, updatePassword, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, doc, setDoc, updateDoc, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB8Hlp5PoKbOK0Ca97jZIvtcj-hyz-d3zo",
    authDomain: "chat-app-via-login-signup.firebaseapp.com",
    databaseURL: "https://chat-app-via-login-signup-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chat-app-via-login-signup",
    storageBucket: "chat-app-via-login-signup.appspot.com",
    messagingSenderId: "702334443657",
    appId: "1:702334443657:web:e30aa142c57c82b5c32658",
    measurementId: "G-XZJ1WD59HV"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore(app);


const user = await onAuthStateChanged(auth)


window.updatePassword = async (event) => {


    event.preventDefault()

    try {
        const oldPass = document.querySelector(`#oldPass`).value;
        const newPass = document.querySelector(`#newPass`).value;
        const confirmPass = document.querySelector(`#confirmPass`).value;

        if (newPass && confirmPass && newPass === confirmPass) {

            const res = await updatePassword(user, newPass)

        } else {
            alert('Check your confirm Password')

            throw new Error('Check your confirm Password')
        }


    } catch (error) {
        console.log('updatePassword error------------------>', error);
    }
}