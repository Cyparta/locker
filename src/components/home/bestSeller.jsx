import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import cardImageMeat from "../../assets/home/bestsell.png";
import SideCart from "../cart/sideCart";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { BASEURL } from "../../data/API";
import { setCartNav } from "../../store/global/globalSlice";
import { getCart, postCart } from "../../store/cart/cartSlice";
import { useNavigate } from "react-router";

const BestSeller = ({ token }) => {
  const [bestSeller, setBestSeller] = useState([]);
  const [open, setOpen] = useState(false);
  const { items, count } = useSelector((state) => state.productID);
  const { items: data } = useSelector((state) => state.products);
  const { occassion } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getBestSeller = () => {
    axios
      .get(`${BASEURL}api/best-sellers/`)
      .then((res) => setBestSeller(res.data));
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getBestSeller();
  }, []);

  const handleAddToCart = (e, product_id) => {
    console.log(product_id);
    if (!token) {
      dispatch(setCartNav());
      dispatch(
        postCart({
          product_id: product_id,
          quantity: count,
          is_wholesale: false,
          occassion,
        })
      ).then(() => {
        dispatch(getCart());
      });
    } else {
      // navigate("/register");
      handleClose();
    }
  };
 
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: "24px",
  };
  const titleStyle = {
    fontSize: "32px",
    lineHeight: "48px",
    fontWeight: 700,
    letterSpacing: "-1.5%",
  };
  const seeMoreStyle = {
    fontSize: "16px",
    lineHeight: "48px",
    fontWeight: 700,
    letterSpacing: "-1.5%",
    color: "#9B1D08",
  };
  const mainSellerStyle = {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: {
      xl: "row",
      lg: "row",
      md: "row",
      sm: "column",
      xs: "column",
    },
    flexWrap: { md: "wrap" },
    width: "100%",
    MaxHeight: "400px",
  };
  const cardSellStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    width: { xl: "24%", md: "48%", sm: "100%", xs: "100%" },
    mb: { xs: "16px" },
    MaxHeight: "400px",
  };
  const sellTitle = {
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: "21.33px",
    letterSpacing: "-0.24px",
    mb: "8px",
  };
  const sellDesc = {
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "18.96px",
    letterSpacing: "-0.41px",
    color: "#BDBDBD",
    mb: "8px",
  };
  const sellPrice = {
    fontSize: "12px",
    fontWeight: 600,
    lineHeight: "14.22px",
    letterSpacing: "-0.24 px",
    color: "#00011F",
    mb:"24px"
  };
  const addCartButton = {
    width: "90%",
    height: "50px",
    bgcolor: "#9B1D08",
    borderRadius: "14px",
    padding: "10px",
    textAlign: "center",
    color: "#fff",
    textTransform: "none",
    ":hover": { bgcolor: "#9B1D08" },
  };
  return (
    <Box sx={{ mt: "126px" }}>
      <Container>
        <Box sx={headerStyle}>
          <Typography sx={titleStyle}>Best seller</Typography>
          <Typography sx={seeMoreStyle}>See More</Typography>
        </Box>
        <Box sx={mainSellerStyle}>
          <Slider {...settings} style={{overflow: "hidden",height:"320px"}}>
            {bestSeller.map((product) => (
              <Box key={product.product_id}>
                <img
                  src={product.product__image}
                  alt={product.product__product_name}
                  width="100%"
                  height='152px'
                />
                <Typography sx={sellTitle}>
                  {product.product__product_name}
                </Typography>
                <Typography sx={sellDesc}>
                  {product.product__description.slice(0, 60)}
                </Typography>
                <Typography sx={sellPrice}>{product.total_sales}</Typography>
                <Button
                  sx={addCartButton}
                  onClick={(e, product) =>
                    handleAddToCart(product?.product_id)
                  }
                >
                  Add to cart
                </Button>
              </Box>
            ))}
            

          </Slider>
          {<SideCart />}
        </Box>
      </Container>
    </Box>
  );
};

export default BestSeller;
