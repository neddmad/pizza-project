import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  MenuInterface,
  PurchaseDataInterface,
  ReadOrderInterface,
  RestaurantInterface,
} from "../../components/types";

interface dataFetchingState {
  restaurants: RestaurantInterface[];
  menu: MenuInterface[];
  isLoaded: boolean;
  error: string | null;
  readOrder: ReadOrderInterface[];
  purchaseData: PurchaseDataInterface;
}
const initialState: dataFetchingState = {
  restaurants: [],
  menu: [],
  isLoaded: false,
  error: null,
  readOrder: [],
  purchaseData: {
    orderId: 1,
    totalPrice: 1,
    orderedAt: "",
    esitmatedDelivery: "",
    status: "",
  },
};

export const dataFetchingSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchMenu.fulfilled, (state, action: PayloadAction<[]>) => {
      if (state.menu.length === 0) {
        state.menu.push(...action.payload);
      }
    });
    builder.addCase(
      fetchRestaurants.fulfilled,
      (state, action: PayloadAction<[]>) => {
        if (state.restaurants.length === 0) {
          state.restaurants.push(...action.payload);
        }
      }
    );
    builder.addCase(
      fetchOrder.fulfilled,
      (state, action: PayloadAction<PurchaseDataInterface>) => {
        state.purchaseData = action.payload;
      }
    );
    builder.addCase(fetchMenu.pending, (state, action) => {
      state.isLoaded = true;
    });
    builder.addCase(fetchOrderDetails.fulfilled, (state, action) => {
      state.readOrder.push(action.payload);
    });
  },
});

export const fetchMenu = createAsyncThunk("menu/fetchMenu", async () => {
  const request = await fetch(
    "https://private-anon-d718afa727-pizzaapp.apiary-mock.com/restaurants/restaurantId/menu?category=Pizza&orderBy=rank"
  );
  let response = request.json();

  return response;
});

export const fetchOrderDetails = createAsyncThunk(
  "order/orderDetails",
  async (data: PurchaseDataInterface) => {
    const request = await fetch(
      `https://private-anon-d718afa727-pizzaapp.apiary-mock.com/restaurants/${
        data === null ? null : data.orderId
      }`
    );
    const result = request.json();
    return result;
  }
);

export const fetchRestaurants = createAsyncThunk(
  "menu/fetchRestaurants",
  async () => {
    const request = await fetch(
      "https://private-anon-d718afa727-pizzaapp.apiary-mock.com/restaurants/"
    );
    let response = request.json();

    return response;
  }
);
export const fetchOrder = createAsyncThunk(
  "fetchOrder/Order",
  async (items: {}) => {
    const info = await fetch(
      "https://private-anon-d718afa727-pizzaapp.apiary-mock.com/orders/",
      {
        method: "POST",
        body: JSON.stringify(items),
        headers: { "Content-Type": "application/json" },
      }
    );

    let result = info.json();

    return result;
  }
);

export default dataFetchingSlice.reducer;
