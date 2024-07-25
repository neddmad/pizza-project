import { createSlice } from "@reduxjs/toolkit";

interface initialStateInt {
  handleButtonState: boolean;
}

const initialState: initialStateInt = {
  handleButtonState: false,
};

const NavOrderHandlerSlice = createSlice({
  name: "NavOrderHandler",
  initialState,
  reducers: {
    setHandleButtonState(state) {
      state.handleButtonState = true;
    },
  },
});

export const { setHandleButtonState } = NavOrderHandlerSlice.actions;

export default NavOrderHandlerSlice.reducer;
