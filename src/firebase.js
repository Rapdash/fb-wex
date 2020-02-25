import firebaseApp from "firebase/app";

const config = {
  apiKey: "AIzaSyBtVKtS5BC1D2AvHF-BZ5pRzSOQYGQHw4E",
    authDomain: "water-brokerage-platform.firebaseapp.com",
    databaseURL: "https://water-brokerage-platform.firebaseio.com",
    projectId: "water-brokerage-platform",
    storageBucket: "water-brokerage-platform.appspot.com",
    messagingSenderId: "217225872216",
    appId: "1:217225872216:web:6995725f010e9f344f5b2d",
    measurementId: "G-TM9FXGRH95"
}

export const firebase = firebaseApp.initializeApp(config);
