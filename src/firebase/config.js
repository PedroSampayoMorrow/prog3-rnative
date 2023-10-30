import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA2EsSgUanCzVUqGX44K2fgi4XcnAUfaRM",
    authDomain: "proyecto-integrador-24ce4.firebaseapp.com",
    projectId: "proyecto-integrador-24ce4",
    storageBucket: "proyecto-integrador-24ce4.appspot.com",
    messagingSenderId: "640292862551",
    appId: "1:640292862551:web:cbeaca1851ea095208c112"
  };

app.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();