import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { closeBurgerMenu } from "../../features/OthersSlice/OthersSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import styles from "../BurgerMenu/BurgerMenu.module.scss";
import { useOutsideClick } from "../hooks/hooks";
import { Link } from "react-router-dom";
import classNames from "classnames";

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
