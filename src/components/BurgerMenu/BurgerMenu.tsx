import React, { useContext, useEffect, useRef } from "react";
import { MyContext } from "../myContext/MyContext";
import styles from "../BurgerMenu/BurgerMenu.module.scss";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import classNames from "classnames";
import { Link } from "react-router-dom";

function BurgerMenu() {
  const { isBurgerOpen, closeBurgerMenu } = useContext(MyContext);
  const opensBurgerMenu = classNames(styles.burgerMenu, {
    [styles.openBurger]: isBurgerOpen,
  });
  const burgerRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const handlerClick = ({ target }: MouseEvent): void => {
      if (!burgerRef.current?.contains(target as Node)) {
        closeBurgerMenu();
      }
    };

    window.addEventListener("mousedown", handlerClick);
    return () => {
      window.removeEventListener("mousedown", handlerClick);
    };
  });
  return (
    <nav className={opensBurgerMenu} ref={burgerRef}>
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
