import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { BASEURL } from "../../data/API";
import { toast } from "react-toastify";

const getLocalStoarge = () => {
  const result = localStorage.getItem("tokenGuest");
  const cartID = result ? result : null;
  return cartID;
};

// Get Cart
export const getGuestCart = createAsyncThunk("getGuestCart", async (data, ThunkApi) => {
  const cartID = ThunkApi.getState().guestCart.cartID;
  const guestCart = localStorage.getItem("guestCart")
  const response = await axios.get(`${BASEURL}guestcarts/${cartID}`);
  return response.data;
});

// POST Item To Cart
export const postItemToCart = createAsyncThunk(
  "postCart",
  async ({ product_id, quantity, is_wholesale, cartID }, ThunkApi) => {
    try {
      const token = ThunkApi.getState().user.user;
      const {  choose_option, slaying, occassion } =
        ThunkApi.getState().guestCart;
      const response = await axios.post(
        `${BASEURL}guestcarts/${cartID}/items/`,
        {
          product_id,
          quantity,
          is_wholesale,
          occassion,
          choose_option,
          slaying,
        }
      );
      return response.data;
    } catch (err) {
      return ThunkApi.rejectWithValue(err.response.data);
    }
  }
);

// Delete Cart
export const deleteGuestCart = createAsyncThunk(
  "deleteGuestCart",
  async (data, ThunkApi) => {
    const cartID = ThunkApi.getState().guestCart.cartID;
    const response = await axios.delete(
      `${BASEURL}guestcarts/${cartID}/items/${data}/`
    );
    return { res: response.data, id: data };
  }
);

// update Guest Quantity
export const updateGuestQuantity = createAsyncThunk(
  "updateGuestQuantity",
  async ({ quantity, id }, ThunkApi) => {
    const cartID = ThunkApi.getState().guestCart.cartID;
    const res = await axios.patch(
      `${BASEURL}guestcarts/${cartID}/items/${id}/`,
      {
        quantity,
      }
    );
    return { res, quantity, id };
  }
);

// // post Cart
export const postCartGuest = createAsyncThunk(
  "postCartGuest",
  async (_, ThunkApi) => {
    try {
      const response = await axios.post(`${BASEURL}guestcarts/`, {});
      return response.data;
    } catch (err) {
      return ThunkApi.rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  items: [],
  fullItems: [],
  cartID: getLocalStoarge(),
  total_price: null,
  delivery_total: null,
  test: [],
  slaying: "On My own responsibility",
  choose_option: 1,
  occassion: "Normal",
  is_wholesale: false,
  slayingErr: null,
};

export const guestCartSlice = createSlice({
  name: "guestCart",
  initialState,
  reducers: {
    clearItems: (state, action) => {
      state.items = [];
      state.delivery_total = 0;
      state.total_price = 0;
      state.cartID = null
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
      state.is_wholesale = action.payload;
    },
    setCartID: (state, action) => {
      state.cartID = null
    }
  },
  extraReducers: (builder) => {
    // post CART For Guest
    builder.addCase(postCartGuest.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(postCartGuest.fulfilled, (state, action) => {
      state.cartID = action.payload.id;
      localStorage.setItem("tokenGuest", action.payload.id);
    });
    builder.addCase(postCartGuest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.detail;
      toast.error(action.payload.detail);
    });

    // get Guest Cart
    builder.addCase(getGuestCart.pending, (state) => {
      state.loading = true;
      state.items = [];
    });
    builder.addCase(getGuestCart.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload.items ;
      state.fullItems = action.payload;
      state.total_price = action.payload.deposite_total_price;
      state.delivery_total = action.payload.delivery_total;
      state.is_wholesale = action.payload.is_wholesale;
    });
    builder.addCase(getGuestCart.rejected, (state, action) => {
      state.loading = false;
    });
    // post item Cart
    builder.addCase(postItemToCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(postItemToCart.fulfilled, (state, action) => {
      state.loading = false;
      state.items = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    });
    builder.addCase(postItemToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.detail;
      // console.log(action.payload.detail)
      toast.error(action.payload.detail)
    });
    // delete item from cart
    builder.addCase(deleteGuestCart.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteGuestCart.fulfilled, (state, action) => {
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
    builder.addCase(deleteGuestCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    // update Guest Quantity
    builder.addCase(updateGuestQuantity.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateGuestQuantity.fulfilled, (state, { payload }) => {
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
      state.test = state.items.map((item) => item)
      // sum Delvery
      const test = state.items
        .map((item) => item.product.delivery_fees * item.quantity)
        .reduce((total, current) => total + current);
      state.delivery_total = test;
    });
    builder.addCase(updateGuestQuantity.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const {
  clearItems,
  setValues,
  setChooseOpt,
  setSlaying,
  setError,
  setWholesale,
  setCartID
} = guestCartSlice.actions;
export default guestCartSlice.reducer;