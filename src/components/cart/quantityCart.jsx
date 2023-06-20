import { Box, Typography } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantity } from "../../store/cart/cartSlice";
import { Span } from "../../shared/style";
import { updateGuestQuantity } from "../../store/guestCart/guestCartSlice";

const QuantityCart = ({ quantity, id }) => {
  const dispatch = useDispatch();
  const guestToken = useSelector((state) => state.guestCart.cartID);
  return (
    <>
      {!guestToken && (
        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
          <Span
            sx={{}}
            onClick={() =>
              dispatch(updateQuantity({ quantity: quantity - 1, id }))
            }
          >
            -
          </Span>
          <span style={{ marginInline: "16px", fontWeight: "500" }}>
            {quantity}
          </span>

          <Span
            onClick={() =>
              dispatch(updateQuantity({ quantity: quantity + 1, id }))
            }
          >
            +
          </Span>
        </Box>
      )}
      {guestToken && (
        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
          <Span
            sx={{}}
            onClick={() =>
              dispatch(updateGuestQuantity({ quantity: quantity - 1, id }))
            }
          >
            -
          </Span>
          <span style={{ marginInline: "16px", fontWeight: "500" }}>
            {quantity}
          </span>

          <Span
            onClick={() =>
              dispatch(updateGuestQuantity({ quantity: quantity + 1, id }))
            }
          >
            +
          </Span>
        </Box>
      )}
    </>
  );
};

export default QuantityCart;
