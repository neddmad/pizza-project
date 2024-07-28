import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import styles from "./Checkout.module.scss";
import pizzaCheckOut from "../assets/checkOutPics/pizzaCheckOut.jpg";
import pizzaCheckOutBlack from "../assets/checkOutPics/pizzaCheckOutBlack.png";

function Checkout() {
  const basketSliceState = useAppSelector((state) => state.basket.basketItems);
  const navigate = useNavigate();

  return (
    <div className={styles.checkout}>
      <div className={styles.center}>
        <h1>Ваше замовлення :</h1>
        <ul className={styles.checkoutList}>
          {basketSliceState.map((elem) => (
            <li key={elem.id}>
              {elem.topping && elem.topping.length !== 0
                ? elem.name + " with " + elem.topping + " - " + elem.quantity
                : elem.name + " - " + elem.quantity}
            </li>
          ))}
        </ul>
        <h2>
          На суму:{" "}
          <a className={styles.checkoutNumber}>
            {basketSliceState.reduce(
              (init, elem) =>
                elem.quantity && typeof elem.quantity === "number"
                  ? (init += elem.price * elem.quantity)
                  : init + elem.price,
              0
            ) + " $"}
          </a>
        </h2>
        <button
          className={styles.goToMainPageButton}
          onClick={() => navigate(0)}
        >
          На головну сторінку
        </button>
      </div>
      <img src={pizzaCheckOut} className={styles.pizzaCheckOut} />
      <img src={pizzaCheckOutBlack} className={styles.pizzaCheckOutBlack} />
    </div>
  );
}

export default Checkout;
