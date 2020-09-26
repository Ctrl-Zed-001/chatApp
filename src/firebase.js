import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDdMWZCmxnx2Ndgj01GXoehfGYqRd8lzNs",
    authDomain: "chatapp-139e0.firebaseapp.com",
    databaseURL: "https://chatapp-139e0.firebaseio.com",
    projectId: "chatapp-139e0",
    storageBucket: "chatapp-139e0.appspot.com",
    messagingSenderId: "296588554959",
    appId: "1:296588554959:web:a1653077ce982964abbdba"
});

const db = firebaseApp.firestore()

export default db