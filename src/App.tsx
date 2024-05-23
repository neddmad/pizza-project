import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import { useState, useEffect, useRef } from "react";
import { MyContext } from "./components/myContext/MyContext";
import { BrowserRouter } from "react-router-dom";
import NavMenu from "./components/NavMenu/NavMenu";
import axios from "axios";
import BurgerMenu from "./components/BurgerMenu/BurgerMenu";
import React from "react";
import {
  DataInterface,
  ItemsInterface,
  KeyItemsInterface,
  ReadOrderInterface,
  RestaurantInterface,
} from "./components/types";

function App() {
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState<Boolean>(false);
  const [items, setItems] = useState<ItemsInterface[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState<Boolean>(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState<Boolean>(false);
  const [isInBasket, setIsInBasket] = useState<Array<{}>>([]);
  const [getRestaurant, setGetRestaurant] = useState<RestaurantInterface[]>([]);
  const [locationRestaurant, setLocationRestaurant] = useState<string>("");
  const [keyItems, setKeyItems] = useState<KeyItemsInterface[]>([]);
  const [data, setData] = useState<DataInterface | null>(null);
  const [readOrder, setReadOrder] = useState<ReadOrderInterface[]>([]);
  const [handleButtonState, setHandleButtonState] = useState<Boolean>(false);
  const [newToppings, setNewToppings] = useState<
    Array<{ name: string; updatedToppings: string[] }>
  >([
    { name: "Vesuvius", updatedToppings: [] },
    { name: "Hawaii", updatedToppings: [] },
    { name: "Parma", updatedToppings: [] },
  ]);
  const prevValue = useRef<{ current: DataInterface | null } | null>({
    current: {
      orderId: 1,
      totalPrice: 1,
      orderedAt: "",
      esitmatedDelivery: "",
      status: "",
    },
  });

  //get a list of restaurants
  useEffect(() => {
    fetch(
      "https://private-anon-15ea9634ce-pizzaapp.apiary-mock.com/restaurants/"
    )
      .then((response) => response.json())
      .then((result) => {
        setGetRestaurant(result);
      })
      .catch((error) => setError(error));
  }, []);
  //check if product in basket
  useEffect(() => {
    isInBasketFunc();
  }, []);
  //get the menu
  useEffect(() => {
    fetch(
      "https://private-anon-15ea9634ce-pizzaapp.apiary-mock.com/restaurants/restaurantId/menu?category=Pizza&orderBy=rank"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  //add products to basket
  useEffect(() => {
    let localStorageValues = Object.values(localStorage);
    let parsedValues = localStorageValues.map((e) => JSON.parse(e));
    let keyItemsValues = keyItems.map((obj) => {
      return {
        ...obj,
        topping: newToppings.find((e) => e.name === obj.name)?.updatedToppings,
        quantity: obj.quantity,
      };
    });
    let updatedParsedValues = parsedValues.map((values) => {
      return {
        ...values,
        topping: newToppings.find((e) => e.name === values.name)
          ?.updatedToppings,
        quantity: 1,
      };
    });

    let keyItemsNames = keyItemsValues.map((e) => e.name);
    let parsedValuesNames = updatedParsedValues.map((e) => {
      if (!keyItemsNames.includes(e.name)) {
        return e;
      }
    });
    let parsedValuesFiltered = parsedValuesNames.filter((value) =>
      Boolean(value)
    );

    if (keyItems.length === 0) {
      setKeyItems(updatedParsedValues);
    } else {
      setKeyItems([...keyItemsValues, ...parsedValuesFiltered]);
    }
  }, [isMenuOpen, handleButtonState]);

  //add product to basket
  const addProduct = (id: number) => {
    setKeyItems((keyItems) => {
      return keyItems.map((obj) => {
        if (obj.id === id) {
          return {
            ...obj,
            quantity: typeof obj.quantity === "number" && obj.quantity + 1,
          };
        }
        return obj;
      });
    });
  };

  //delete product from basket
  const deleteProduct = (id: number, name: string): void => {
    if (
      !!keyItems.find(
        (e) => typeof e.quantity === "number" && e.quantity > 1 && e.id === id
      )
    ) {
      setKeyItems((keyItems) => {
        return keyItems.map((obj) => {
          if (obj.id === id && obj.name === name) {
            return {
              ...obj,
              quantity:
                typeof obj.quantity === "number" && obj.quantity > 1
                  ? obj.quantity - 1
                  : 0,
            };
          }
          return obj;
        });
      });
    } else {
      deletesElement(id, name);
    }
  };
  //set toppings
  const setToppings = (value: string, item: ItemsInterface) => {
    setNewToppings((newToppings) =>
      newToppings.map((e) => {
        if (e.name === item.name) {
          return {
            ...e,
            updatedToppings: !e.updatedToppings.includes(value)
              ? [...e.updatedToppings, value]
              : e.updatedToppings.filter((e) => e !== value),
          };
        } else {
          return e;
        }
      })
    );
  };
  //deletes element from basket and localStorage
  const deletesElement = (id: number, name: string): void => {
    localStorage.removeItem(name);
    setKeyItems(keyItems.filter((e) => e.id !== id));
  };
  //order handle
  const handleOrder = async (): Promise<void> => {
    setHandleButtonState(true);
    try {
      const newData = {
        data: keyItems.map((elem) => {
          return {
            menuItemId: elem.id,
            quantity: elem.quantity || 1,
          };
        }),
        restuarantId: locationRestaurant === "Kungsgatan 1" ? 1 : 2,
      };
      const { data } = await axios.post(
        "https://private-anon-15ea9634ce-pizzaapp.apiary-mock.com/orders/",
        newData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setData(data);
      prevValue.current = data;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };
  //get details for order
  const getDetailsOrder = async (): Promise<void> => {
    try {
      const request = await fetch(
        `https://private-anon-15ea9634ce-pizzaapp.apiary-mock.com/orders/${
          data === null ? null : data.orderId
        }`
      );

      const orderDetails = await request.json();

      setReadOrder([orderDetails]);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  //----------------------------------------------
  const functionSetLocation = (event: React.FormEvent<HTMLSelectElement>) => {
    setLocationRestaurant((event.target as HTMLSelectElement).value);
  };
  //----------------------------------------------
  const openBurgerMenu = () => {
    setIsBurgerOpen(true);
  };
  //----------------------------------------------
  const closeBurgerMenu = () => {
    setIsBurgerOpen(false);
  };
  //----------------------------------------------
  const openNavMenu = () => {
    setIsMenuOpen(true);
  };
  //----------------------------------------------
  const closeNavMenu = () => {
    setIsMenuOpen(false);
    isInBasketFunc();
  };
  //----------------------------------------------
  const isInBasketFunc = () => {
    setIsInBasket(Object.values(localStorage).map((e) => JSON.parse(e)));
  };

  return (
    <BrowserRouter>
      <MyContext.Provider
        value={{
          addProduct,
          deleteProduct,
          deletesElement,
          error,
          isLoaded,
          items,
          isMenuOpen,
          openNavMenu,
          closeNavMenu,
          isInBasketFunc,
          isInBasket,
          functionSetLocation,
          locationRestaurant,
          getRestaurant,
          handleOrder,
          keyItems,
          setKeyItems,
          data,
          readOrder,
          getDetailsOrder,
          prevValue,
          isBurgerOpen,
          openBurgerMenu,
          closeBurgerMenu,
          setToppings,
          newToppings,
        }}
      >
        <BurgerMenu />
        <div className={"wrapper"}>
          <Header />
          <div className={isMenuOpen ? "opacityApply" : undefined}>
            <Main />
          </div>
          <NavMenu />
          <Footer />
        </div>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
