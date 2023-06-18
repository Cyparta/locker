// https://stingray-app-ojidz.ondigitalocean.app/carts/2

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { BASEURL } from "../../data/API";
import { toast } from "react-toastify";

export const getCart = createAsyncThunk("getCart", async (data, ThunkApi) => {
  const token = ThunkApi.getState().user.user;
  const response = await axios.get(`${BASEURL}carts/`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  });
  return response.data;
});

export const postCart = createAsyncThunk(
  "postCart",
  async ({ product_id, quantity, is_wholesale }, ThunkApi) => {
    try {

      const token = ThunkApi.getState().user.user;
      const { cartID, choose_option, slaying, occassion } =
        ThunkApi.getState().cart;
      const response = await axios.post(
        `${BASEURL}carts/${cartID}/items/`,
        { product_id, quantity, is_wholesale, occassion, choose_option, slaying },
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return ThunkApi.rejectWithValue(err.response.data);
    }

  }
);

// Delete Cart
export const deleteCart = createAsyncThunk(
  "deleteCart",
  async (data, ThunkApi) => {
    const token = ThunkApi.getState().user.user;
    const cartID = ThunkApi.getState().cart.cartID;

    const response = await axios.delete(
      `${BASEURL}carts/${cartID}/items/${data}/`,
      {
        headers: {
          Authorization: `JWT ${token}`,
        },
      }
    );
    return { res: response.data, id: data };
  }
);

export const updateQuantity = createAsyncThunk(
  "updateQuantity",
  async ({ quantity, id }, ThunkApi) => {
    const token = ThunkApi.getState().user.user;
    const cartID = ThunkApi.getState().cart.cartID;
    const res = await axios.patch(
      `${BASEURL}carts/${cartID}/items/${id}/`,
      {
        quantity,
      },
      {
        headers: {
          Authorization: `JWT ${token}`,
        },
      }
    );
    return { res, quantity, id };
  }
);

const initialState = {
  loading: false,
  error: null,
  items: [],
  fullItems: [],
  cartID: null,
  total_price: null,
  delivery_total: null,
  test: [],
  slaying: "On My own responsibility",
  choose_option: 1,
  occassion: "Normal",
  is_wholesale: false,
  slayingErr: null
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearItems: (state, action) => {
      state.items = [];
      state.delivery_total = 0;
      state.total_price = 0;
    },
    setValues: (state, action) => {
      state.occassion = action.payload;
    },
    setChooseOpt: (state, action) => {
      state.choose_option = action.payload;
    },
    setSlaying: (state, action) => {
      state.slaying = action.payload;
    },
    setError: (state, action) => {
      state.slayingErr = action.payload;
    },
    setWholesale: (state, action) => {
      state.is_wholesale = action.payload
    }
  },
  extraReducers: (builder) => {
    // getCart
    builder.addCase(getCart.pending, (state) => {
      state.loading = true;
      state.items = [];
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload.results[0]?.items;
      state.fullItems = action.payload;
      state.cartID = action.payload.results[0].id;
      state.total_price = action.payload.results[0].deposite_total_price;
      state.delivery_total = action.payload.results[0].delivery_total;
      state.is_wholesale = action.payload.results[0].is_wholesale;
    });
    builder.addCase(getCart.rejected, (state, action) => {
      state.loading = false;
    });
    // post item Cart
    builder.addCase(postCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(postCart.fulfilled, (state, action) => {
      state.loading = false;
      state.items = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    });
    builder.addCase(postCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.detail;
      // console.log(action.payload.detail)
      toast.error(action.payload.detail)
    });
    // delete item from cart
    builder.addCase(deleteCart.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteCart.fulfilled, (state, action) => {
      state.loading = false;
      state.items = state.items.filter((item) => {
        return item.id !== action.payload.id;
      });
      state.total_price = state.items
        .map((current) => current.subtotal_price)
        .reduce((total, current) => total + current, 0);

      // sum Delvery
      const test = state.items
        .map((item) => item.product.delivery_fees * item.quantity)
        .reduce((total, current) => total + current, 0);
      state.delivery_total = test;
    });
    builder.addCase(deleteCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    // patch Quantity
    builder.addCase(updateQuantity.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateQuantity.fulfilled, (state, { payload }) => {
      const { quantity, id, res } = payload;
      state.loading = false;
      // update quantity
      state.items = state.items.map((item) => {
        return item.id === id
          ? { ...item, quantity, subtotal_price: res.data.subtotal_price }
          : item;
      });
      // sum total
      const sumTotal = state.items
        .map((item) => item.subtotal_price)
        .reduce((total, current) => total + current);
      state.total_price = sumTotal;
      // sum Delvery
      const test = state.items
        .map((item) => item.product.delivery_fees * item.quantity)
        .reduce((total, current) => total + current);
      state.delivery_total = test;
    });
    builder.addCase(updateQuantity.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { clearItems, setValues, setChooseOpt, setSlaying, setError, setWholesale } =
  cartSlice.actions;
export default cartSlice.reducer;
