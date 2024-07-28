import { togglePop } from "../../features/OthersSlice/OthersSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useAppDispatch } from "../../app/hooks";
import styles from "./isUserLogged.module.scss";
import { useState, useRef } from "react";
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";

function IsUserLogged() {
  const [checkRef, setCheckRef] = useState(false);
  const dispatch = useAppDispatch();
  const auth = getAuth();
  const user = auth.currentUser;
  const ref = useRef(null);

  const checkRefFunc = () => {
    if (ref.current !== null) {
      setCheckRef(true);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  if (user && checkRef === false) {
    return (
      <LogoutIcon
        className={styles.logoutIcon}
        data-tooltip="Log Out"
        onClick={() => {
          logOut();
          checkRefFunc();
        }}
        ref={ref}
      />
    );
  } else {
    return (
      <LoginIcon
        className={styles.loginIcon}
        data-tooltip="Log In"
        onClick={() => {
          dispatch(togglePop());
          setCheckRef(false);
        }}
      />
    );
  }
}

export default IsUserLogged;
