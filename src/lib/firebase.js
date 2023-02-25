import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAQ2sknzTkSIwiwakW5Q67mmfdV0tKIc_c",
    authDomain: "itc-blogging.firebaseapp.com",
    projectId: "itc-blogging",
    storageBucket: "itc-blogging.appspot.com",
    messagingSenderId: "303047000277",
    appId: "1:303047000277:web:f8bccc260ee2b6dab7225c",
    measurementId: "G-B67D34W5TR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth };
