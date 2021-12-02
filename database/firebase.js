<<<<<<< HEAD
=======
// ESTA ES LA CONEXIÓN A FIREBASE BASADO EN EL VIDEO DE FAZT PERO SE AÑADE LAS LÍNEAS 3,4,5,22,24

// Import the functions you need from the SDKs you need
>>>>>>> origin/Develop
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_MEASUREMENT_ID,
  REACT_APP_FIREBASE_APP_ID,
} from "@env";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_MEASUREMENT_ID,
  measurementId: REACT_APP_FIREBASE_APP_ID,
};
//console.log("test", REACT_APP_FIREBASE_API_KEY);
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = firebase.firestore();
const fireAuth = firebase.auth();
export default {
  firebase,
  db,
  fireAuth,
<<<<<<< HEAD
};
=======
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
>>>>>>> origin/Develop
