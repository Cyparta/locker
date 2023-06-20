import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../../data/API";

export const getMeat = createAsyncThunk("getMeat", async (data, ThunkApi) => {
  const {  cate, search, limit, page, ordering } =
    ThunkApi.getState().shop.data;
  const rangeValue = ThunkApi.getState().shop.rangeValue;
  console.log(rangeValue)
  try {
    const response = await axios.get(
      `${BASEURL}products/?collection_id=${cate}&search=${search}&limit=${limit}&offset=${
        (page - 1) * limit
      }&unit_price__gt=${rangeValue[0]}&unit_price__lt=${rangeValue[1]}&ordering=${ordering}`
    );
    return response.data;
  } catch (error) {
    
    return ThunkApi.rejectWithValue(error.response.data.msg);
  }
});

export const getCollection = createAsyncThunk(
  "getCollection",
  async (others, ThunkApi) => {
    try {
      const response = await axios.get(BASEURL + `collections/?others=${others}`);
      
      return response.data;
      
    } catch (error) {
      
      return ThunkApi.rejectWithValue(error.response.data.msg);
    }
    
  }
  
);


const initialState = {
  loading: false,
  error: null,
  errorCollection: null,
  allProducts: [],
  collection: [],
  others:false,
  data: {
    type: true,
    cate: 1,
    search: "",
    page: "1",
    limit: "16",
    ordering: "unit_price",
  },
  rangeValue: [8, 100000],
  filteredProducts: [],
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setValues: (state, { payload }) => {
      let { name, value } = payload;
      state.data[name] = value;
    },
    setRange: (state, action) => {
      console.log(action.payload);
      state.rangeValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    // GET ALL PRODUCTS
    builder.addCase(getMeat.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.allProducts = [];
    });
    builder.addCase(getMeat.fulfilled, (state, action) => {
      state.loading = false;
      state.allProducts = action.payload;
      // toast.success(`Welcom Back`);
    });
    builder.addCase(getMeat.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      // toast.error(action.payload);
    });
    // GET ALL COLLECTIONS
    builder.addCase(getCollection.pending, (state,action) => {
      state.loading = true;
      state.errorCollection = null;
      state.collection = [];
      state.others=action.payload
    });
    builder.addCase(getCollection.fulfilled, (state, action) => {
      state.loading = false;
      state.collection = action.payload;
    });
    builder.addCase(getCollection.rejected, (state, action) => {
      state.loading = false;
      state.errorCollection = action.error.message;
    });
  },
});

export const { setValues, setRange } = shopSlice.actions;

export default shopSlice.reducer;
