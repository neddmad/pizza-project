import React from "react";
import { KeyItemsInterface } from "../types";
import styles from "./Checkout.module.scss";

interface checkoutInterface {
  order: KeyItemsInterface[];
}

function Checkout({ order }: checkoutInterface) {
  return (
    <div>
      <h1>Ваше замовлення :</h1>
      <ul className={styles.checkoutList}>
        {order.map((elem) => (
          <li>
            {elem.topping && elem.topping.length !== 0
              ? elem.name + " with " + elem.topping
              : elem.name}
          </li>
        ))}
      </ul>
      <h2>
        На суму:{" "}
        {order.reduce(
          (init, elem) =>
            elem.quantity && typeof elem.quantity === "number"
              ? (init += elem.price * elem.quantity)
              : init + elem.price,
          0
        ) + " $"}
      </h2>
    </div>
  );
}

export default Checkout;
