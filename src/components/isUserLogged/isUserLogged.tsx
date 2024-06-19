import { useEffect, useState, useRef } from "react";
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./isUserLogged.module.scss";

interface Props {
  togglePop: () => void;
}

function IsUserLogged({ togglePop }: Props) {
  const [checkRef, setCheckRef] = useState(false);
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
          togglePop();
          setCheckRef(false);
        }}
      />
    );
  }
}

export default IsUserLogged;
