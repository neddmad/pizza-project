import React, { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./isUserLogged.module.scss";

interface Props {
  togglePop: () => void;
}

function IsUserLogged({ togglePop }: Props) {
  const auth = getAuth();
  const user = auth.currentUser;
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    logOut();
  }, [user]);
  if (user) {
    return <LogoutIcon className={styles.logoutIcon} onClick={logOut} />;
  } else {
    return <LoginIcon className={styles.loginIcon} onClick={togglePop} />;
  }
}

export default IsUserLogged;
