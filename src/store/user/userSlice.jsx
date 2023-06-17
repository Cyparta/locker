import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { toast } from "react-toastify";
import { BASEURL } from "../../data/API";

const getLocalStoarge = () => {
  const result = localStorage.getItem("token");
  const user = result ? JSON.parse(result) : null;
  return user;
};

export const postLogin = createAsyncThunk(
  "postLogin",
  async (data, ThunkApi) => {
    try {
      const response = await axios.post(`${BASEURL}auth/jwt/create/`, {
        ...data,
      });
      const checked = ThunkApi.getState().user.checked;
      if (checked) {
        localStorage.setItem("token", JSON.stringify(response?.data?.access));
      }
      return response.data;
    } catch (error) {
      return ThunkApi.rejectWithValue(error.response.data.detail);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "resetPassword",
  async (data, ThunkApi) => {
    try {
      const response = await axios.post(`${BASEURL}auth/password/users/reset_password/`, {
        ...data,
      });
      return response.data;
    } catch (error) {
      
      return ThunkApi.rejectWithValue(error.response);
    }
  }
);

export const newPassword = createAsyncThunk(
  "newPassword",
  async (data, ThunkApi) => {
    try {
      const response = await axios.post(`${BASEURL}auth/password/users/reset_password_confirm/`, {
        ...data,
      });
      return response.data;
    } catch (error) {
      
      return ThunkApi.rejectWithValue(error.response);
    }
  }
);

const initialState = {
  loading: false,
  checked: true,
  error: null,
  user: getLocalStoarge(),
  checkEmail: false,
  errMsg:""
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setChecked: (state, action) => {
      state.checked = !state.checked;
    },
    setUser: (state, action) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.user = [];
        state.errMsg = ""
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.access;
        toast.success(`Welcom Back`);
      })
      .addCase(postLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.errMsg = action.payload
      });

      // resetPaswword Using Email
      builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.checkEmail = true;
        toast.error("checkout your email");
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.email;
        toast.error(action.payload);
      });
      // post New Password
      builder
      .addCase(newPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(newPassword.fulfilled, (state, action) => {
        state.loading = false;
        
      })
      .addCase(newPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.email;
        toast.error(action.payload);
      });
  },
});

export const { setChecked, setUser } = userSlice.actions;

export default userSlice.reducer;
