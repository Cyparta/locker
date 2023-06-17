import * as React from "react";
import styled from "@emotion/styled";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import HeroTitle from "../../components/layout/heroTitle";
import masterCard from "../../assets/payment/masterCard.png";
import visa from "../../assets/payment/visa.png";
import { InputControl } from "../../shared/style";
import Checkbox from "@mui/material/Checkbox";
import UserCart from "../../components/cart/userCart";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../store/cart/cartSlice";
import PageMeta from "../../components/layout/PageMeta";
import RadioCheck from "../../components/common/radioCheck";

const Card = styled(Box)({
  boxShadow:
    "-2.5px -2.5px 5px rgba(179, 179, 179, 0.08), 2.5px 2.5px 8px rgba(53, 53, 53, 0.2)",
  borderRadius: "10px",
  padding: "16px 24px",
  cursor: "pointer",
});
const Payment = () => {
  const dispatch = useDispatch();

  const [checked, setChecked] = React.useState(true);
  const [agreeCheck, setAgreeCheck] = React.useState(false);
  const [paymentChecked, setPaymentChecked] = React.useState(false)
  const {items} = useSelector(state => state.cart)
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  // const is_Alive = items?.items?.find(ele => ele.product.is_alive)
  const crumbs = [
    { label: 'Home', link: '/', active: false },
    { label: 'Payment', link: '/payment', active: true },
  ]; 

  return (
    <>
      <PageMeta
        title="payment - Grays and Danny's"
        desc="payment products meat at Grays and Danny's. We offer high-quality beef, pork, chicken, and more, sourced from local farms and raised with care. Our meats are expertly prepared and delivered fresh to your door, so you can enjoy the best-tasting and healthiest meats available. With fast and reliable shipping, easy returns, and exceptional customer service, Grays and Danny's is your one-stop online destination for all your meat needs."
      />
      <Container>
        <Box>
          {/* hero title */}
          <Box mt="25px">
            <HeroTitle crumbs={crumbs} />
          </Box>

          <Grid container spacing={5}>
            <Grid item xs={12} md={8}>

              {/* agreeMent */}
              {/* {is_Alive &&
              <Box mt="34px">
                <Typography sx={{ fontSize: "20px", fontWeight: "600" }}>
                  Agreement
                </Typography>
                <Typography
                  mt="16px"
                  sx={{
                    fontSize: "13px",
                    fontWeight: "400",
                    lineHeight: "18px",
                    color: "#212121",
                  }}
                >
                  Do you want to slay it on your own responsibility or leave it
                  to the butcher ,If you need to slay it by yourself you need to
                  agree the{" "}
                  <span
                    style={{ color: "#6E2E02", textDecoration: "underline" }}
                  >
                    policy
                  </span>{" "}
                  first
                </Typography>
                <Box
                  sx={{
                    background: "#F5F5F5",
                    padding: "8px",
                    width: { sm: "350px", mt: "" },
                    borderRadius: "5px",
                    mt: "8px",
                    paddingLeft: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    cursor: "pointer",
                  }}
                  onClick={() => setAgreeCheck(2)}
                >
                  <RadioCheck id={2} checked={agreeCheck} />
                  Slay it On My own responsibility
                </Box>
                <Box
                  sx={{
                    background: "#F5F5F5",
                    padding: "8px",
                    width: { sm: "350px" },
                    borderRadius: "5px",
                    mt: "16px",
                    display: "flex",
                    paddingLeft: "16px",
                    alignItems: "center",
                    gap: "7px",
                    cursor: "pointer",
                  }}
                  onClick={() => setAgreeCheck(1)}
                >
                  <RadioCheck id={1} checked={agreeCheck} />
                  leave it to the butcher
                </Box>
              </Box>
              } */}
              <Box mt="34px">
                <Typography sx={{ fontSize: "20px", fontWeight: "600" }}>
                  Agreement
                </Typography>
                <Typography
                  mt="16px"
                  sx={{
                    fontSize: "13px",
                    fontWeight: "400",
                    lineHeight: "18px",
                    color: "#212121",
                  }}
                >
                  Do you want to slay it on your own responsibility or leave it
                  to the butcher ,If you need to slay it by yourself you need to
                  agree the{" "}
                  <span
                    style={{ color: "#6E2E02", textDecoration: "underline" }}
                  >
                    policy
                  </span>{" "}
                  first
                </Typography>
                <Box
                  sx={{
                    background: "#F5F5F5",
                    padding: "8px",
                    width: { sm: "350px", mt: "" },
                    borderRadius: "5px",
                    mt: "8px",
                    paddingLeft: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    cursor: "pointer",
                  }}
                  onClick={() => setAgreeCheck(2)}
                >
                  <RadioCheck id={2} checked={agreeCheck} />
                  Slay it On My own responsibility
                </Box>
                <Box
                  sx={{
                    background: "#F5F5F5",
                    padding: "8px",
                    width: { sm: "350px" },
                    borderRadius: "5px",
                    mt: "16px",
                    display: "flex",
                    paddingLeft: "16px",
                    alignItems: "center",
                    gap: "7px",
                    cursor: "pointer",
                  }}
                  onClick={() => setAgreeCheck(1)}
                >
                  <RadioCheck id={1} checked={agreeCheck} />
                  leave it to the butcher
                </Box>
              </Box>
              {/* shipping Address */}
              <Box mt="34px">
                <Typography sx={{ fontSize: "20px", fontWeight: "600" }}>
                  Shipping Address
                </Typography>

                <Card
                  sx={{
                    padding: "24px !important",
                    marginTop: "16px",
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    gap: "60px",
                  }}
                >
                  <Box sx={{ color: "rgba(115, 115, 115, 1)" }}>
                    <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                      first Name ,Last Name
                    </Typography>
                    <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                      first Name ,Last Name ssdkfczm.dkcmkd mlk,zm;s dvm,dv
                      zklvsdm.
                      <br /> 02151465425515
                    </Typography>
                  </Box>
                  <Typography sx={{ color: "#CC8648", fontSize: "14px" }}>
                    Edit
                  </Typography>
                </Card>

                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: "600",
                    mt: "32px",
                    mb: "16px",
                  }}
                >
                  Payment Method
                </Typography>
                <Card sx={{ mb: "50px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                  >
                    <Box
                      sx={{
                        background: "#F5F5F5",
                        padding: "8px",
                        width: { sm: "350px", mt: "" },
                        borderRadius: "5px",
                        mt: "8px",
                        paddingLeft: "16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                        cursor: "pointer",
                      }}
                      onClick={() => setPaymentChecked((oldValue) => !oldValue)}
                    >
                      <RadioCheck id={true} checked={paymentChecked} />
                      Nada Medhat Shalaby
                    </Box>
                    <Box>
                      <img src={masterCard} alt="master card" />
                      <img src={visa} alt="master card" />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      background: "#F5F5F5",
                      boxShadow: "2.5px 2.5px 5px rgba(16, 24, 40, 0.08)",
                      mt: "16px",
                      padding: "16px 26px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                      mb: "15px",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: "16px",
                          mb: "4px",
                          color: "#212121",
                        }}
                      >
                        Enter Card number
                      </Typography>
                      <Box sx={{ position: "relative" }}>
                        <InputControl
                          label=""
                          variant="outlined"
                          placeholder="**** **** ****"
                          type="text"
                          id="email"
                          name="email"
                          sx={{ input: { padding: "10px" } }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            right: "15px",
                            transform: "translateY(-50%)",
                          }}
                        >
                          <img src={visa} alt="visa" />
                        </Box>
                      </Box>
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: "16px",
                          mb: "4px",
                          color: "#212121",
                        }}
                      >
                        Expiry Date
                      </Typography>
                      <InputControl
                        label=""
                        variant="outlined"
                        placeholder="Enter Name"
                        type="text"
                        id="email"
                        name="email"
                        sx={{ input: { padding: "10px" } }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "10px",
                        flexDirection: { xs: "column", md: "row" },
                      }}
                    >
                      <Box sx={{ flex: "1" }}>
                        <Typography
                          sx={{
                            fontWeight: "600",
                            fontSize: "16px",
                            mb: "4px",
                            color: "#212121",
                          }}
                        >
                          CVV
                        </Typography>
                        <InputControl
                          label=""
                          variant="outlined"
                          placeholder="Enter Name"
                          type="text"
                          id="email"
                          name="email"
                          sx={{ input: { padding: "10px" } }}
                        />
                      </Box>
                      <Box sx={{ flex: "1" }}>
                        <Typography
                          sx={{
                            fontWeight: "600",
                            fontSize: "16px",
                            mb: "4px",
                            color: "#212121",
                          }}
                        >
                          Card Holder Name
                        </Typography>
                        <InputControl
                          label=""
                          variant="outlined"
                          placeholder="Enter Name"
                          type="text"
                          id="email"
                          name="email"
                          sx={{ input: { padding: "10px" } }}
                        />
                      </Box>
                    </Box>
                    <Box>
                      <Checkbox
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                        sx={{
                          color: "#6E2E02",
                          "&.Mui-checked": {
                            color: "#6E2E02",
                          },
                        }}
                      />
                      save card
                    </Box>
                    <Box textAlign="right">
                      <Button
                        sx={{
                          background: "#7F7F7F",
                          borderRadius: "10px",
                          color: "#fff",
                          height: "48px",
                          border: "none",
                          fontSize: "16px",
                          padding: "0 18px",
                          width: { sm: "228px" },
                          textTransform: "capitalize",
                        }}
                      >
                        Add
                      </Button>
                    </Box>
                  </Box>
                </Card>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <UserCart />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Payment;
