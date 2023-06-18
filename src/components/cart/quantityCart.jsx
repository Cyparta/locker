import { Box, Typography } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { updateQuantity } from "../../store/cart/cartSlice";
import { Span } from "../../shared/style";

const QuantityCart = ({ quantity, id }) => {
  const dispatch = useDispatch();
  return (
    <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
      <Span
        sx={{  }}
        onClick={() => dispatch(updateQuantity({quantity:quantity - 1, id}))}
      >
        -
      </Span>
      <span style={{ marginInline: "16px", fontWeight: "500" }}>
        {quantity}
      </span>

      <Span onClick={() => dispatch(updateQuantity({quantity:quantity + 1, id}))}>+</Span>
    </Box>
  );
};

export default QuantityCart;
