import { setInitialValuesBasket } from "./features/BasketSlice/BasketSlice";
import { fetchMenu, fetchRestaurants } from "./features/api/DataFetching";
import { isInBasketFunc } from "./features/OthersSlice/OthersSlice";
import BurgerMenu from "./components/BurgerMenu/BurgerMenu";
import NavMenu from "./components/NavMenu/NavMenu";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { BrowserRouter } from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import { useAppSelector } from "./app/hooks";
import Main from "./components/Main/Main";
import Auth from "./components/Auth/Auth";
import { useEffect } from "react";
import "./App.css";

function App() {
  const dispatch = useAppDispatch();
  const othersSliceState = useAppSelector((state) => state.others);
  const handleButtonState = useAppSelector(
    (state) => state.NavOrderHandler.handleButtonState
  );
  useEffect(() => {
    dispatch(isInBasketFunc());
  }, []);

  useEffect(() => {
    dispatch(fetchMenu());
    dispatch(fetchRestaurants());
  }, []);

  useEffect(() => {
    dispatch(isInBasketFunc());
  }, []);

  //add products to basket
  useEffect(() => {
    dispatch(setInitialValuesBasket());
  }, [othersSliceState.isMenuOpen, handleButtonState]);

  return (
    <BrowserRouter>
      {othersSliceState.seen ? <Auth /> : null}
      <BurgerMenu />
      <div className={"wrapper"}>
        <Header />
        <div
          className={othersSliceState.isMenuOpen ? "opacityApply" : undefined}
        >
          <Main />
        </div>
        <NavMenu />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
