// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, GithubAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAueFduOgG4QXITSv5Il3PKtGZa_SnLsH8",
    authDomain: "tpfprojectsm.firebaseapp.com",
    projectId: "tpfprojectsm",
    storageBucket: "tpfprojectsm.appspot.com",
    messagingSenderId: "529539665698",
    appId: "1:529539665698:web:341b83aef902963d5e1f7b",
    measurementId: "G-V47XKHTKP0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GithubAuthProvider();

const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");

const userSignIn = async () => {
    signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        console.log(user);
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Sign Out Error:", errorMessage);
        alert("Sign Out Error: " + errorMessage);
    })
}

const userSignOut = async () => {
    signOut(auth).then(() => {
        alert("You have been signed out!")
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Sign Out Error:", errorMessage);
        alert("Sign Out Error: " + errorMessage);
    })
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        alert("You are authenticated with GitHub");
        if (document.getElementById('exampleInputEmail1').value == "") {
            const email = document.getElementById('exampleInputEmail1');
            email.value = user.email;
        }
        if (document.getElementById('firstName').value == "") {
            const firstName = document.getElementById('firstName');
            firstName.value = user.displayName.split(' ')[0];
        }
        if (document.getElementById('lastName').value == "") {
            const lastName = document.getElementById('lastName');
            lastName.value = user.displayName.split(' ')[1];
        }

    }
})

signInButton.addEventListener("click", userSignIn);
signOutButton.addEventListener("click", userSignOut);
