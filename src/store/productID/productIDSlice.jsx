import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { BASEURL } from "../../data/API";
export const getProductID = createAsyncThunk("getProductID", async (data) => {
  const response = await axios.get(`${BASEURL}products/${data}/`);
  return response.data;
});

const initialState = {
  loading: false,
  error: null,
  items: [],
  count:1,
};

export const productsIDSlice = createSlice({
  name: "productID",
  initialState,
  reducers: {
    setCount: (state, action) => {
      if (action.payload.type == "dec") {
        if (state.count > 1) {
          state.count -= 1
        } else {
          state.count = 1
        }
      } else {
        state.count += 1
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductID.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.items = [];
      })
      .addCase(getProductID.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getProductID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


export const {setCount} = productsIDSlice.actions
export default productsIDSlice.reducer;