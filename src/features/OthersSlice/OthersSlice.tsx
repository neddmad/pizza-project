import { createSlice } from "@reduxjs/toolkit";

interface initialStateInt {
  seen: Boolean;
  isBurgerOpen: Boolean;
  isMenuOpen: Boolean;
  isInBasket: Array<{}>;
  locationRestaurant: string;
}

const initialState: initialStateInt = {
  seen: false,
  isBurgerOpen: false,
  isMenuOpen: false,
  isInBasket: [],
  locationRestaurant: "",
};

const othersSlice = createSlice({
  name: "others",
  initialState,
  reducers: {
    functionSetLocation(state, action) {
      state.locationRestaurant = action.payload;
    },
    togglePop(state) {
      state.seen = !state.seen;
    },
    openBurgerMenu(state) {
      state.isBurgerOpen = true;
    },
    closeBurgerMenu(state) {
      state.isBurgerOpen = false;
    },
    openNavMenu(state) {
      state.isMenuOpen = true;
    },
    closeNavMenu(state) {
      state.isMenuOpen = false;
      othersSlice.caseReducers.isInBasketFunc(state);
    },
    isInBasketFunc(state) {
      state.isInBasket = [
        ...Object.values(localStorage).map((e) => JSON.parse(e)),
      ];
    },
  },
});

export const {
  isInBasketFunc,
  closeNavMenu,
  openNavMenu,
  closeBurgerMenu,
  openBurgerMenu,
  togglePop,
  functionSetLocation,
} = othersSlice.actions;

export default othersSlice.reducer;
