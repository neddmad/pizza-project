import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { togglePop } from "../../features/OthersSlice/OthersSlice";
import { auth, googleProvider } from "../config/firebase-config";
import GoogleIcon from "@mui/icons-material/Google";
import { useOutsideClick } from "../hooks/hooks";
import { useAppDispatch } from "../../app/hooks";
import styles from "./Auth.module.scss";
import { useState } from "react";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const ref = useOutsideClick(() => dispatch(togglePop()));
  const signIn = async (e: any) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
    dispatch(togglePop());
  };
  const signInWithGoogle = async (e: any) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
    dispatch(togglePop());
  };

  return (
    <div className={styles.popup}>
      <form className={styles.popupInner} ref={ref}>
        <div className={styles.closeForm}>
          <label>Пошта</label>
          <CancelPresentationIcon
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(togglePop())}
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
