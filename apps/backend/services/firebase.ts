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
    private_key_id: "263bd628602cfb5c1dc3a6060a432f28bdef4ff2",
    private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCpgHp3XOOhNW4c\nA2/CSBKzzjyHGOT4fjXwdSP/40QS5lUVtDyy+RNeIWt33vy8yjpsXD/qVVnGspDm\nyfE0++QPyRVoOaT3n+/763HnbMdXk+jN2JgGa5xciJKpyuN8JyLfBR3y2Ke2w2zo\nEnXNP/QinaS2ckRwax8gePPlhuIREbo6WB54lSKVBOmET5pghmTEJvxee9MfkIxM\nbk+bjLyWfS1K8WkZ007A77Oqg8Sj3bb1ifX+IpcWupjwk0oh1uj2kUZO2Rx5TogY\nnYZXSIUrOAYMrndeuQKBJ3xHNfkifRpBnj8b5m2JU3396PsA9VhEc/QvRJxSZEpu\nEZyzDpOhAgMBAAECggEADJk0MRBGSoaJQjuGqGD5Q+RLtypkZWxjF7XrOLMkjYeR\nciko/E/7Tqsq/NhF/oXE8SYrqYARyc0erEq8+whQZ5R1ev9S2cVpXdb+iroY+HNR\n0c/8H7kKoI2VohlmjmUtyDgOBW1xTMoqe3bYyupKm/KN6jIk0FrD7+LRlQExJx3E\nO2cE7tWfVbim6XHTa8KOqT7zZImY/rD67vECHuYxYGCTwDEz6jMPQ2xOHSAnJO9U\ncTLt3c5CpCS1BBPrVsNJr+uTB9k/KppfkJsdal04rxb8tosGzpF037QHWaZF1LVM\nZrUFcoit3gZlDnBQWc6ffAm6SdcwuKoXgz/FTnA+GQKBgQDj7qAJWX1iTH3sJ+6S\nTrj3TNYwJgihhnA/2f0KOnviBBcEPzZiuWmjFUDPQS5V12acLfNKyePIn4/U6cRf\nCNmA3bh/4oErwdt0/jgF1rJk0VWvegWKfDUwI1UbtBQKhn68dhmbsDk81YMDcdeN\nUXZzrvsYbBFFAEqHZMe8G9E32QKBgQC+X+MHPCprNlMLrUmXuRdorknVYqUvQeZl\niGgi6i8aq/Fqrc4H6ZM123b/nLLJ1p3AeDmIMmtB4WT5hnyLHDce6r/NFP1hoagv\nc2oee4VW1ybztaReFslNTZFdSYsHdkxxkYB911dSPBFukR7BaxjlOB4PTvNuc830\np/tkAyNlCQKBgGAVmNs4IVYN3sttrfF5RBnkByq27c6BqNIR58ynCNAnXziIGToW\n5UQ9UlvMI2dGbVgLOtNdNiu9r9lWTlStm1rqnLs0VbWHfCbef+leL0e2w0M80hcl\n8xn+2wLZr9UcC1MRCgyKhiZx70/FbtOA8skji3ApJkKLM9/NiTFwHItJAoGAVIfn\nGtNQUoKwpUKwprn89vJMvn8qsa0lTHghJT+u4rzuWVwLW+APCZ8FW8KMcKrnKQs5\nIIyiq4IVf+aDbpF8uDGsMLfdOni5YThyKk7WihTGqvhAn7amc7i5jx6UqR+SGett\njnMLxuv9IYc2jNOtHjqovktkM+sfzD66lVH/aWECgYEAx6MbU9bndtrhbmVnZ2c/\n3YX4BI0gL/6ngdOllhpJRJPllq5NoHJz9gqKCLmwXF5aFPE0uX7jTYy/MKPJw332\ncjNy5w32KUVaxyYo8jTn30ryjQDHU7ZN0r5CV/0+Z++WwAMrhCRgHED2xAqTxlFV\npeH+Cnim7oX5BTK2kyujKKc=\n-----END PRIVATE KEY-----\n",
    client_email:
        "firebase-adminsdk-eeigy@bienbot-8fde7.iam.gserviceaccount.com",
    client_id: "108044717159037307403",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-eeigy%40bienbot-8fde7.iam.gserviceaccount.com",
};

admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
});
