import React, { useState, useRef, useEffect } from "react";
import { auth, googleProvider } from "../config/firebase-config";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import GoogleIcon from "@mui/icons-material/Google";
import styles from "./Auth.module.scss";
import { useOutsideClick } from "../hooks/hooks";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

interface popUpSignIn {
  togglePop: () => void;
}

export const Auth = ({ togglePop }: popUpSignIn) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const ref = useOutsideClick(togglePop);
  const signIn = async (e: any) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
    togglePop();
  };
  const signInWithGoogle = async (e: any) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
    togglePop();
  };

  return (
    <div className={styles.popup}>
      <form className={styles.popupInner} ref={ref}>
        <div className={styles.closeForm}>
          <label>Пошта</label>
          <CancelPresentationIcon
            style={{ cursor: "pointer" }}
            onClick={togglePop}
          />
        </div>
        <input placeholder="Пошта" onChange={(e) => setEmail(e.target.value)} />
        <label>Пароль</label>
        <input
          placeholder="Пароль"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className={styles.submitButton}
          type="submit"
          onClick={signIn}
          value={"Увійти"}
        />
        <GoogleIcon
          className={styles.googleSubmit}
          onClick={signInWithGoogle}
        />
      </form>
    </div>
  );
};

export default Auth;
