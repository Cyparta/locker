import React from "react";
import { Box, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import meatName from "../../assets/home/meatName.png";
import meatImg from "../../assets/home/meat.png";
import dollar from "../../assets/home/dollar.svg";

import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/foramtPrice";

import { useLocation } from "react-router-dom";
const ProductItem = ({
  product_name,
  description,
  id,
  image,
  unit_price: price,
  wholesale_description,
  w = "img-cover-shop",
}) => {
  const location = useLocation();
  const PATHNAME = location.pathname;
  // console.log( PATHNAME, PATHNAME.includes("/wholesale"))
  let pathNameCheck = PATHNAME.includes("/wholesale")
    ? `/wholesale/${id}`
    : PATHNAME.includes("/aqqeqa")
    ? `/aqqeqa/${id}`
    : PATHNAME.includes("/odhiah")
    ? `/odhiah/${id}`
    : `/retail/${id}`;

  const is_wholesale = PATHNAME.includes("/wholesale");
  return (
    <Link to={`${pathNameCheck}`}>
      <Box>
        <img
          src={image || meatImg}
          alt={product_name}
          width="100%"
          className={w}
        />
        <Box>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "600",
              display: "flex",
              mt: "16px",
              alignItems: "flex-start",
            }}
          >
            {/* <img
              src={meatName}
              alt="meat"
              style={{
                marginRight: "8px",
              }}
            /> */}
            <span>
              {product_name}
              
            </span>
          </Typography>
          {!is_wholesale && (
            <Typography
              sx={{
                color: "#909090",
                fontSize: "14px",
                fontWeight: "500",
                mt: "8px",
                mb: "8px",
                lineHeight: "21px",
              }}
            >
              {description?.length > 150
                ? `${description?.slice(0, 150)}...`
                : description}{" "}
            </Typography>
          )}
          {!is_wholesale && (
            <Typography
              sx={{
                color: "#909090",
                fontSize: "14px",
                fontWeight: "500",
                mt: "8px",
                mb: "8px",
                lineHeight: "21px",
              }}
            >
              {wholesale_description?.length > 150
                ? `${wholesale_description?.slice(0, 150)}...`
                : wholesale_description}{" "}
            </Typography>
          )}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex" }}>
              {PATHNAME !== "/wholesale" && (
                <>
                  
                  <Typography
                    sx={{
                      marginLeft: "8px",
                      fontWeight: "600",
                      color: "#212121",
                    }}
                    component="span"
                  >
                    <Typography
                      variant="span"
                      component="span"
                      // sx={{ color: "#CC8648" }}
                    >
                      {formatPrice(parseInt(price))} $
                    </Typography>
                  </Typography>
                  {/* <img src={dollar} alt="dollar" /> */}
                </>
              )}
            </Box>
            {/* <Box
              sx={{
                background:
                  "linear-gradient(114.83deg, #6E2E02 -19.62%, #CC8648 100%)",
                color: "#fff",
                width: "32px",
                height: "32px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
              }}
              id={id}
              onClick={(e) => {
                e.preventDefault();
                if (localStorage.getItem("token")) {
                  
                  dispatch(setCartNav())
                  dispatch(postCart({product_id:id, quantity: 1, cartID: cart?.items?.results[0]?.id}))
                  dispatch(getCart())
                } else {
                  navigate("/register")
                }
              }}
            >
              <img src={addtocart} alt="addtocart" />
            </Box> */}
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default ProductItem;
