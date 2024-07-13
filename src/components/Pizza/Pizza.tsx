import styles from "./Pizza.module.scss";
import pizzaHawaii from "../assets/pizzaPhotos/pizzaHawaii.jpg";
import pizzaVesuvius from "../assets/pizzaPhotos/pizzaVesuvio.jpg";
import pizzaParma from "../assets/pizzaPhotos/pizzaParma.jpg";
import darkParma from "../assets/pizzaPhotos/pizzaParma-Photoroom.png-Photoroom.jpg";
import darkVesuvius from "../assets/pizzaPhotos/pizzaVesuvio-Photoroom.png-Photoroom.jpg";
import darkHawaii from "../assets/pizzaPhotos/pizzaHawaii-Photoroom.png-Photoroom.jpg";
import { MenuInterface } from "../types";

export interface propsInterface {
  pizza: MenuInterface[] | null;
  isMenuOpen: Boolean;
  isInBasket: Array<{}>;
  isInBasketFunc: () => void;
  setToppings: (value: string, item: MenuInterface) => void;
  newToppings: Array<{ name: string; updatedToppings: string[] }>;
  handleButtonState: Boolean;
}

function Pizza({
  pizza,
  isMenuOpen,
  isInBasket,
  isInBasketFunc,
  setToppings,
  newToppings,
  handleButtonState,
}: propsInterface) {
  return (
    <ul className={styles.pizza}>
      {pizza !== null &&
        pizza
          .filter((e: { category: string }) => e.category === "Pizza")
          .map((item) => (
            <li key={item.id}>
              {item.name === "Vesuvius" ? (
                <div>
                  <img className={styles.vesuvius} src={pizzaVesuvius} />
                  <img className={styles.darkVesuvius} src={darkVesuvius} />
                </div>
              ) : item.name === "Hawaii" ? (
                <div>
                  <img className={styles.hawaii} src={pizzaHawaii} />
                  <img className={styles.darkHawaii} src={darkHawaii} />
                </div>
              ) : (
                <div>
                  <img className={styles.parma} src={pizzaParma} />
                  <img className={styles.darkParma} src={darkParma} />
                </div>
              )}
              <span>{item.name}</span>
              <span>{item.price} $</span>
              <span>Toppings : </span>
              <ul className={styles.gridToppings}>
                {item.topping.map((topping: string, index) => (
                  <li
                    onClick={() => setToppings(topping, item)}
                    key={index}
                    className={
                      newToppings
                        .find((nm) => nm.name === item.name)
                        ?.updatedToppings.includes(topping)
                        ? styles.clickedTopping
                        : styles.toppings
                    }
                  >
                    {topping}
                  </li>
                ))}
              </ul>
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

export default Pizza;
