import { createContext } from "react";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

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

export const FirebaseContext = createContext(null);

export class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
  }

  createUser = (email, password) => 
    this.auth.createUserWithEmailAndPassword(email, password);

  signIn = (email, password) => 
    this.auth.signInWithEmailAndPassword(email, password);

  signOut = () => this.auth.signOut();

  resetPassword = email => this.auth.sendPasswordResetEmail(email);

  updatePassword = password =>
    this.auth.currentUser.updatePassword(password);
}