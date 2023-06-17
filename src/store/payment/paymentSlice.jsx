import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { BASEURL } from "../../data/API";
import { clearItems } from "../cart/cartSlice";
export const postPayment = createAsyncThunk("postPayment", async (data, ThunkApi) => {
  try {
    const token = ThunkApi.getState().user.user;
    const response = await axios.post(
      `${BASEURL}payment/order/${data.pk}`,{},
      {
        headers: {
          Authorization: "JWT " + token,
        },
      }
    );
    ThunkApi.dispatch(clearItems())
      
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

const initialState = {
  loading: false,
  error: null,
  items: [],
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.items = [];
      })
      .addCase(postPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(postPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default paymentSlice.reducer;
