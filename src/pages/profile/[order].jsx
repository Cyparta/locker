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

const OrderDetails = () => {
  const params = useParams();
  // Account Info
  const [activeCard, setActiveCard] = useState(1);
  const { orders, order: orderID } = useSelector((state) => state.order);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
        <Grid container spacing={4} mb="48px" mt="40px">
          {/* col 1 */}
          <Grid item xs={12} sm={3}>
            <SideNav />
          </Grid>
          {/* col 2 */}
          <Grid item xs={12} sm={9}>
            <Box>
              <>
                <ProfileCard
                  sx={{ mb: "24px", width: "88%", mx: { xs: "auto", sm: 0 } }}
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
                    <Box>
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
                </ProfileCard>
                <ProfileCard
                  sx={{ mb: "24px", width: "88%", mx: { xs: "auto", sm: 0 } }}
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
                  sx={{ mb: "24px", width: "88%", mx: { xs: "auto", sm: 0 } }}
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
                      {orderID.payment_status}
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
                  sx={{ mb: "24px", width: "88%", mx: { xs: "auto", sm: 0 } }}
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
