import React, { useEffect } from "react";
import { Box, Container, Grid } from "@mui/material";
import HeroTitle from "../../components/layout/heroTitle";
import { useDispatch, useSelector } from "react-redux";
import UserCart from "../../components/cart/userCart";
import Shipping from "../../components/shipping/shipping";
import { Helmet } from "react-helmet";
import PageMeta from "../../components/layout/PageMeta";
import { getShipping } from "../../store/shipping/shippingSlice";
const Cart = () => {
  const dispatch = useDispatch();
  const saved = useSelector(state => state.shipping.saved)
  useEffect(() => {
      dispatch(getShipping())
  }, []);
  const crumbs = [
    { label: "Home", link: "/", active: false },
    { label: 'cart', link: '/cart', active: true },
  ]; 
  return (
    <>
        <Helmet>
          <PageMeta title="Grays and Danny's - Cart" desc="Checkout your items in your Cart on Grays and Danny's website"/>
        </Helmet>
      <Box>
        <Container>
          <Box mt="25px">
            <HeroTitle crumbs={crumbs} />
          </Box>
          <Grid container spacing={{ xs: 2, md: 8 }}>
            <Grid item xs={12} md={8}>
              {/* Shipping information */}
              <Shipping />
            </Grid>
            <Grid item xs={12} md={4}>
              <UserCart btn={"Continue to Pay"}/>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Cart;
