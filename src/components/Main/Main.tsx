import { useContext } from "react";
import styles from "./Main.module.scss";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import { MyContext } from "../myContext/MyContext";
import { Audio } from "react-loader-spinner";
import { Route, Routes } from "react-router-dom";
import Drinks from "../Drinks/Drinks";
import Pizza from "../Pizza/Pizza";
import Salat from "../Salat/Salat";
import {
  NavbarContainer,
  NavbarLinkContainer,
  NavbarLink,
} from "../Styles/NavStyle";
import Slider from "../Slider/Slider";

function Main() {
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
        <NavbarContainer>
          <NavbarLinkContainer>
            <NavbarLink className={styles.icons} to="/pizza">
              <LocalPizzaIcon />
            </NavbarLink>
            <NavbarLink className={styles.icons} to="/salat">
              <LunchDiningIcon />
            </NavbarLink>
            <NavbarLink className={styles.icons} to="/drinks">
              <LocalBarIcon />
            </NavbarLink>
          </NavbarLinkContainer>
        </NavbarContainer>
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
