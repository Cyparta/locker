import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import { useDispatch, useSelector } from "react-redux";
import { getMeat, setRange } from "../../store/shop/shopSlice";
import { Button, Input, InputBase, TextField, Typography } from "@mui/material";
import { Span } from "../../shared/style";
import { useState } from "react";

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider() {
  const [startRange,setStartRange]=useState(0)
  const [endRange,setEndRange]=useState(0)
  const dispatch = useDispatch();
  const rangValue = useSelector((state) => state.shop.rangeValue);
  const priceStyle = {
    "& .MuiOutlinedInput-root": {
      width: "49px",
      height: "40px",
      border: "1px solid #9D9D9D",
      borderRadius: "12px",
    },
  };
  const handlePrice=(startRange,endRange)=>{
    console.log(startRange,endRange)
    dispatch(setRange([startRange,endRange]));
          dispatch(getMeat());
  }
 

 

  return (
    <Box sx={{ mb: "10px" }}>
      
      <Box
        sx={{ display: "flex", flexDirection: "row", justifyContent: "start" ,flexWrap:{md:"wrap",xs:"wrap",gap:3}}}
      >
        <TextField
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          sx={priceStyle}
          value={startRange}
          onChange={(e)=>{setStartRange(e.target.value)}}
        />
        <Typography
          sx={{ px: "8px", py: "10px", textAlign: "center", fontSize: "12px" }}
        >
          To
        </Typography>
        <TextField
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          sx={priceStyle}
          value={endRange}
          onChange={(e)=>{setEndRange(e.target.value)}}
        />
        <Button
          sx={{ border: "none", color: "#9B1D08", textDecoration: "underline" }}
          onClick={()=>handlePrice(startRange,endRange)}
        >
          Go
        </Button>
      </Box>
      {/* <Slider
        getAriaLabel={() => "price range"}
        value={rangValue}
        onChange={(e, newValue) => {
          dispatch(setRange(newValue));
          dispatch(getMeat());
        }}
        max={100000}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        color="test3"
      /> */}
    </Box>
  );
}
