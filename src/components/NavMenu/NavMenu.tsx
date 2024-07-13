import { useContext, useEffect, useRef } from "react";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./NavMenu.module.scss";
import classNames from "classnames";
import { MyContext } from "../myContext/MyContext";
import { useOutsideClick } from "../hooks/hooks";
import { Link } from "react-router-dom";

const NavMenu = () => {
  const {
    isMenuOpen,
    closeNavMenu,
    basketItems,
    handleOrder,
    getDetailsOrder,
    purchaseData,
    prevValue,
    readOrder,
    addProduct,
    decreaseProductCount,
    deleteFromBasketAndStorage,
    newToppings,
  } = useContext(MyContext);

  //outside Nav click handle
  const ref = useOutsideClick(closeNavMenu);

  //apply styles depending on useState isMenuOpen
  const opensNavMenu = classNames(styles.container, {
    [styles.open]: isMenuOpen,
  });

  return (
    <nav className={opensNavMenu} ref={ref}>
      <CancelPresentationIcon
        className={styles.closeBtn}
        onClick={closeNavMenu}
      />
      {readOrder.length === 0 ? (
        <div>
          <div>Ваше замовлення на суму :</div>
          <span>
            {basketItems.length === 0
              ? "У Вас немає товарів в кошику"
              : basketItems.reduce(
                  (init, elem) =>
                    elem.quantity && typeof elem.quantity === "number"
                      ? (init += elem.price * elem.quantity)
                      : init + elem.price,
                  0
                ) + " $"}
          </span>
          <ul className={styles.list}>
            {basketItems.map((elem) => (
              <li key={elem.id}>
                <span className={styles.firstLine}>
                  {elem.name}
                  {elem.category === "Pizza" &&
                  !!newToppings.find(
                    (e) =>
                      e.name === elem.name && e.updatedToppings.length !== 0
                  )
                    ? " with " +
                      newToppings.find((e) => e.name === elem.name)
                        ?.updatedToppings
                    : null}
                  {
                    <DeleteIcon
                      onClick={() =>
                        deleteFromBasketAndStorage(elem.id, elem.name)
                      }
                    />
                  }
                </span>
                <br />
                <span className={styles.secondLine}>
                  {elem.price + " $"}
                  {
                    <button
                      onClick={() => decreaseProductCount(elem.id, elem.name)}
                    >
                      -
                    </button>
                  }
                  {typeof elem.quantity === "number" && elem.quantity}
                  {<button onClick={() => addProduct(elem.id)}>+</button>}
                </span>
              </li>
            ))}
          </ul>
          {basketItems.length === 0 ? null : prevValue?.current ===
            purchaseData ? (
            <Link to="/checkout">
              <button className={styles.orderButton} onClick={getDetailsOrder}>
                Переглянути замовлення
              </button>
            </Link>
          ) : (
            <button className={styles.orderButton} onClick={handleOrder}>
              Оформити замовлення
            </button>
          )}
        </div>
      ) : (
        readOrder.map((e) => e.status + "...")
      )}
    </nav>
  );
};

export default NavMenu;
