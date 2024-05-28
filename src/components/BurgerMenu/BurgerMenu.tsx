import React, { useContext, useEffect, useRef } from "react";
import { MyContext } from "../myContext/MyContext";
import styles from "../BurgerMenu/BurgerMenu.module.scss";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useOutsideClick } from "../hooks/hooks";

function BurgerMenu() {
  const { isBurgerOpen, closeBurgerMenu } = useContext(MyContext);
  const opensBurgerMenu = classNames(styles.burgerMenu, {
    [styles.openBurger]: isBurgerOpen,
  });
  const ref = useOutsideClick(closeBurgerMenu);

  return (
    <nav className={opensBurgerMenu} ref={ref}>
      <CancelPresentationIcon
        className={styles.closeBtn}
        onClick={closeBurgerMenu}
      />
      <div>Меню :</div>
      <ul className={styles.list}>
        <li>
          <Link to="/pizza">Піца</Link>
        </li>
        <li>
          <Link to="/salat">Гарніри</Link>
        </li>
        <li>
          <Link to="/drinks">Напої</Link>
        </li>
      </ul>
    </nav>
  );
}

export default BurgerMenu;
