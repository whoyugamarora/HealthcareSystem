import firebase from "firebase/compat/app";
import { getFirestore, collection, addDoc, where, query, getDocs } from "firebase/firestore"
import "firebase/compat/auth";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API,
    authDomain: "healthcare-system-30b5d.firebaseapp.com",
    projectId: "healthcare-system-30b5d",
    storageBucket: "healthcare-system-30b5d.firebasestorage.app",
    messagingSenderId: "555395721626",
    appId: "1:555395721626:web:8adaf8816667a6b5913223"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = getFirestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const auth = firebase.auth();
export default firebase;

export const signInWithGoogle = async () => {
    try {
        const res = await auth.signInWithPopup(provider);
        const user = res.user;
        const userRef = collection(db, "users");
        const result = await getDocs(query(userRef, where("uid", "==", user.uid)));
        if (result.empty) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        alert(err.message);
    }
};

export const signInWithEmailAndPassword = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
        alert(err.message);
    }
};

export const registerWithEmailAndPassword = async (displayName, email, password) => {
    try {
        const res = await auth.createUserWithEmailAndPassword(email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            displayName,
            authProvider: "local",
            email,
        });
    } catch (err) {
        alert(err.message);
    }
};
