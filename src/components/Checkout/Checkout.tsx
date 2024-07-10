import React from "react";
import { KeyItemsInterface } from "../types";
import styles from "./Checkout.module.scss";
import classNames from "classnames";
import { useLocation } from "react-router-dom";

interface checkoutInterface {
  order: KeyItemsInterface[];
}

function Checkout({ order }: checkoutInterface) {
  const { pathname } = useLocation();

  return (
    <div className={styles.checkout}>
      <div className={styles.center}>
        <h1>Ваше замовлення :</h1>
        <ul className={styles.checkoutList}>
          {order.map((elem) => (
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
            {order.reduce(
              (init, elem) =>
                elem.quantity && typeof elem.quantity === "number"
                  ? (init += elem.price * elem.quantity)
                  : init + elem.price,
              0
            ) + " $"}
          </a>
        </h2>
      </div>
    </div>
  );
}

export default Checkout;
