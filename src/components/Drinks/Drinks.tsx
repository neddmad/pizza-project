import darkCocaCola from "../assets/drinksPhotos/coca-cola-Photoroom.png-Photoroom.jpg";
import darkCitron from "../assets/drinksPhotos/citron-Photoroom.png-Photoroom.jpg";
import { isInBasketFunc } from "../../features/OthersSlice/OthersSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Cocacola from "../assets/drinksPhotos/coca-cola.jpg";
import Citron from "../assets/drinksPhotos/citron.jpg";
import styles from "./Drinks.module.scss";

function Drinks() {
  const dispatch = useAppDispatch();
  const dataFetchingState = useAppSelector((state) => state.data);
  const othersSliceState = useAppSelector((state) => state.others);
  const NavOrderHandlerSliceState = useAppSelector(
    (state) => state.NavOrderHandler
  );
  return (
    <ul className={styles.drinks}>
      {dataFetchingState.menu !== null &&
        dataFetchingState.menu
          .filter((e) => e.category === "Dryck")
          .map((item) => (
            <li key={item.id}>
              {item.name === "Coca-cola, 33cl" ? (
                <div>
                  <img className={styles.cocaCola} src={Cocacola} alt="" />
                  <img
                    className={styles.darkCocaCola}
                    src={darkCocaCola}
                    alt=""
                  />
                </div>
              ) : (
                <div>
                  <img className={styles.citron} src={Citron} alt="" />
                  <img className={styles.darkCitron} src={darkCitron} alt="" />
                </div>
              )}
              <span>{item.name}</span>
              <span>{item.price} $</span>
              {othersSliceState.isMenuOpen ||
              NavOrderHandlerSliceState.handleButtonState ? null : othersSliceState.isInBasket.find(
                  (e: { id?: number }) => e.id === item.id
                ) ? (
                <div>Товар вже у кошику</div>
              ) : (
                <button
                  onClick={() => {
                    localStorage.setItem(item.name, JSON.stringify(item));
                    dispatch(isInBasketFunc());
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

export default Drinks;
