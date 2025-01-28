import { setHandleButtonState } from "../../features/NavOrderHandlerSlice/NavOrderHandlerSlice";
import { fetchOrder, fetchOrderDetails } from "../../features/api/DataFetching";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { closeNavMenu } from "../../features/OthersSlice/OthersSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import { useOutsideClick } from "../hooks/hooks";
import styles from "./NavMenu.module.scss";
import { Link } from "react-router-dom";
import classNames from "classnames";
import {
  addProduct,
  decreaseProductCount,
  deleteFromBasketAndStorage,
} from "../../features/BasketSlice/BasketSlice";
import { useRef } from "react";
import { PurchaseDataInterface } from "../types";
const NavMenu = () => {
  let prevValue = useRef<PurchaseDataInterface>({
    orderId: 1,
    totalPrice: 1,
    orderedAt: "",
    esitmatedDelivery: "",
    status: "",
  });

  //outside Nav click handle
  const ref = useOutsideClick(() => dispatch(closeNavMenu()));
  const dispatch = useAppDispatch();
  const othersSliceState = useAppSelector((state) => state.others);
  const basketSliceState = useAppSelector((state) => state.basket);
  const dataFecthingState = useAppSelector((state) => state.data);
  console.log(basketSliceState.basketItems);
  

  const newData = {
    data: basketSliceState.basketItems.map((elem) => {
      return {
        menuItemId: elem.id,
        quantity: elem.quantity || 1,
      };
    }),
    restuarantId:
      othersSliceState.locationRestaurant === "Kungsgatan 1" ? 1 : 2,
  };

  //apply styles depending on useState isMenuOpen
  const opensNavMenu = classNames(styles.container, {
    [styles.open]: othersSliceState.isMenuOpen,
  });

  return (
    <nav className={opensNavMenu} ref={ref}>
      <CancelPresentationIcon
        className={styles.closeBtn}
        onClick={() => dispatch(closeNavMenu())}
      />
      {dataFecthingState.readOrder.length === 0 ? (
        <div>
          <div>Ваше замовлення на суму :</div>
          <span>
            {basketSliceState.basketItems.length === 0
              ? "У Вас немає товарів в кошику"
              : basketSliceState.basketItems.reduce(
                  (init, elem) =>
                    elem.quantity && typeof elem.quantity === "number"
                      ? (init += elem.price * elem.quantity)
                      : init + elem.price,
                  0
                ) + " $"}
          </span>
          <ul className={styles.list}>
            {basketSliceState.basketItems.map((elem) => (
              <li key={elem.id}>
                <span className={styles.firstLine}>
                  {elem.name}
                  {elem.category === "Pizza" &&
                  !!basketSliceState.newToppings.find(
                    (e) =>
                      e.name === elem.name && e.updatedToppings.length !== 0
                  )
                    ? " with " +
                      basketSliceState.newToppings.find(
                        (e) => e.name === elem.name
                      )?.updatedToppings
                    : null}
                  {
                    <DeleteIcon
                      onClick={() =>
                        dispatch(
                          deleteFromBasketAndStorage({
                            elemIdNav: elem.id,
                            elemNameNav: elem.name,
                          })
                        )
                      }
                    />
                  }
                </span>
                <br />
                <span className={styles.secondLine}>
                  {elem.price + " $"}
                  {
                    <button
                      onClick={() =>
                        dispatch(
                          decreaseProductCount({
                            elemId: elem.id,
                            elemName: elem.name,
                          })
                        )
                      }
                    >
                      -
                    </button>
                  }
                  {typeof elem.quantity === "number" && elem.quantity}
                  {
                    <button
                      onClick={() => dispatch(addProduct({ elemId: elem.id }))}
                    >
                      +
                    </button>
                  }
                </span>
              </li>
            ))}
          </ul>
          {basketSliceState.basketItems.length === 0 ? null : prevValue.current
              .orderId === dataFecthingState.purchaseData.orderId ? (
            <button
              className={styles.orderButton}
              onClick={() => (
                dispatch(fetchOrder(newData)), setHandleButtonState()
              )}
            >
              Оформити замовлення
            </button>
          ) : (
            <Link to="/checkout">
              <button
                className={styles.orderButton}
                onClick={() => (
                  dispatch(closeNavMenu()),
                  dispatch(fetchOrderDetails(dataFecthingState.purchaseData))
                )}
              >
                Переглянути замовлення
              </button>
            </Link>
          )}
        </div>
      ) : 'baking...'}
    </nav>
  );
};

export default NavMenu;
