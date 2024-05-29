import { useContext, useEffect } from "react";
import styles from "./Header.module.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { MyContext } from "../myContext/MyContext";
import pizzaGif from "../assets/headerGif/pizzaGif.gif";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import IsUserLogged from "../isUserLogged/isUserLogged";
import classNames from "classnames";
function Header() {
  const {
    openNavMenu,
    getRestaurant,
    locationRestaurant,
    functionSetLocation,
    openBurgerMenu,
    togglePop,
  } = useContext(MyContext);
  //localStorage
  let localStorageValues = Object.values(localStorage);

  return (
    <div className={styles.header}>
      <span className={styles.menuIcon}>
        <MenuIcon onClick={openBurgerMenu} />
      </span>
      <div className={styles.reactIcon}>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          REACT PIZZA
        </Link>
        <img style={{ width: "30px", height: "30px" }} src={pizzaGif} alt="" />
      </div>
      <form>
        <select
          className={styles.adressForm}
          value={locationRestaurant}
          onChange={functionSetLocation}
        >
          <option style={{ color: "black" }}>
            {getRestaurant.map((e) => (e.id === 1 ? e.address1 : null))}
          </option>
          <option style={{ color: "black" }}>
            {getRestaurant.map((e) => (e.id === 2 ? e.address1 : null))}
          </option>
        </select>
      </form>
      <ThemeSwitcher />
      <IsUserLogged togglePop={togglePop} />
      <div className={styles.displayFlex}>
        <ShoppingCartIcon
          className={styles.shoppingCart}
          onClick={openNavMenu}
        />
        <span className={styles.localStorage}>
          {!localStorageValues.length ? null : localStorageValues.length}
        </span>
      </div>
    </div>
  );
}

export default Header;
