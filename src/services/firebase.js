import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAMC-ruO6afcSg02zqycKwmz8gEhsXl8KA",
    authDomain: "game-of-chicken.firebaseapp.com",
    databaseURL: "https://game-of-chicken.firebaseio.com",
    projectId: "game-of-chicken",
    storageBucket: "game-of-chicken.appspot.com",
    messagingSenderId: "164226384888",
    appId: "1:164226384888:web:f76ca737a9c4b348cbcc0d",
    measurementId: "G-Q7RSJCGTPE"
  };

firebase.initializeApp(firebaseConfig);


export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const database = firebase.database();