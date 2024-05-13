import styles from "./Drinks.module.scss";
import Cocacola from "../assets/drinksPhotos/coca-cola.jpg";
import Citron from "../assets/drinksPhotos/citron.jpg";
import darkCocaCola from "../assets/drinksPhotos/coca-cola-Photoroom.png-Photoroom.jpg";
import darkCitron from "../assets/drinksPhotos/citron-Photoroom.png-Photoroom.jpg";
import { ItemsInterface } from "../types";

interface propsDrinksInterface {
  drinks: ItemsInterface[] | null;
  isMenuOpen: Boolean;
  isInBasket: Array<{}>;
  isInBasketFunc: () => void;
}

function Drinks({
  drinks,
  isMenuOpen,
  isInBasket,
  isInBasketFunc,
}: propsDrinksInterface) {
  return (
    <ul className={styles.drinks}>
      {drinks !== null &&
        drinks
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
              {isMenuOpen ? null : isInBasket.find(
                  (e: { id?: number }) => e.id === item.id
                ) ? (
                <div>Товар вже у кошику</div>
              ) : (
                <button
                  onClick={() => {
                    localStorage.setItem(item.name, JSON.stringify(item));
                    isInBasketFunc();
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
