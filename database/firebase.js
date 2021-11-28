// ESTA ES LA CONEXIÓN A FIREBASE BASADO EN EL VIDEO DE FAZT PERO SE AÑADE LAS LÍNEAS 3,4,5,22,24

// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZBmKgl0g3uGfuz9AjyBqgt884Em35EtE",
  // apiKey: REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  authDomain: "henry-restobook.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
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

// ESTO SERÍA LA CONEXIÓN A FIREBASE ACTUALIZADA PERO COMO NO FUNCIONA VOY A COLOCAR EL DEL VIDEO DE FAZT

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAZBmKgl0g3uGfuz9AjyBqgt884Em35EtE",
//   authDomain: "henry-restobook.firebaseapp.com",
//   projectId: "henry-restobook",
//   storageBucket: "henry-restobook.appspot.com",
//   messagingSenderId: "96924806240",
//   appId: "1:96924806240:web:9bd43698b9913454a3a705",
//   measurementId: "G-Y6E3NYDYVW"
// };

// // Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);
// const db = getFirestore();

// export default {firebaseApp, db};
