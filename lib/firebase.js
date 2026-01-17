import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnaRVHclblzwvFHCCHFNSP_E1rvakn0do",
  authDomain: "pdc-proj-647b8.firebaseapp.com",
  projectId: "pdc-proj-647b8",
  storageBucket: "pdc-proj-647b8.firebasestorage.app",
  messagingSenderId: "1062870515648",
  appId: "1:1062870515648:web:76a0d48aa195855a009225"
};

const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
