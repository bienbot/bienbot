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

const admin = require("firebase-admin");

const adminConfig = {
    type: "service_account",
    project_id: "bienbot-8fde7",
    private_key_id: process.env["FIREBASE_PRIVATE_KEY_ID"],
    private_key: process.env["FIREBASE_PRIVATE_KEY"],
    client_email:
        "firebase-adminsdk-eeigy@bienbot-8fde7.iam.gserviceaccount.com",
    client_id: process.env["FIREBASE_CLIENT_ID"],
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-eeigy%40bienbot-8fde7.iam.gserviceaccount.com",
};

admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
});
