import { useContext } from "react";
import styles from "./Main.module.scss";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import { MyContext } from "../myContext/MyContext";
import { Audio } from "react-loader-spinner";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Drinks from "../Drinks/Drinks";
import Pizza from "../Pizza/Pizza";
import Salat from "../Salat/Salat";
import Slider from "../Slider/Slider";

function Main() {
  const { pathname } = useLocation();
  const {
    error,
    isLoaded,
    items,
    isMenuOpen,
    isInBasket,
    isInBasketFunc,
    setToppings,
    newToppings,
  } = useContext(MyContext);

  if (error) {
    return <div>Помилка : {error}</div>;
  } else if (!isLoaded) {
    return (
      <div>
        <Audio
          height="60"
          width="60"
          color="green"
          ariaLabel="loading"
          wrapperStyle={{
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        />
      </div>
    );
  } else {
    return (
      <div>
        <div className={styles.menuIcons}>
          <Link
            className={pathname === "/pizza" ? styles.styleGray : styles.icons}
            to="/pizza"
          >
            <LocalPizzaIcon />
          </Link>
          <Link
            className={pathname === "/salat" ? styles.styleGray : styles.icons}
            to="/salat"
          >
            <LunchDiningIcon />
          </Link>
          <Link
            className={pathname === "/drinks" ? styles.styleGray : styles.icons}
            to="/drinks"
          >
            <LocalBarIcon />
          </Link>
        </div>
        <hr style={{ margin: "5px" }} />
        <Routes>
          <Route path="*" element={<Slider />} />
          <Route
            path="pizza"
            element={
              <Pizza
                newToppings={newToppings}
                setToppings={setToppings}
                pizza={items}
                isMenuOpen={isMenuOpen}
                isInBasketFunc={isInBasketFunc}
                isInBasket={isInBasket}
              />
            }
          />
          <Route
            path="/salat"
            element={
              <Salat
                salat={items}
                isMenuOpen={isMenuOpen}
                isInBasketFunc={isInBasketFunc}
                isInBasket={isInBasket}
              />
            }
          />
          <Route
            path="/drinks"
            element={
              <Drinks
                drinks={items}
                isMenuOpen={isMenuOpen}
                isInBasketFunc={isInBasketFunc}
                isInBasket={isInBasket}
              />
            }
          />
        </Routes>
      </div>
    );
  }
}

export default Main;
