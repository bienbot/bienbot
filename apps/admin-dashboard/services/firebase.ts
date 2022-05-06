import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyDKhX1BzX9joaF9jAz6fbIamRKYbDDZrEg",
    authDomain: "bienbot-8fde7.firebaseapp.com",
    projectId: "bienbot-8fde7",
    storageBucket: "bienbot-8fde7.appspot.com",
    messagingSenderId: "292536397731",
    appId: "1:292536397731:web:eca3f84c18fd33ec0cb416",
    measurementId: "G-QKMPW2Y9FQ",
};

const firebaseApp: FirebaseApp = getApps().length
    ? getApp()
    : initializeApp(firebaseConfig);

export default firebaseApp;
