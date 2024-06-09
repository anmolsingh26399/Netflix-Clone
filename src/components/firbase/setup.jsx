import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLb6fUNnt33Y-yqPuGbEzx_075-8fW-mE",
  authDomain: "netflix-clone-6d8e0.firebaseapp.com",
  projectId: "netflix-clone-6d8e0",
  storageBucket: "netflix-clone-6d8e0.appspot.com",
  messagingSenderId: "524835628704",
  appId: "1:524835628704:web:c4f02022ebcde27025cbc5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();
export const database = getFirestore(app);
