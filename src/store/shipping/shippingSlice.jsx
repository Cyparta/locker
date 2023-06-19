import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { BASEURL } from "../../data/API";
import jwt_decode from "jwt-decode";

const today = new Date();
const dayAfterTomorrow = new Date();
dayAfterTomorrow.setDate(today.getDate() + 2);

const year = dayAfterTomorrow.getFullYear();
const month = String(dayAfterTomorrow.getMonth() + 1).padStart(2, "0");
const day = String(dayAfterTomorrow.getDate()).padStart(2, "0");

const formattedDate = `${year}-${month}-${day}`;
export const getShipping = createAsyncThunk(
  "getShipping",
  async (data, ThunkApi) => {
    try {
      const token = ThunkApi.getState().user.user;
      const response = await axios.get(`${BASEURL}shippingaddress/`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      return response.data.results;
    } catch (err) {
      return ThunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const getShippingID = createAsyncThunk(
  "getShippingID",
  async (data, ThunkApi) => {
    try {
      const token = ThunkApi.getState().user.user;
      const response = await axios.get(`${BASEURL}shippingaddress/${data}/`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return ThunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const editShippingID = createAsyncThunk(
  "editShippingID",
  async (data, ThunkApi) => {
    try {
      const token = ThunkApi.getState().user.user;
      const shipping = ThunkApi.getState().shipping.getShipping;
      const response = await axios.put(
        `${BASEURL}shippingaddress/${data}/`,
        { ...shipping },
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

// /shippingaddress/1/

export const deleteShipping = createAsyncThunk(
  "deleteShipping",
  async (data, ThunkApi) => {
    try {
      const token = ThunkApi.getState().user.user;
      await axios.delete(`${BASEURL}shippingaddress/${data.id}/`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      return data.id;
    } catch (err) {
      return ThunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const postShipping = createAsyncThunk(
  "postShipping",
  async (data, ThunkApi) => {
    try {
      const token = ThunkApi.getState().user.user;
      const saved = ThunkApi.getState().shipping.saved;
      const decoded = jwt_decode(token);
      const response = await axios.post(
        `${BASEURL}shippingaddress/`,
        { ...data, customer: decoded.user_id },
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
      localStorage.setItem("saved", saved);
      // ThunkApi.dispatch(postOrder())
      return response.data;
    } catch (err) {
      return ThunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const postOrder = createAsyncThunk(
  "postOrder",
  async (data, ThunkApi) => {
    console.log(ThunkApi.getState().shipping);
    const { delivery_date, delivery_time } = ThunkApi.getState().shipping;
    try {
      // const decoded = jwt_decode(token);

      const token = ThunkApi.getState().user.user;
      const cartID = ThunkApi.getState().cart.cartID;
      const response = await axios.post(
        `${BASEURL}orders/`,
        {
          // order_info: checked ? "Pickup from the branch" : "Delivery",
          // order_info: "Delivery",
          cart_id: cartID,
          ...data,
          delivery_date: delivery_date,
          delivery_time: delivery_time,
          name_of_the_business: null,
          position_of_the_business: null,
          address: null,
          // delivery_date:null,
          phone_number: null,
          ein_number: null,
        },
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

export const postGuestOrder = createAsyncThunk(
  "postGuestOrder",
  async (data, ThunkApi) => {
    const { delivery_date, delivery_time } = ThunkApi.getState().shipping;
    try {
      const cartID = ThunkApi.getState().guestCart.cartID;
      const response = await axios.post(`${BASEURL}guestorders/`, {
        // order_info: checked ? "Pickup from the branch" : "Delivery",
        // order_info: "Delivery",
        cart_id: cartID,
        ...data,
        delivery_date: delivery_date,
        delivery_time: delivery_time,
        name_of_the_business: null,
        position_of_the_business: null,
        address: null,
        // delivery_date:null,
        phone_number: null,
        ein_number: null,
      });

      return response.data;
    } catch (err) {
      return ThunkApi.rejectWithValue(err.response.data);
    }
  }
);

// https://stingray-app-ojidz.ondigitalocean.app/orders/

const getLocalStoarge = () => {
  const result = localStorage.getItem("saved");
  const saved = result ? JSON.parse(result) : false;
  return saved;
};

const initialState = {
  loading: false,
  error: null,
  errorMsg: null,
  errorDelivery: null,
  errorDeliveryMsg: null,
  items: [],
  checked: false,
  checkedSavedAdress: null,
  savedAdress: false,
  retail: true,
  saved: getLocalStoarge(),
  delivery_date: formattedDate,
  delivery_time: "10AM-12PM",
  shipping: {
    company_name: "",
    country: "US",
    address: "",
    house_number: "",
    city: "",
    postal_code: "",
    governoate: "",
    phone: "",
    name_of_the_business: null,
    position_of_the_business: null,
    phone_number: null,
    ein_number: null,
  },
  getShipping: {},
  emailContact:"",
  allShipping: [],
  indexOfShipping: 10,
};

export const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    updateForm(state, action) {
      const { name, value } = action.payload;
      state.getShipping[name] = value;
    },
    postForm(state, action) {
      const { name, value } = action.payload;
      state.shipping[name] = value;
    },
    clearForm(state, action) {
      state.shipping = {
        country: "US",
        firstName: "",
        lastName: "",
        address: "",
        house_number: "",
        city: "",
        postal_code: "",
        governoate: "",
        phone: "",
      };
    },
    setChecked(state, action) {
      state.checked = action.payload;
    },
    setSaved(state) {
      state.saved = !state.saved;
    },
    setCheckedSavedAdress(state, action) {
      state.checkedSavedAdress = action.payload;
    },
    setSavedAdress(state, action) {
      state.savedAdress = !state.savedAdress;
    },
    setRetail(state, action) {
      state.retail = !state.retail;
    },
    setDeliveryDate(state, action) {
      state.delivery_date = action.payload;
    },
    setDeliveryTime(state, action) {
      state.delivery_time = action.payload;
    },
    setErrorDeliveryMsg(state, action) {
      state.errorDelivery = action.payload;
    },
    setErrorMsg(state, action) {
      state.errorMsg = {
        ...state.errorMsg,
        [action.payload.name]: action.payload.value,
      };
    },
    setEmailContact(state, action) {
      state.emailContact = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postShipping.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.items = [];
      })
      .addCase(postShipping.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = false;
        toast.success("your shipping saved");
      })
      .addCase(postShipping.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMsg = action.payload;
      });
    /* get Shipping */
    builder
      .addCase(getShipping.pending, (state, action) => {
        state.customer = [];
      })
      .addCase(getShipping.fulfilled, (state, action) => {
        const { payload } = action;
        state.allShipping = payload;
        state.indexOfShipping = payload.length - 1;
      })
      .addCase(getShipping.rejected, (state, action) => {
        state.error = action.error.message;
      });

    /* DELETE SHIPPING */
    builder
      .addCase(deleteShipping.pending, (state, action) => {
        state.customer = [];
      })
      .addCase(deleteShipping.fulfilled, (state, action) => {
        state.allShipping = state.allShipping.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteShipping.rejected, (state, action) => {
        state.error = action.error.message;
      });

    /* post order */
    builder
      .addCase(postOrder.pending, (state, action) => {})
      .addCase(postOrder.fulfilled, (state, action) => {})
      .addCase(postOrder.rejected, (state, action) => {
        console.log(action);
        state.errorDelivery = action.error.message;
        state.errorDeliveryMsg = action.payload;
      });

    /* GET SHIPPING with ID */
    builder
      .addCase(getShippingID.pending, (state, action) => {})
      .addCase(getShippingID.fulfilled, (state, action) => {
        console.log(action.payload);
        state.getShipping = action.payload;
      })
      .addCase(getShippingID.rejected, (state, action) => {
        console.log(action);
        state.errorDelivery = action.error.message;
        state.errorDeliveryMsg = action.payload;
      });

    builder
      .addCase(editShippingID.pending, (state, action) => {})
      .addCase(editShippingID.fulfilled, (state, action) => {
        // state.getShipping = action.payload;
        toast.success("your address saved");
      })
      .addCase(editShippingID.rejected, (state, action) => {
        console.log(action);
        state.errorDelivery = action.error.message;
        state.errorDeliveryMsg = action.payload;
      });

    /* post order Guest */
    builder
      .addCase(postGuestOrder.pending, (state, action) => {})
      .addCase(postGuestOrder.fulfilled, (state, action) => {})
      .addCase(postGuestOrder.rejected, (state, action) => {
        state.errorDelivery = action.error.message;
        state.errorDeliveryMsg = action.payload;
      });
  },
});

export const {
  postForm,
  updateForm,
  clearForm,
  setChecked,
  setSaved,
  setCheckedSavedAdress,
  setSavedAdress,
  setRetail,
  setDeliveryDate,
  setDeliveryTime,
  setErrorDeliveryMsg,
  setErrorMsg,
  setEmailContact
} = shippingSlice.actions;

export default shippingSlice.reducer;
