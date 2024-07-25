import React, { useContext, useEffect, useRef } from "react";
import styles from "../BurgerMenu/BurgerMenu.module.scss";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useOutsideClick } from "../hooks/hooks";
import { closeBurgerMenu } from "../../features/OthersSlice/OthersSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

function BurgerMenu() {
  const dispatch = useAppDispatch();
  const othersSliceState = useAppSelector((state) => state.others);

  const opensBurgerMenu = classNames(styles.burgerMenu, {
    [styles.openBurger]: othersSliceState.isBurgerOpen,
  });
  const ref = useOutsideClick(() => dispatch(closeBurgerMenu()));

  return (
    <nav className={opensBurgerMenu} ref={ref}>
      <CancelPresentationIcon
        className={styles.closeBtn}
        onClick={() => dispatch(closeBurgerMenu())}
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
