import {
  Container,
  Box,
  Stack,
  Typography,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import HeroTitle from "../../components/layout/heroTitle";

import productImg from "../../assets/productID/productID.png";
import meatLogo from "../../assets/home/meatName.png";
import trusted from "../../assets/icons/trusted.png";
import secure from "../../assets/icons/secure.png";
import dollar from "../../assets/home/dollar.png";
import time from "../../assets/home/time.png";
import styled from "@emotion/styled";
import ProductItem from "../../components/common/productItem";
import Slider from "react-slick";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductID, setCount } from "../../store/productID/productIDSlice";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/products/productsSlice";
import {
  getCart,
  postCart,
  setValues,
  setWholesale,
} from "../../store/cart/cartSlice";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { setCartNav } from "../../store/global/globalSlice";
import SideCart from "../../components/cart/sideCart";
import PageMeta from "../../components/layout/PageMeta";
import ProductDetails from "../../components/productDetails/productDetails";
import DialogCart from "../../components/productDetails/dialogCart";
import ZebehaHalal from "../zebehaHala/zebehaHalal";
import { Span } from "../../shared/style";

import {
  getGuestCart,
  postCartGuest,
  postItemToCart,
} from "../../store/guestCart/guestCartSlice";

const shippingInfo = [
  {
    image: trusted,
    text: "Free shipping when you spend EGP 200 and above on express items",
    heading: "TRUSTED SHIPPING",
  },
  {
    image: secure,
    text: "Your data is always protected",
    heading: "SECURE SHOPPING",
  },
];
const Product = () => {
  // const [count, setCount] = useState(1);

  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isWholesale = location.pathname.includes("/wholesale");
  const isRetail = location.pathname.includes("/retail");
  const isOdhiah = location.pathname.includes("/odhiah");
  const isAqqeqa = location.pathname.includes("/aqqeqa");

  console.log(isWholesale);

  const { items, count } = useSelector((state) => state.productID);
  const { items: data } = useSelector((state) => state.products);

  // const token = localStorage.getItem("token");
  const token = useSelector((state) => state.user.user);
  const tokenGuest = useSelector(state => state.guestCart.cartID);

  // open dialog if shipping is greater than 10
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("Normal");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getProductID(param.id));
    dispatch(getProducts());
  }, [param.id, isWholesale]);

  const crumbs = [
    { label: "Home", link: "/", active: false },
    { label: "Search result", link: "/shop", active: false },
    { label: items.product_name, link: `/${items.id}`, active: true },
  ];

  // const handleAddToCart = (is_wholesale, occ) => {
  //   if (localStorage.getItem("token")) {
  //     dispatch(setCartNav());
  //     dispatch(
  //       postCart({
  //         product_id: items.id,
  //         quantity: count,
  //         is_wholesale: is_wholesale,
  //         occassion: occ,
  //       })
  //     ).then(() => {
  //       dispatch(getCart());
  //     });
  //   } else {
  //     navigate("/register");
  //   }
  // };
  const { occassion } = useSelector((state) => state.cart);
  const handleAddToCart = () => {
    if (token) {
      dispatch(setCartNav());
      dispatch(
        postCart({
          product_id: items.id,
          quantity: count,
          is_wholesale: false,
          occassion,
        })
      ).then(() => {
        dispatch(getCart());
      });
      handleClose();
    } else {
      // navigate("/register");
      if (tokenGuest) {
        dispatch(setCartNav());
        dispatch(
          postItemToCart({
            product_id: items.id,
            quantity: count,
            is_wholesale: false,
            occassion,
            cartID: tokenGuest,
          })
        ).then(() => {
          dispatch(getGuestCart());
        });
        handleClose();
      } else {
        dispatch(postCartGuest()).then((data) => {
          dispatch(
            postItemToCart({
              product_id: items.id,
              quantity: count,
              is_wholesale: false,
              occassion,
              cartID: data.payload.id,
            })
          );
        });
        handleClose();
      }
    }
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
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
  return (
    <>
      <PageMeta
        title={`${items.product_name} - Papineau Locker`}
        desc={`Shop ${items.product_name} product meat at Papineau Locker. We offer high-quality beef, pork, chicken, and more, sourced from local farms and raised with care. Our meats are expertly prepared and delivered fresh to your door, so you can enjoy the best-tasting and healthiest meats available. With fast and reliable shipping, easy returns, and exceptional customer service, Papineau Locker is your one-stop online destination for all your meat needs.`}
      />
      <Box mt="17px">
        <Container maxWidth="xl">
          {/*---- hero title ----*/}
          <Box mb="8px">
            <HeroTitle crumbs={crumbs} />
          </Box>
          {/*---- Grid Row ----*/}
          <Grid container spacing={4}>
            <Grid item xs={12} md={4} xl={5}>
              <Box>
                <img
                  src={items.image}
                  alt={items.product_name}
                  width="100%"
                  height="420px"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}  xl={6} sx={{pl:"24px"}}>
              {/*  product Item */}
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  sx={{
                    fontSize: "24px",
                    fontWeight: "600",
                    lineHeight:"29.26px",
                    display: "flex",
                    mt: "17px",
                  }}
                >
                  {items.product_name}
                </Typography>

                {!isWholesale && (
                  <Typography
                    sx={{
                      color: "#212121",
                      fontSize: { xs: "16px", md: "20px" ,xl:"20px"},
                      fontWeight: "500",
                      mt: "13px",
                      mb: "8px",
                      lineHeight: "30px",
                    }}
                  >
                    {items?.wholesale_description}{" "}
                  </Typography>
                )}

                {isWholesale && (
                  <Typography
                    sx={{
                      color: "#212121",
                      fontSize: { xs: "16px", md: "20px" },
                      fontWeight: "500",
                      mt: "13px",
                      mb: "8px",
                      lineHeight: "30px",
                    }}
                  >
                    {items?.wholesale_description}{" "}
                  </Typography>
                )}

                {/* if we aren't in page wholesale don't show price */}
                {!isWholesale && (
                  <>
                    {/* <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: "22px",
                      }}
                    >
                      <img src={dollar} alt="dollar" />
                      <Typography
                        sx={{
                          marginLeft: "8px",
                          fontWeight: "600",
                          color: "#212121",
                        }}
                        component="span"
                      >
                        Price :{" "}
                        <Typography
                          variant="span"
                          component="span"
                          sx={{ color: "#9B1D08" }}
                        >
                          {items.price}
                          {items.unit_price} {"-"}
                          {items.max_price}
                        </Typography>
                      </Typography>
                    </Typography> */}
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: "8px",
                      }}
                    >
                      <img
                        src={dollar}
                        alt="dollar"
                        width="20px"
                        height="20px"
                      />
                      <Typography
                        sx={{
                          marginLeft: "8px",
                          fontWeight: "600",
                          color: "#212121",
                        }}
                        component="span"
                      >
                        Price :{" "}
                        <Typography
                          variant="span"
                          component="span"
                          sx={{ color: "#9B1D08" }}
                        >
                          {items.deposite} $
                        </Typography>
                      </Typography>
                    </Typography>
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: "8px",
                        mb:"16px"
                      }}
                    >
                      <img src={time} alt="dollar" width="20px" height="20px" />
                      <Typography
                        sx={{
                          marginLeft: "8px",
                          fontWeight: "600",
                          color: "#212121",
                        }}
                        component="span"
                      >
                        Delivery Time :{" "}
                        <Typography
                          variant="span"
                          component="span"
                          sx={{ color: "#9B1D08" }}
                        >
                          {items.delivery_time}Min
                        </Typography>
                      </Typography>
                    </Typography>
                  </>
                )}

                {/* if not user show message to login */}
                {!token && (
                  <Typography
                    sx={{
                      color: "#909090",
                      fontWeight: "500",
                      fontSize: "14px",
                      mt: "10px",
                      display: "none",
                    }}
                  >
                    ONCE RECEIVED WE WILL GIVE YOU A PERSONAL CALL TO LEARN MORE
                    AND FINALIZE YOUR ORDER
                  </Typography>
                )}

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: "row",

                    flexWrap: "wrap",
                    mt: "16px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #9D9D9D",
                      borderRadius: "12px",
                      maxHeight: "48px",
                      width: "80px",
                      mt: "20px",
                    }}
                  >
                    <span style={{ marginInline: "16px", fontWeight: "500" }}>
                      {count}
                    </span>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        maxHeight: "48px",
                      }}
                    >
                      <ArrowDropUpIcon
                        style={{ fontSize: "1.5rem", color: "#9B1D08" }}
                        onClick={() => dispatch(setCount({ type: "inc" }))}
                      />
                      <ArrowDropDownIcon
                        style={{ fontSize: "1.5rem", color: "#9B1D08" }}
                        onClick={() => dispatch(setCount({ type: "dec" }))}
                      />
                    </Box>
                  </Box>

                  <Button
                    sx={{
                      background: "#9B1D08",
                      color: "#fff",
                      width: "60%",
                      borderRadius: "10px",
                      padding: "10px 0",
                      textTransform: "capitalize",
                      fontSize: "16px",
                      fontWeight: "400",
                      letterSpacing: "-0.24px",
                      mt: "20px",
                      ":hover": {
                        background: "#9B1D08",
                      },
                    }}
                    onClick={() => {
                      // if (isWholesale) {
                      //   if (localStorage.getItem("token")) {
                      //     dispatch(setCartNav());
                      //     dispatch(
                      //       postCart({ product_id: items.id, quantity: count, is_wholesale: false })
                      //     ).then(() => {
                      //       dispatch(getCart());
                      //     });
                      //   } else {
                      //     navigate("/register");
                      //   }

                      // } else {
                      //   handleClickOpen();
                      // }

                      // if (isWholesale) {
                      //   // handleAddToCart(true, 'Normal')
                      //   handleClickOpen();
                      // } else if (isRetail) {
                      //   // handleAddToCart(false, 'Normal')
                      //   handleClickOpen();
                      // } else if (isAqqeqa) {
                      //   // handleAddToCart(false, 'Aqiqqa')
                      //   //   handleClickOpen();
                      //   // console.log("")
                      //   handleClickOpen();
                      // } else {
                      //   // handleAddToCart(false, 'Odhiah')
                      //   handleClickOpen();
                      // }
                      handleAddToCart();
                    }}
                  >
                    add to cart
                  </Button>
                </Box>
              </Box>
            </Grid>

            {/* <Grid item xs={12} md={4} className="line">
              {shippingInfo.map((info) => {
                return (
                  <Box mb="25px">
                    <Stack direction="row" spacing={2}>
                      <Box>
                        <img src={info.image} alt="trusted" />
                      </Box>
                      <Box
                        sx={{
                          color: "#7E859B",
                          fontWeight: "400",
                          fontSize: "14px",
                        }}
                      >
                        <h3
                          style={{
                            color: "#404553",
                            fontWeight: "500",
                            marginTop: "0",
                            marginBottom: "5px",
                          }}
                        >
                          {info.heading}
                        </h3>
                        {info.text}
                      </Box>
                    </Stack>
                  </Box>
                );
              })}
            </Grid> */}
          </Grid>

          {/* Product details */}
          <ProductDetails items={items} />

          <Box sx={{height:"401px"}}>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "600",
                mb: "16px",
                color: "#212121",
                mt: "30px",
              }}
            >
              Related
            </Typography>
            <Box >
              <Slider {...settings} style={{overFlow:"hidden"}}>
                {data?.results?.map((item, index) => (
                  <Box key={index} sx={{height:"329px",overflow:"hidden"}}>
                    <ProductItem {...item} />
                  </Box>
                ))}
              </Slider>
            </Box>
          </Box>

          {<SideCart />}
          {/* <Box mb="50px"></Box> */}
        </Container>
      </Box>

      <DialogCart open={open} handleClose={handleClose} type={type} />
    </>
  );
};

export default Product;
