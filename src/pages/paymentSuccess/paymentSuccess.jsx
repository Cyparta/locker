import { Card, Box, Grid, Container, Typography, Button } from "@mui/material";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import { CardSign } from "../../shared/style";
import successImg from "../../assets/payment/success.png";
import { Link } from "react-router-dom";
const PaymentSuccess = () => {
  return (
    <Box
      sx={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        mt:"80px"
      }}
    >
      <Container>
        <Grid container spacing={8} justifyContent={"center"}>
          <Grid item xs={12} sm={6}>
            <Box>
              <Box sx={{ background: "transparent" }}>
                <Box sx={{ textAlign: "center" }}>
                  <img src={successImg} alt="success " />
                  <Typography
                    sx={{ color: "rgba(110, 46, 2, 1)" }}
                    variant="h3"
                  >
                    Payment Successful !
                  </Typography>
                  <Typography
                    sx={{
                      color: "rgba(53, 53, 53, 1)",
                      mt: "8px",
                      fontSize: "18px",
                    }}
                  >
                    thank you for choosing Grays and danny's
                  </Typography>
                  <Box sx={{ mt: "30px" }}>
                    <Link to="/">
                      <button
                        className="main-btn-outline"
                        style={{
                          width: "auto",
                          padding: "12px 68px",
                          cursor: "pointer",
                        }}
                      >
                        Back to Home
                      </button>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PaymentSuccess;
