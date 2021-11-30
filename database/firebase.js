import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZBmKgl0g3uGfuz9AjyBqgt884Em35EtE",
  authDomain: "henry-restobook.firebaseapp.com",
  projectId: "henry-restobook",
  storageBucket: "henry-restobook.appspot.com",
  messagingSenderId: "96924806240",
  appId: "1:96924806240:web:9bd43698b9913454a3a705",
  measurementId: "G-Y6E3NYDYVW",
};
console.log("test", process.env.TEST);
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = firebase.firestore();
const fireAuth = firebase.auth();
export default {
  firebase,
  db,
  fireAuth,
};