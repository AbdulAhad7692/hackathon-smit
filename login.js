
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
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



const loginButton = document.getElementById('login-button');
loginButton.addEventListener('click', async (e) => {
    var userEmail = document.getElementById('email').value;
    var userPassword = document.getElementById('password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, userEmail, userPassword);
        const user = userCredential.user;
        const dt = new Date();

        // last login ke yime ko firebase mein dalo


        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
            lastLogin: dt
        });

        console.log("Last login timestamp updated successfully");

        // jaise hi user login ho main mein bhejdo

        window.location.href = 'main.html';
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
    }
});
