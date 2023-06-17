import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  cartNav: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setCartNav: (state, action) => {
      state.cartNav = true;
    },
    closeCartNav: (state, action) => {
      state.cartNav = false;
    }
  },
});

export const { setCartNav, closeCartNav } = globalSlice.actions

export default globalSlice.reducer;