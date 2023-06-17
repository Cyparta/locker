import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { BASEURL } from "../../data/API";
export const getProducts = createAsyncThunk("getProducts", async () => {
  const response = await axios.get(`${BASEURL}products/`);
  return response.data;
});

const initialState = {
  loading: false,
  error: null,
  items: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.items = [];
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;