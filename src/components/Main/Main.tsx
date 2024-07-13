import { useContext, useEffect } from "react";
import styles from "./Main.module.scss";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import { MyContext } from "../myContext/MyContext";
import { Audio } from "react-loader-spinner";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Checkout from "../Checkout/Checkout";
import Drinks from "../Drinks/Drinks";
import Pizza from "../Pizza/Pizza";
import Salat from "../Salat/Salat";
import Slider from "../Slider/Slider";

function Main() {
  const {
    error,
    isLoaded,
    menu,
    isMenuOpen,
    isInBasket,
    isInBasketFunc,
    setToppings,
    newToppings,
    handleButtonState,
    basketItems,
    readOrder,
  } = useContext(MyContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);

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
        <Routes>
          <Route path="*" element={<Slider />} />
          <Route
            path="pizza"
            element={
              <Pizza
                newToppings={newToppings}
                setToppings={setToppings}
                pizza={menu}
                isMenuOpen={isMenuOpen}
                isInBasketFunc={isInBasketFunc}
                isInBasket={isInBasket}
                handleButtonState={handleButtonState}
              />
            }
          />
          <Route
            path="/salat"
            element={
              <Salat
                salat={menu}
                isMenuOpen={isMenuOpen}
                isInBasketFunc={isInBasketFunc}
                isInBasket={isInBasket}
                handleButtonState={handleButtonState}
              />
            }
          />
          <Route
            path="/drinks"
            element={
              <Drinks
                drinks={menu}
                isMenuOpen={isMenuOpen}
                isInBasketFunc={isInBasketFunc}
                isInBasket={isInBasket}
                handleButtonState={handleButtonState}
              />
            }
          />
          <Route path="/checkout" element={<Checkout order={basketItems} />} />
        </Routes>
      </div>
    );
  }
}

export default Main;
