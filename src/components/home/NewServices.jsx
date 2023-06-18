import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import Heading from "../layout/heading";

import icon1 from "../../assets/home/services-1.png";
import icon2 from "../../assets/home/services-2.png";
import icon3 from "../../assets/home/services-3.png";
import icon4 from "../../assets/home/services-4.png";
import icon5 from "../../assets/home/services-5.png";
import icon6 from "../../assets/home/services-6.png";

const services = [
  {
    title: "Option to slaughter yourself",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et  Lorem ipsum dolor sit amet, consectetur adipiscing elit, ",
    icon: icon1,
  },
  {
    title: "Halal",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et  Lorem ipsum dolor sit amet, consectetur adipiscing elit, ",
    icon: icon2,
  },
  {
    title: "Humanely raised",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et  Lorem ipsum dolor sit amet, consectetur adipiscing elit, ",
    icon: icon3,
  },
  {
    title: "No hormone",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et  Lorem ipsum dolor sit amet, consectetur adipiscing elit, ",
    icon: icon4,
  },
  {
    title: "Service all of Florida",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et  Lorem ipsum dolor sit amet, consectetur adipiscing elit, ",
    icon: icon5,
  },
  {
    title: "hand-slaughtered",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et  Lorem ipsum dolor sit amet, consectetur adipiscing elit, ",
    icon: icon6,
  },
];
const NewServices = () => {
  return (
    <Box className="spad" id="services">
      <Heading title="Services" />
      <Grid container spacing={4}>
        {services.map((ser, index) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box sx={{display:"flex", justifyContent:"center", flexDirection:"column", alignItems:{xs:"center", sm:"start"}}}>
                <Box
                  sx={{
                    background: "rgba(204, 134, 72, 1)",
                    borderRadius: "8px",
                    width: "72px",
                    height: "72px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img src={ser.icon} alt="icon" />
                </Box>
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: "600",
                    mt: "18px",
                    mb: "8px",
                  }}
                >
                  {ser.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "rgba(144, 144, 144, 1)",
                    maxWidth:{sm:'246px'},
                    textAlign:{xs:"center", sm:"left"}
                  }}
                >
                  {ser.text}{" "}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default NewServices;
