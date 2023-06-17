import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { toast } from "react-toastify";
import { BASEURL } from "../../data/API";
export const postRegister = createAsyncThunk(
  "postRegister",
  async (data, ThunkApi) => {
    try {
      const response = await axios.post(
        `${BASEURL}auth/users/`,
        {
          ...data,
          phone:`+1${data.phone}`,
          first_name: "user",
          last_name: "user",
        }
      );
      return response.data;
    } catch (error) {
      return ThunkApi.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  user: [],
  errorMsg: []
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.user = [];
        state.errorMsg = []
      })
      .addCase(postRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.user = [action.payload];
        toast.success(`Thanks for Sign up,  Please log in`);
      })
      .addCase(postRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.errorMsg = action.payload
      });
  },
});

export default registerSlice.reducer;
