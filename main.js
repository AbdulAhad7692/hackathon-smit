

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js"
import { doc, getFirestore, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"

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

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app);

const logoutButton = document.getElementById('logout-button');

logoutButton.addEventListener('click', (e) => {
    signOut(auth)
        .then(() => {
            // Sign-out successful.
            window.location = 'login.html'
        }).catch((error) => {
            // An error happened.
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
});

let user;
let userFullName;

auth.onAuthStateChanged((currentUser) => {
    user = currentUser;

    if (user) {
        const userUID = user.uid;
        console.log("User UID:", userUID);

        const userRef = doc(db, 'users', userUID);

        getDoc(userRef)
            .then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    const userData = docSnapshot.data();
                    userFullName = userData.firstName + ' ' + userData.lastName;

                    const navTextElement = document.querySelector('.nav-text');
                    navTextElement.textContent = userFullName;
                } else {
                    console.log('User data not found in Firestore.');
                }
            })
            .catch((error) => {
                console.error('Error retrieving user data:', error);
            });
    } else {
        // User is not authenticated
        console.log("User is not authenticated.");
    }
});

// Text area form validation

const textarea = document.getElementById('textarea-input');
const charCount = document.getElementById('charCount');

textarea.addEventListener('input', function () {
    const text = this.value;
    const textLength = text.length;

    if (textLength < 100) {
        this.setCustomValidity('Minimum character limit is 100');
    } else if (textLength > 3000) {
        this.value = text.slice(0, 3000);
        this.setCustomValidity('Maximum character limit is 3000');
    } else {
        this.setCustomValidity('');
    }

    charCount.textContent = `Characters remaining: ${3000 - textLength}`;
});

const publishBlog = document.getElementById('publish-blog')

publishBlog.addEventListener('click', async () => {

    if (!user) {
        console.error('User is not defined');
        return;
    }

    const title = document.getElementById('title-input').value;
    const textarea = document.getElementById('textarea-input').value;

    let blogItem = document.createElement('li')
    let date = new Date()
    blogItem.className = 'list'

    if (title.trim() === '' || textarea.trim() === '') {
        alert('Both Title and Textarea are required.');
        return
    }
    if (title.trim() === '') {
        alert('Enter Title First')
        return
    }
    if (textarea.trim() === '') {
        alert('Enter Title First')
    }
    if (title.length < 5 || title.length > 50) {
        alert('Title should be between 5 and 50 characters')
        return
    }
    if (textarea.length < 100) {
        alert('Blog should be at least 100 characters long')
        return
    }
    if (textarea.length > 3000) {
        alert('Blog should not exceed 3000 characters long')
    }
    blogItem.innerHTML = `
    <div class="uploaded-blog">
        <div class="upper-sec">
            <div class="profile"><img class="img" src="IMG_5861.jpg"></div>
            <div class="name-sec">
                <div class="title-div">
                    <p class="title">${title}</p>
                </div>
                <p class="name-date">${userFullName} on ${moment(date).format('lll')}</p >
            </div >
        </div >
        <div class="blogpubmain">
            <p class='textareavalue'>${textarea}</p>
        </div>
        <div class='btns'>
        <button class='edit-btn'>Edit</button>
        <button class='delete-btn'>Delete</button>
        </div>
        
    </div >
        `;
    const blogList = document.getElementById('list');
    blogList.appendChild(blogItem);

    // Add last added item at the top
    blogList.insertBefore(blogItem, blogList.firstChild);

    // Empty input fields
    document.getElementById('title-input').value = '';
    document.getElementById('textarea-input').value = '';

    const blogRef = doc(db, 'blog', user.uid);
    await setDoc(blogRef, {
        title: title,
        blog: textarea,
    });
});
