// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfDRbXAdeJrd-PkJK2bYe_UG_cXHeDM-0",
  authDomain: "canlearn-add61.firebaseapp.com",
  projectId: "canlearn-add61",
  storageBucket: "canlearn-add61.appspot.com",
  messagingSenderId: "718262206283",
  appId: "1:718262206283:web:3212e761a7f9006abfb2ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app,db };