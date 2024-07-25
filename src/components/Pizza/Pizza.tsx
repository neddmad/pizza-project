import styles from "./Pizza.module.scss";
import pizzaHawaii from "../assets/pizzaPhotos/pizzaHawaii.jpg";
import pizzaVesuvius from "../assets/pizzaPhotos/pizzaVesuvio.jpg";
import pizzaParma from "../assets/pizzaPhotos/pizzaParma.jpg";
import darkParma from "../assets/pizzaPhotos/pizzaParma-Photoroom.png-Photoroom.jpg";
import darkVesuvius from "../assets/pizzaPhotos/pizzaVesuvio-Photoroom.png-Photoroom.jpg";
import darkHawaii from "../assets/pizzaPhotos/pizzaHawaii-Photoroom.png-Photoroom.jpg";
import { setToppings } from "../../features/BasketSlice/BasketSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { isInBasketFunc } from "../../features/OthersSlice/OthersSlice";

function Pizza() {
  const dispatch = useAppDispatch();
  const dataFetchingState = useAppSelector((state) => state.data);
  const othersSliceState = useAppSelector((state) => state.others);
  const NavOrderHandlerSliceState = useAppSelector(
    (state) => state.NavOrderHandler
  );
  const basketSliceState = useAppSelector((state) => state.basket);
  return (
    <ul className={styles.pizza}>
      {dataFetchingState.menu !== null &&
        dataFetchingState.menu
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
                    onClick={() => dispatch(setToppings({ topping, item }))}
                    key={index}
                    className={
                      basketSliceState.newToppings
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

export default Pizza;
