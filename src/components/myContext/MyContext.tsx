import React from "react";
import {
  PurchaseDataInterface,
  MenuInterface,
  BasketItemsInterface,
  ReadOrderInterface,
  RestaurantInterface,
} from "../types";
interface contextInterface {
  error: string | null;
  isLoaded: Boolean;
  menu: MenuInterface[] | null;
  isMenuOpen: Boolean;
  openNavMenu: () => void;
  closeNavMenu: () => void;
  isInBasketFunc: () => void;
  isInBasket: Array<{}>;
  functionSetLocation: (event: React.FormEvent<HTMLSelectElement>) => void;
  locationRestaurant: string;
  getRestaurant: RestaurantInterface[];
  handleOrder: () => Promise<void>;
  basketItems: BasketItemsInterface[];
  purchaseData: PurchaseDataInterface | null;
  readOrder: ReadOrderInterface[];
  getDetailsOrder: () => Promise<void>;
  prevValue: { current: {} | null } | null;
  isBurgerOpen: Boolean;
  openBurgerMenu: () => void;
  closeBurgerMenu: () => void;
  addProduct: (id: number) => void;
  decreaseProductCount: (id: number, name: string) => void;
  deleteFromBasketAndStorage: (id: number, name: string) => void;
  setToppings: (value: string, item: MenuInterface) => void;
  newToppings: Array<{ name: string; updatedToppings: string[] }>;
  handleButtonState: Boolean;
  togglePop: () => void;
}

export const MyContext = React.createContext<contextInterface>(
  {} as contextInterface
);
