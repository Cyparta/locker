import {
  Box,
  Button,
  Container,
  Grid,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import HeroTitle from "../../components/layout/heroTitle";
import {
  GrayButton,
  InputControl,
  InputField,
  MainButton,
} from "../../shared/style";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LinkIcon from '@mui/icons-material/Link';
import PhoneIcon from '@mui/icons-material/Phone';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import PageMeta from "../../components/layout/PageMeta";
import { setUser } from "../../store/user/userSlice";
import { useEffect } from "react";
import { ProfileCard } from "../../shared/style";

import { getOrderID } from "../../store/order/order";
import moment from "moment";
import QRCode from "react-qr-code";
import SideNav from "../../components/profile/sideNav";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import "../../shared/receipt.css";
const PrintableContent = React.forwardRef((props, ref) => {
  const { orders, order: orderID } = useSelector((state) => state.order);
  return (
    <div ref={ref}>
      <header class="header">
        <div>
          <p>Thank you for your order</p>
        </div>
      </header>
      <section class="container mt-40">
        <div class="flex justify-between">
          <div>
            <p class="gray-color mb-1 fw-600">Hi</p>
            <p class="gray-color mb-1 fw-600">
              Just to let you know that we have received your order {orderID.id}
              ,
              <br />
              and it’s now being processed
            </p>
            <p class="gray-color mb-1 fw-600">
              Expected you to receive this package by 7 April, 2023{" "}
              {moment(orderID.placed_at).format("D MMMM, YYYY")}
            </p>
          </div>
          <div style={{ alignSelf: "end" }}>
            <QRCode
              size={75}
              style={{
                height: "auto",
                maxWidth: "100%",
                width: "100%",
              }}
              value={orderID?.qr_code || "894117e2-1326-44ba-b87e-8fe111a05df1"}
              viewBox={`0 0 256 256`}
            />
            {/* <img src="./parcode.png" /> */}
          </div>
        </div>
      </section>

      <section class="container">
        <h1 class="heading-1 mb-1 mt-40">
          Order #{orderID.id}{" "}
          <sub class="gray-color">
            {moment(orderID.placed_at).format("D MMMM, YYYY")}
          </sub>
        </h1>
        <table>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
          {orderID?.items?.map((item) => {
            return (
              <tr>
                <td>{item.product.product_name} ss</td>
                <td>{item.quantity}</td>
                <td>{item.product.unit_price} $</td>
              </tr>
            );
          })}
          <tr>
            <td>Sub total</td>
            <td colspan="2">{orderID.total_price}</td>
          </tr>
          <tr>
            <td>Shipping</td>
            <td colspan="2">{orderID.delivery_price}</td>
          </tr>
          <tr>
            <td>Payment Method</td>
            <td colspan="2">{orderID.order_info}</td>
          </tr>
          <tr>
            <td>total</td>
            <td colspan="2">{orderID.total_price + orderID.delivery_price} $</td>
          </tr>
        </table>
      </section>

      <section class="container mb-1">
        <h1 class="heading-1 mb-1 mt-40">Shipping address</h1>
        <div class="card">
          <div class="mb-1">
            <div class="flex gray-color">
              <p class="fw-500">Order date</p>
              <p class="fw-600">{moment(orderID.placed_at).format("M/D/YYYY")}</p>
            </div>
          </div>
          <div class="mb-1">
            <div class="flex gray-color">
              <p class="fw-500">Order address</p>
              <p class="fw-600">{orderID.shipping_address ? orderID.shipping_address : "Not Found" }</p>
            </div>
          </div>
          <div class="mb-1">
            <div class="flex gray-color">
              <p class="fw-500">Mobile number</p>
              <p class="fw-600">{orderID.phone_number ? orderID.phone_number : "Not Found" }</p>
            </div>
          </div>
        </div>
      </section>

      <section class="container">
        <p class="gray-color mb-1 fw-600">
          <LinkIcon />
          thank you for choosing
          <a
            href="https://floridahalalmeat.com/"
            // style="color: rgba(155, 29, 8, 1); font-weight: 600"
          >
            us !
          </a>
        </p>
        <p class="gray-color mb-1 fw-400">
          <PhoneIcon />
          Contact us on
          <a
            href="tel:+1815-428-7376"
            //     style="
            //   color: rgba(18, 18, 18, 1);
            //   font-weight: 600;
            //   text-decoration: none;
            // "
          >
            +1 815-428-7376
          </a>
        </p>
        <p class="gray-color mb-1 fw-400">
          {/* <img src="./location.png" /> */}
          <EditLocationIcon />
          vist us at
          <a
            href="tel:+1815-428-7376"
            //     style="
            //   color: rgba(18, 18, 18, 1);
            //   font-weight: 600;
            //   text-decoration: none;
            // "
          >
            105 South East Avenue, Papineau
          </a>
        </p>
      </section>
    </div>
  );
});

const OrderDetails = () => {
  const params = useParams();
  // Account Info
  const [activeCard, setActiveCard] = useState(1);
  const { orders, order: orderID } = useSelector((state) => state.order);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const componentRef = useRef();

  const crumbs = [
    { label: "Home", link: "/", active: false },
    { label: "profile", link: "/profile", active: true },
  ];

  useEffect(() => {
    dispatch(getOrderID(params.id));
  }, [params.id]);

  return (
    <>
      <PageMeta title={`Grays and Danny's `} desc="user profile" />
      <Box>
        {/* hero Title */}

        {/* hero Title */}
        <Box mt="32px" sx={{ ml: { xs: "20px", sm: "80px" } }}>
          <HeroTitle crumbs={crumbs} />
        </Box>
        {/* -----
                Grid container
            -----
        */}
        <Grid
          container
          spacing={4}
          mb="48px"
          sx={{ mt: { xs: "1px", sm: "40px" } }}
        >
          {/* col 1 */}
          <Grid item xs={12} sm={4} md={3}>
            <SideNav />
          </Grid>
          {/* col 2 */}
          <Grid item xs={12} sm={8} md={9} >
            <Box>
              <>
                <ProfileCard
                  sx={{ mb: "24px", width: "90%", mx: { xs: "auto", sm: 0 }}}
                >
                  <Typography
                    sx={{
                      color: "#212121",
                      fontWeight: "600",
                      fontSize: "20px",
                      mb: "24px",
                    }}
                  >
                    View Order details
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <Box sx={{flex: 1}}>
                      <Box sx={{ display: "flex", gap: "10px" }}>
                        <Typography
                          sx={{
                            color: "rgba(127, 127, 127, 1)",
                            fontSize: "15px",
                            fontWeight: "500",
                            mb: "11px",
                            flex: "100px",
                            maxWidth: "100px",
                          }}
                        >
                          Order date
                        </Typography>
                        <Typography
                          sx={{
                            color: "rgba(127, 127, 127, 1)",
                            fontSize: "15px",
                            fontWeight: "500",
                            mb: "11px",
                          }}
                        >
                          {moment(orderID.placed_at).format("M/D/YYYY")}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", gap: "10px" }}>
                        <Typography
                          sx={{
                            color: "rgba(127, 127, 127, 1)",
                            fontSize: "15px",
                            fontWeight: "500",
                            mb: "11px",
                            flex: "100px",
                            maxWidth: "100px",
                          }}
                        >
                          Order #
                        </Typography>
                        <Typography
                          sx={{
                            color: "rgba(127, 127, 127, 1)",
                            fontSize: "15px",
                            fontWeight: "500",
                            mb: "11px",
                          }}
                        >
                          {orderID.id}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", gap: "10px" }}>
                        <Typography
                          sx={{
                            color: "rgba(127, 127, 127, 1)",
                            fontSize: "15px",
                            fontWeight: "500",
                            mb: "11px",
                            flex: "100px",
                            maxWidth: "100px",
                          }}
                        >
                          Order Total
                        </Typography>
                        <Typography
                          sx={{
                            color: "rgba(127, 127, 127, 1)",
                            fontSize: "15px",
                            fontWeight: "500",
                            mb: "11px",
                          }}
                        >
                          {orderID.total_price} $ ( item)
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ alignSelf: "flex-end" }}>
                      <QRCode
                        size={75}
                        style={{
                          height: "auto",
                          maxWidth: "100%",
                          width: "100%",
                        }}
                        value={
                          orderID?.qr_code ||
                          "894117e2-1326-44ba-b87e-8fe111a05df1"
                        }
                        viewBox={`0 0 256 256`}
                      />
                    </Box>
                  </Box>

                  <ReactToPrint
                    trigger={() => (
                      <button
                        style={{
                          border: "none",
                          color: "rgba(155, 29, 8, 1)",
                          background: "transparent",
                          fontWeight: "600",
                          fontSize: "16px",
                          marginTop: "20px",
                          cursor: "pointer",
                        }}
                      >
                        download invoice
                      </button>
                    )}
                    content={() => componentRef.current}
                  />
                  <Box sx={{ display:"none"}}>
                    <PrintableContent ref={componentRef} />
                  </Box>
                </ProfileCard>
                <ProfileCard
                  sx={{ mb: "24px", width: "90%", mx: { xs: "auto", sm: 0 }}}
                >
                  <Typography
                    sx={{
                      color: "#212121",
                      fontWeight: "600",
                      fontSize: "20px",
                      mb: "24px",
                    }}
                  >
                    Shipment details
                  </Typography>
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <Typography
                      sx={{
                        color: "rgba(127, 127, 127, 1)",
                        fontSize: "15px",
                        fontWeight: "500",
                        mb: "11px",
                        flex: "100px",
                        maxWidth: "100px",
                      }}
                    >
                      Shipment method
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(127, 127, 127, 1)",
                        fontSize: "15px",
                        fontWeight: "500",
                        mb: "11px",
                      }}
                    >
                      {orderID.order_info}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <Typography
                      sx={{
                        color: "rgba(127, 127, 127, 1)",
                        fontSize: "15px",
                        fontWeight: "500",
                        mb: "11px",
                        flex: "100px",
                        maxWidth: "100px",
                      }}
                    >
                      Out of order
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(127, 127, 127, 1)",
                        fontSize: "15px",
                        fontWeight: "500",
                        mb: "11px",
                      }}
                    >
                      ( 1 item )
                    </Typography>
                  </Box>
                  {orderID?.items?.map((item) => {
                    return (
                      <Box sx={{ display: "flex", gap: "10px" }}>
                        <img
                          src={item?.product?.image}
                          alt="test"
                          style={{ width: "80px", height: "80px" }}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "16px",
                              fontWeight: "500",
                              color: "rgba(18, 18, 18, 1)",
                            }}
                          >
                            {item.product.product_name}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "12px",
                              color: "rgba(127, 127, 127, 1)",
                              my: "4px",
                            }}
                          >
                            Qty : {item?.quantity}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "rgba(18, 18, 18, 1)",
                            }}
                          >
                            {item?.product?.unit_price} $
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </ProfileCard>
                <ProfileCard
                  sx={{ mb: "24px", width: "90%", mx: { xs: "auto", sm: 0 } }}
                >
                  <Typography
                    sx={{
                      color: "#212121",
                      fontWeight: "600",
                      fontSize: "20px",
                      mb: "24px",
                    }}
                  >
                    Payment details
                  </Typography>
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <Typography
                      sx={{
                        color: "rgba(127, 127, 127, 1)",
                        fontSize: "15px",
                        fontWeight: "500",
                        mb: "11px",
                        flex: "100px",
                      }}
                    >
                      Payment method
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(127, 127, 127, 1)",
                        fontSize: "15px",
                        fontWeight: "500",
                        mb: "11px",
                      }}
                    >
                      {orderID.payment_status === "P" ? "pending" :  orderID.payment_status === "C" ? "completed" : "failing"}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <Typography
                      sx={{
                        color: "rgba(127, 127, 127, 1)",
                        fontSize: "15px",
                        fontWeight: "500",
                        mb: "11px",
                        flex: "100px",
                      }}
                    >
                      shipping address
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(127, 127, 127, 1)",
                        fontSize: "15px",
                        fontWeight: "500",
                        mb: "11px",
                      }}
                    >
                      {orderID.shipping_address}
                    </Typography>
                  </Box>
                </ProfileCard>
                <ProfileCard
                  sx={{ mb: "24px", width: "90%", mx: { xs: "auto", sm: 0 }}}
                >
                  <Typography
                    sx={{
                      color: "#212121",
                      fontWeight: "600",
                      fontSize: "20px",
                      mb: "24px",
                    }}
                  >
                    Order Summary
                  </Typography>
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <Typography
                      sx={{
                        color: "rgba(127, 127, 127, 1)",
                        fontSize: "15px",
                        fontWeight: "500",
                        mb: "11px",
                        flex: "100px",
                      }}
                    >
                      sub total
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(127, 127, 127, 1)",
                        fontSize: "15px",
                        fontWeight: "500",
                        mb: "11px",
                      }}
                    >
                      {orderID.total_price} $
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <Typography
                      sx={{
                        color: "rgba(127, 127, 127, 1)",
                        fontSize: "15px",
                        fontWeight: "500",
                        mb: "11px",
                        flex: "100px",
                      }}
                    >
                      Delivery fees
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(127, 127, 127, 1)",
                        fontSize: "15px",
                        fontWeight: "500",
                        mb: "11px",
                      }}
                    >
                      {orderID.delivery_price} $
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <Typography
                      sx={{
                        color: "rgba(127, 127, 127, 1)",
                        fontSize: "15px",
                        fontWeight: "500",
                        mb: "11px",
                        flex: "100px",
                      }}
                    >
                      Total
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(127, 127, 127, 1)",
                        fontSize: "15px",
                        fontWeight: "500",
                        mb: "11px",
                      }}
                    >
                      {orderID.total_price + orderID.delivery_price} $
                    </Typography>
                  </Box>
                </ProfileCard>
              </>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default OrderDetails;
