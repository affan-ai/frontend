// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOD3RoPsVlI9yIUUXc1-AZE9V04M2ISvk",
  authDomain: "rwikistat-2f82f.firebaseapp.com",
  projectId: "rwikistat-2f82f",
  storageBucket: "rwikistat-2f82f.appspot.com",
  messagingSenderId: "72157531364",
  appId: "1:72157531364:web:fd70aa3ba0d25a91eef0f1",
  measurementId: "G-VXH27TBQ4B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);