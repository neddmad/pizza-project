import NavOrderHandlerSliceReducer from "../features/NavOrderHandlerSlice/NavOrderHandlerSlice";
import BasketSliceReducer from "../features/BasketSlice/BasketSlice";
import OthersSliceReducer from "../features/OthersSlice/OthersSlice";
import DataFetchingReducer from "../features/api/DataFetching";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    data: DataFetchingReducer,
    basket: BasketSliceReducer,
    others: OthersSliceReducer,
    NavOrderHandler: NavOrderHandlerSliceReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
