import styles from "./Salat.module.scss";
import Pizzasallad from "../assets/pizzaSalatPhotos/pizzasallad.jpg";
import BrodOhSmor from "../assets/pizzaSalatPhotos/brodOhSmor.jpg";
import BlackPizzasallad from "../assets/pizzaSalatPhotos/pizzasallad-Photoroom.png-Photoroom.jpg";
import BlackBrodOhSmor from "../assets/pizzaSalatPhotos/brodOhSmor-Photoroom.png-Photoroom.jpg";
import { MenuInterface } from "../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { isInBasketFunc } from "../../features/OthersSlice/OthersSlice";

function Salat() {
  const dispatch = useAppDispatch();
  const dataFetchingState = useAppSelector((state) => state.data);
  const othersSliceState = useAppSelector((state) => state.others);
  const NavOrderHandlerSliceState = useAppSelector(
    (state) => state.NavOrderHandler
  );
  const basketSliceState = useAppSelector((state) => state.basket);
  return (
    <ul className={styles.salat}>
      {dataFetchingState.menu !== null &&
        dataFetchingState.menu
          .filter((e: { category: string }) => e.category === "Tillbehör")
          .map((item: { id: number; name: string; price: number }) => (
            <li key={item.id}>
              {item.name === "Pizzasallad" ? (
                <div>
                  <img
                    className={styles.pizzaSallad}
                    src={Pizzasallad}
                    alt=""
                  />
                  <img
                    className={styles.blackPizzaSallad}
                    src={BlackPizzasallad}
                    alt=""
                  />
                </div>
              ) : (
                <div>
                  <img className={styles.brodOhSmor} src={BrodOhSmor} alt="" />
                  <img
                    className={styles.blackBrodOhSmor}
                    src={BlackBrodOhSmor}
                    alt=""
                  />
                </div>
              )}
              <span>{item.name}</span>
              <span>{item.price} $</span>
              {othersSliceState.isMenuOpen || NavOrderHandlerSliceState.handleButtonState ? null : othersSliceState.isInBasket.find(
                  (e: { id?: number }) => e.id === item.id
                ) ? (
                <div>Товар вже у кошику</div>
              ) : (
                <button
                  onClick={() => {
                    localStorage.setItem(item.name, JSON.stringify(item));
                    dispatch(isInBasketFunc())
                  }}
                >
                  В кошик
                </button>
              )}
            </li>
          ))}
    </ul>
  );
}

export default Salat;
