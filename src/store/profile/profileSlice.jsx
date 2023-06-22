import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { toast } from "react-toastify";
import { BASEURL } from "../../data/API";

export const postChangePassword = createAsyncThunk(
  "postChangePassword",
  async (data, ThunkApi) => {
    const token = ThunkApi.getState().user.user;
    try {
      const response = await axios.post(
        `${BASEURL}auth/password/users/set_password/`,
        {
          ...data,
        },
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      
      return ThunkApi.rejectWithValue(error.response.data.current_password[0]);
    }
  }
);

// export const getProfile = createAsyncThunk(
//   "getProfile",
//   async (data, ThunkApi) => {
//     const token = ThunkApi.getState().user.user;
//     try {
//       const response = await axios.get(`${BASEURL}auth/users/me/`, {
//         headers: {
//           Authorization: `JWT ${token}`,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       return ThunkApi.rejectWithValue(error.response.data);
//     }
//   }
// );

// https://stingray-app-ojidz.ondigitalocean.app/customers/me/
export const getCustomer = createAsyncThunk(
  "getCustomer",
  async (data, ThunkApi) => {
    const token = ThunkApi.getState().user.user;
    try {
      const response = await axios.get(`${BASEURL}customers/me/`, {
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

export const updateCustomer = createAsyncThunk(
  "updateCustomer",
  async (data, ThunkApi) => {
    const token = ThunkApi.getState().user.user;
    try {
      const response = await axios.put(`${BASEURL}customers/me/`, {...data}, {
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

export const editProfile = createAsyncThunk(
  "editProfile",
  async (data, ThunkApi) => {
    const token = ThunkApi.getState().user.user;
    try {
      const response = await axios.post(
        `${BASEURL}auth/users/set_password/`,
        {
          ...data,
        },
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return ThunkApi.rejectWithValue(error.response.data.current_password[0]);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  user: [],
  profile: [],
  customer:[]
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setValueUser: (state, {payload}) => {
      const {name, value} = payload;
      state.customer[name] = value
    }
  },
  extraReducers: (builder) => {
    /* change password */
    builder
      .addCase(postChangePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.user = [];
      })
      .addCase(postChangePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        toast.success(`password has been successfully changed`);
      })
      .addCase(postChangePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(action.payload);
      });
    /* getProfile */
    // builder
    //   .addCase(getProfile.pending, (state, action) => {
    //     state.profile = [];
    //   })
    //   .addCase(getProfile.fulfilled, (state, action) => {
    //     state.profile = action.payload;
    //   })
    //   .addCase(getProfile.rejected, (state, action) => {
    //     state.error = action.error.message;
    //   });
    /* get Customer */
    builder
      .addCase(getCustomer.pending, (state, action) => {
        state.customer = [];
      })
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.customer = action.payload;
      })
      .addCase(getCustomer.rejected, (state, action) => {
        state.error = action.error.message;
      });
      builder
      .addCase(updateCustomer.pending, (state, action) => {
        state.customer = [];
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.customer = action.payload;
        toast.success("Your Account Info Saved")
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { setValueUser } = profileSlice.actions


export default profileSlice.reducer;
