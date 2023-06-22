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
          <PageMeta title="Papineau Locker - Cart" desc="Checkout your items in your Cart on Papineau Locker website"/>
        </Helmet>
      <Box>
        <Container>
          <Box mt="25px">
            <HeroTitle crumbs={crumbs} />
          </Box>
          {/* spacing={{ xs: 2, md: 8 }} */}
          <Grid container>
            <Grid item xs={12} md={8}>
              {/* Shipping information */}
              <Shipping />
            </Grid>
            <Grid item xs={12} md={4} sx={{pl:{xs:"16px", md:"64px"}}}>
              <UserCart btn={"Continue to Pay"}/>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Cart;
