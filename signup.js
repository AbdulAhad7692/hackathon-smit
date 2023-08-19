
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

const signupButton = document.getElementById('signup-button');


signupButton.addEventListener('click', async (e) => {

    const firstName = document.getElementById('get-firstname').value;
    const lastName = document.getElementById('get-lastname').value;
    const email = document.getElementById('get-email').value;
    const password = document.getElementById('get-password').value;
    const repeatPassword = document.getElementById('get-repeat-password').value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!password.match(passwordRegex)) {
        alert('Password must be at least 8 characters long and include both uppercase and lowercase letters.');
        return; // form mat bharo user ko bhejo wapis
    }

    // Check passwoword karo match hua ya nahi
    if (password !== repeatPassword) {
        alert('Passwords do not match.');
        return; // form mat bharo user ko bhejo wapis
    }
    if (email.indexOf('@') === -1) {
        alert('Please enter a valid email address.');
        return; // form mat bharo user ko wapis bhejo
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;


        const collectionRef = collection(db, 'users');
        await addDoc(collectionRef, {
            firstName: firstName,
            lastName: lastName,
            email: email,
        });

        console.log("Data written successfully");


        window.location.href = 'main.html';
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
    }
});


onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        window.location.href = 'main.html';

    } else {
        //blah blah blah
    }
});