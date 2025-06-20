import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACopSUkJON6Xqc-goePXcOLtAxJRZQqdg",
  authDomain: "one-by-one-7f30c.firebaseapp.com",
  projectId: "one-by-one-7f30c",
  storageBucket: "one-by-one-7f30c.firebasestorage.app",
  messagingSenderId: "917972669749",
  appId: "1:917972669749:web:1f5d749741c1efe102e87c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
