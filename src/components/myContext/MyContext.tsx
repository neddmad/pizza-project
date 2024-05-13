import React from "react";
import {
  DataInterface,
  ItemsInterface,
  KeyItemsInterface,
  ReadOrderInterface,
  RestaurantInterface,
} from "../types";
interface contextInterface {
  error: string | null;
  isLoaded: Boolean;
  items: ItemsInterface[] | null;
  isMenuOpen: Boolean;
  openNavMenu: () => void;
  closeNavMenu: () => void;
  isInBasketFunc: () => void;
  isInBasket: Array<{}>;
  functionSetLocation: (event: React.FormEvent<HTMLSelectElement>) => void;
  locationRestaurant: string;
  getRestaurant: RestaurantInterface[];
  handleOrder: () => Promise<void>;
  keyItems: KeyItemsInterface[];
  setKeyItems: React.Dispatch<React.SetStateAction<KeyItemsInterface[]>>;
  data: DataInterface | null;
  readOrder: ReadOrderInterface[];
  getDetailsOrder: () => Promise<void>;
  prevValue: { current: {} | null } | null;
  isBurgerOpen: Boolean;
  openBurgerMenu: () => void;
  closeBurgerMenu: () => void;
  addProduct: (id: number) => void;
  deleteProduct: (id: number, name: string) => void;
  deletesElement: (id: number, name: string) => void;
  setToppings: (value: string, item: ItemsInterface) => void;
  newToppings: Array<{ name: string; updatedToppings: string[] }>;
}

export const MyContext = React.createContext<contextInterface>(
  {} as contextInterface
);
