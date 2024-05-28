import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCvwwG99AtWguLbEpPxulWs8GMOpEvucFE",
  authDomain: "react-pizza-97a64.firebaseapp.com",
  projectId: "react-pizza-97a64",
  storageBucket: "react-pizza-97a64.appspot.com",
  messagingSenderId: "534061198774",
  appId: "1:534061198774:web:7b0b21e27509951d9ee517",
  measurementId: "G-PN7XX16ZEX",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const user = auth.currentUser;
export const googleProvider = new GoogleAuthProvider();
