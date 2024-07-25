import styles from "./Header.module.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import pizzaGif from "../assets/headerGif/pizzaGif.gif";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import IsUserLogged from "../isUserLogged/isUserLogged";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  functionSetLocation,
  openBurgerMenu,
  openNavMenu,
} from "../../features/OthersSlice/OthersSlice";

function Header() {
  const dispatch = useAppDispatch();
  const dataFetchingState = useAppSelector((state) => state.data);
  const othersSliceState = useAppSelector((state) => state.others);
  //localStorage
  let localStorageValues = Object.values(localStorage);
  if (dataFetchingState.isLoaded) {
    return (
      <div className={styles.header}>
        <span className={styles.menuIcon}>
          <MenuIcon onClick={() => dispatch(openBurgerMenu())} />
        </span>
        <div className={styles.reactIcon}>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            REACT PIZZA
          </Link>
          <img
            style={{ width: "30px", height: "30px" }}
            src={pizzaGif}
            alt=""
          />
        </div>
        <form>
          <select
            className={styles.adressForm}
            value={othersSliceState.locationRestaurant}
            onChange={(event) =>
              dispatch(functionSetLocation(event.target.value))
            }
          >
            <option style={{ color: "black" }}>
              {dataFetchingState.restaurants.map((e) =>
                e.id === 1 ? e.address1 : null
              )}
            </option>
            <option style={{ color: "black" }}>
              {dataFetchingState.restaurants.map((e) =>
                e.id === 2 ? e.address1 : null
              )}
            </option>
          </select>
        </form>
        <ThemeSwitcher />
        <IsUserLogged />
        <div className={styles.displayFlex}>
          <ShoppingCartIcon
            className={styles.shoppingCart}
            onClick={() => dispatch(openNavMenu())}
          />
          <span className={styles.localStorage}>
            {!localStorageValues.length ? null : localStorageValues.length}
          </span>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Header;
