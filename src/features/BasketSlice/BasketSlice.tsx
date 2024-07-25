import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BasketItemsInterface } from "../../components/types";

interface initialState {
  basketItems: BasketItemsInterface[];
  newToppings: Array<{ name: string; updatedToppings: string[] }>;
}

const initialState: initialState = {
  basketItems: [],
  newToppings: [
    { name: "Vesuvius", updatedToppings: [] },
    { name: "Hawaii", updatedToppings: [] },
    { name: "Parma", updatedToppings: [] },
  ],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setInitialValuesBasket(state) {
      let parsedValues = Object.values(localStorage).map((e) => JSON.parse(e));

      let keyItemsValues: BasketItemsInterface[] = state.basketItems.map(
        (obj) => {
          return {
            ...obj,
            topping: state.newToppings.find((e) => e.name === obj.name)
              ?.updatedToppings,
            quantity: obj.quantity,
          };
        }
      );

      let updatedParsedValues = parsedValues.map((values) => {
        if (values.category === "Pizza") {
          return {
            ...values,
            topping: state.newToppings.find((e) => e.name === values.name)
              ?.updatedToppings,
            quantity: 1,
          };
        } else {
          return {
            ...values,
            quantity: 1,
          };
        }
      });

      let keyItemsNames = keyItemsValues.map((e) => e.name);
      let parsedValuesNames: BasketItemsInterface[] = updatedParsedValues.map(
        (e) => {
          if (!keyItemsNames.includes(e.name)) {
            return e;
          }
        }
      );
      let parsedValuesFiltered = parsedValuesNames.filter((value) =>
        Boolean(value)
      );
      if (state.basketItems.length === 0) {
        state.basketItems = updatedParsedValues;
      } else {
        state.basketItems = [...keyItemsValues, ...parsedValuesFiltered];
      }
    },
    addProduct(state, action) {
      const { elemId } = action.payload;
      state.basketItems = state.basketItems.map((items) => {
        if (items.id === elemId) {
          return {
            ...items,
            quantity: typeof items.quantity === "number" && items.quantity + 1,
          };
        }
        return items;
      });
    },
    decreaseProductCount(state, action) {
      const { elemId, elemName } = action.payload;
      if (
        !!state.basketItems.find(
          (e) =>
            typeof e.quantity === "number" && e.quantity > 1 && e.id === elemId
        )
      ) {
        state.basketItems = state.basketItems.map((items) => {
          if (items.id === elemId && items.name === elemName) {
            return {
              ...items,
              quantity:
                typeof items.quantity === "number" && items.quantity > 1
                  ? items.quantity - 1
                  : 0,
            };
          }
          return items;
        });
      } else {
        basketSlice.caseReducers.deleteFromBasketAndStorage(state, {
          payload: { elemIdNav: elemId, elemNameNav: elemName },
          type: "basket/deleteFromBasketAndStorage",
        });
      }
    },
    deleteFromBasketAndStorage(state, action) {
      const { elemIdNav, elemNameNav } = action.payload;
      localStorage.removeItem(elemNameNav);
      state.basketItems = state.basketItems.filter((e) => e.id !== elemIdNav);
    },
    setToppings(state, action) {
      const { topping, item } = action.payload;
      state.newToppings = state.newToppings.map((items) => {
        if (items.name === item.name) {
          return {
            ...items,
            updatedToppings: !items.updatedToppings.includes(topping)
              ? [...items.updatedToppings, topping]
              : items.updatedToppings.filter((e) => e !== topping),
          };
        }
        return items;
      });
    },
  },
});

export const {
  addProduct,
  decreaseProductCount,
  setToppings,
  deleteFromBasketAndStorage,
  setInitialValuesBasket,
} = basketSlice.actions;

export default basketSlice.reducer;
