import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { toast } from "react-toastify";
import { BASEURL } from "../../data/API";

export const getOrder = createAsyncThunk("getOrder", async (data, ThunkApi) => {
  const token = ThunkApi.getState().user.user;
  try {
    const response = await axios.get(`${BASEURL}orders/`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return ThunkApi.rejectWithValue(error.response.data);
  }
});

// getOrderID
export const getOrderID = createAsyncThunk(
  "getOrderID",
  async (data, ThunkApi) => {
    const token = ThunkApi.getState().user.user;
    try {
      const response = await axios.get(`${BASEURL}orders/${data}`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return ThunkApi.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  orders: [],
  order: {},
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* GET order */
    builder
      .addCase(getOrder.pending, (state, action) => {
        state.orders = [];
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.orders = action.payload.results;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.error = action.error.message;
      });

    /* GET orderID */
    builder
      .addCase(getOrderID.pending, (state, action) => {
        state.order = [];
      })
      .addCase(getOrderID.fulfilled, (state, action) => {
        state.order = action.payload;
      })
      .addCase(getOrderID.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
