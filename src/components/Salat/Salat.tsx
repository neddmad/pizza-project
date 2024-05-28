import styles from "./Salat.module.scss";
import Pizzasallad from "../assets/pizzaSalatPhotos/pizzasallad.jpg";
import BrodOhSmor from "../assets/pizzaSalatPhotos/brodOhSmor.jpg";
import BlackPizzasallad from "../assets/pizzaSalatPhotos/pizzasallad-Photoroom.png-Photoroom.jpg";
import BlackBrodOhSmor from "../assets/pizzaSalatPhotos/brodOhSmor-Photoroom.png-Photoroom.jpg";
import { ItemsInterface } from "../types";

interface propsInterface {
  salat: ItemsInterface[] | null;
  isMenuOpen: Boolean;
  isInBasket: Array<{}>;
  isInBasketFunc: () => void;
  handleButtonState: Boolean;
}

function Salat({
  salat,
  isMenuOpen,
  isInBasket,
  isInBasketFunc,
  handleButtonState,
}: propsInterface) {
  return (
    <ul className={styles.salat}>
      {salat !== null &&
        salat
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
              {isMenuOpen || handleButtonState ? null : isInBasket.find(
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

export default Salat;
