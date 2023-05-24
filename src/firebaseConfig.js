import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDUSgzmrQfkLBDBnSR6YLH3nN04UIMkIVY",
  authDomain: "typing-test-website-a3aa4.firebaseapp.com",
  projectId: "typing-test-website-a3aa4",
  storageBucket: "typing-test-website-a3aa4.appspot.com",
  messagingSenderId: "34330703118",
  appId: "1:34330703118:web:b351ad387ccbf67ecd535f",
  measurementId: "G-DVJTBYW4L0",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebaseApp.firestore();

export {auth, db}; 
