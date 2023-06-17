import { Box, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useRef } from "react";
import CartProduct from "./cartProduct";
import { useDispatch, useSelector } from "react-redux";
import InfoCart from "./infoCart";
import { closeCartNav } from "../../store/global/globalSlice";
import { Link } from "react-router-dom";
const SideCart = () => {
  const { items, total_price, delivery_total } = useSelector(
    (state) => state.cart
  );
  const { cartNav } = useSelector((state) => state.global);
  const isMobile = useMediaQuery("(max-width:430px)");
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        position: "fixed",
        // top:"15px",
        top: "0px",
        width: isMobile ? "100%" : "430px",
        height: "100%",
        background: "#D9D9D9",
        right: "0",
        zIndex: "999",
        transform: "translateX(100%)",
        transition: "0.3s all ease-in-out",
        overflow: "auto",
      }}
      className={cartNav ? "side-cart from-right" : "side-cart"}
    >
      {/* <ProductItem /> */}
      <Box mt="50px" p="24px">
        <Box
          sx={{ display: "flex", justifyContent: "space-between", mb: "48px" }}
        >
          <Link to="/cart">
            <Typography
              sx={{
                fontSize: "24px",
                color: "rgba(33, 33, 33, 1)",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              My Cart
            </Typography>
          </Link>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(closeCartNav())}
          >
            close
          </span>
        </Box>
        <Box>
          {items?.map((item) => {
            return <CartProduct {...item} key={item.id} />;
          })}
          <InfoCart
            items={items}
            total_price={total_price}
            title="checkout"
            delivery_total={delivery_total}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SideCart;
