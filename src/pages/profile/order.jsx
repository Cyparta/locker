import { Box, Container, Grid, Typography } from "@mui/material";
import HeroTitle from "../../components/layout/heroTitle";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PageMeta from "../../components/layout/PageMeta";
import { setUser } from "../../store/user/userSlice";
import { useEffect } from "react";
import { ProfileCard } from "../../shared/style";

import { getOrder } from "../../store/order/order";
import moment from "moment";
import { Link } from "react-router-dom";
import SideNav from "../../components/profile/sideNav";

const Order = () => {
  // Account Info
  const [activeCard, setActiveCard] = useState(1);
  const { orders } = useSelector((state) => state.order);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const crumbs = [
    { label: "Home", link: "/", active: false },
    { label: "profile", link: "/profile", active: false },
    { label: "order", link: "/profile/order", active: true },
  ];

  useEffect(() => {
    dispatch(getOrder());
  }, []);

  return (
    <>
      <PageMeta title={`Grays and Danny's `} desc="user profile" />
      <Box>
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
          spacing={5}
          mb="48px"
          sx={{ mt: { xs: "1px", sm: "40px" } }}
        >
          {/* col 1 */}
          <Grid item xs={12} sm={4} md={3}>
            <SideNav />
          </Grid>
          {/* col 2 */}
          <Grid item xs={12} sm={8} md={9}>
            <Box>
              <>
                {orders?.map((order) => (
                  <ProfileCard
                    mb="24px"
                    sx={{ mb: "24px", width: "88%", mx: { xs: "auto", sm: 0 } }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box sx={{ flex: "1" }}>
                        <Typography
                          sx={{
                            color: "#212121",
                            fontWeight: "600",
                            fontSize: "20px",
                            mb: "24px",
                          }}
                        >
                          {moment(order?.placed_at).format("dddd")}{" "}
                          {moment(order?.placed_at).format("hh:mm A")}
                          {/* {new Date(order?.placed_at).toLocaleDateString("en-US")} */}
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
                            {new Date(order?.placed_at).toLocaleDateString(
                              "en-US"
                            )}
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
                            {order.total_price} $ ({order.items.length} item)
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ alignItems: "flex-end", display: "flex" }}>
                        <Link to={`/profile/order/${order.id}`}>
                          <ChevronRightIcon
                            sx={{ fontSize: "32px", cursor: "pointer" }}
                          />
                        </Link>
                      </Box>
                    </Box>
                  </ProfileCard>
                ))}
              </>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Order;
