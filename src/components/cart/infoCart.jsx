import { Box, Typography, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/foramtPrice";
import { MainButton } from "../../shared/style";
import { useSelector } from "react-redux";
const InfoCart = ({
  items,
  title,
  total_price,
  delivery_total,
  handlePayment,
}) => {
  const { is_wholesale } = useSelector((state) => state.cart);

  console.log(total_price, delivery_total)

  return (
    <Box>
      {!is_wholesale && (
        <>
          <Box
            sx={{
              background: "#C9C9C9",
              width: "100%",
              height: "1px",
              my: "24px",
            }}
          ></Box>
          {/* sub total */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: "11px",
            }}
          >
            <Typography sx={{ color: "#212121", fontWeight: "500" }}>
              Total Deposite
            </Typography>
            <Typography sx={{ color: "#212121", fontWeight: "400" }}>
              {formatPrice(total_price)} $
            </Typography>
          </Box>
          {/* delevry */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ color: "#212121", fontWeight: "500" }}>
              Delivery
            </Typography>
            <Typography sx={{ color: "#212121", fontWeight: "400" }}>
              {formatPrice(delivery_total)} $
            </Typography>
          </Box>
          {/* line */}
          <Box
            sx={{
              background: "#C9C9C9",
              width: "100%",
              height: "1px",
              my: "24px",
            }}
          ></Box>
          {/* total Amount */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ color: "#212121", fontWeight: "500" }}>
              Total Amount
            </Typography>
            <Typography sx={{ color: "#212121", fontWeight: "400" }}>
              {formatPrice(total_price + delivery_total)} $
            </Typography>
          </Box>
        </>
      )}

      {/* Button */}
      <Link to="/cart">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: "50px",
            mb: "40px",
          }}
        >
          <MainButton
            sx={{
              width: "100% !important",
              mb: "20px",
            }}
            variant="contained"
            onClick={handlePayment}
          >
            {title}
          </MainButton>
        </Box>
      </Link>
    </Box>
  );
};

export default InfoCart;
