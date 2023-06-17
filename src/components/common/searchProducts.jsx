import React, { useEffect, useState } from "react";
import {
  TextField,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

import { getMeat, setValues } from "../../store/shop/shopSlice";

import { useDispatch, useSelector } from "react-redux";

const SearchProducts = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(state => state.shop.data.search)

  return (
    <TextField
      fullWidth
      placeholder={"Search"}
      variant="outlined"
      label=""
      id="outlined-search"
      value={searchQuery}
      onChange={(e) => {
        dispatch(setValues({ name: "search", value: e.target.value }));
        dispatch(getMeat());
      }}
      sx={{
        marginBottom: "18px",
        "& .css-1o9s3wi-MuiInputBase-input-MuiOutlinedInput-input": {
          padding: "10px 60px 10px 15px",
        },
        "& fieldset": {
          borderRadius: "4px",
          boxShadow:
            "-2.5px -2.5px 4px rgba(18, 18, 18, 0.08), 2.5px 2.5px 4px rgba(18, 18, 18, 0.08)",
          border: "none",
        },
        "& fieldset::focus": {
          color: "#ED1B24",
        },
        input: {
          width: "80%",
          "&::placeholder": {
            fontWeight: "400",
          },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchProducts;
