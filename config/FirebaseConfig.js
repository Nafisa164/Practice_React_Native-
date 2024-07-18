// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmIFbfpMPmJuODjU8sF8a3Mom1aTIH2Aw",
  authDomain: "buisness-directory-ba5c6.firebaseapp.com",
  projectId: "buisness-directory-ba5c6",
  storageBucket: "buisness-directory-ba5c6.appspot.com",
  messagingSenderId: "689756763306",
  appId: "1:689756763306:web:408d48fb08c4f8ebec0cd3",
  measurementId: "G-HD24VYP16J"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
//const analytics = getAnalytics(app);