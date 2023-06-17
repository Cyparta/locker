import { Box, Grid, Typography, Stack } from "@mui/material";
import Heading from "../layout/heading";

import locationGif from "../../assets/home/earth.gif";
import phone from "../../assets/home/phone.gif";
import clock from "../../assets/home/clock.gif";
import promote from '../../assets/home/promote.gif';

import faceIcon from "../../assets/home/vector1.svg";
import whatIcon from "../../assets/home/vector2.svg";
import instaIcon from "../../assets/home/vector3.svg";
import teleIcon from "../../assets/home/Vector.svg";
import metorLogo from "../../assets/icons/metoor.png";

import styled from "@emotion/styled";

const IconBox = styled(Box)({
  background: "#CC8648",
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  textAlign: "center",
  lineHeight: "69px",
});

const ContactUs = () => {
  return (
    <Box className="spad" sx={{ mt: "0" }} id="contact">
      {/* heading */}
      <Heading title="Contact Us" />
      {/* Grid */}
      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{ textAlign: "center" }}
      >
        <Grid item xs={12} sm={3}>
          <Box sx={{ mt: { sm: "80px" } }}>
            <img src={locationGif} alt="location" width="89px" />
            <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
              LOCATION
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "400",
                maxWidth: "174px",
                margin: "8px auto",
              }}
            >
              29513 US Highway 27thMoore Haven, FL 33471
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box>
            <img src={phone} alt="location" width="89px" />
            <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
              Phone
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "400",
                maxWidth: "174px",
                margin: "8px auto",
              }}
            >
              Direct: <a href="tel:863-946-0936">(863)-946-0936</a>  <br />
              Cell: <a href="tel:863-301-1214">863-301-1214</a> <br />
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box sx={{ mt: { sm: "80px" } }}>
            <img src={clock} alt="location" width="89px" />
            <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
              HOURS
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "400",
                maxWidth: "174px",
                margin: "8px auto",
              }}
            >
              M-F 9:30am–6:00pm <br /> Sat 8:00am- 12:00pm
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Box>
            <img src={promote} alt="location" width="89px" />
            <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
              Sale & Marketing
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "400",
                maxWidth: "174px",
                margin: "8px auto",
              }}
            >
              <a href="tel:863-281-9122">863-281-9122</a> <br />
              <a href="tel:863-281-9150">863-281-9150</a>
              
            </Typography>
          </Box>
        </Grid>
      </Grid>
      {/* icons */}
      <Stack
        direction="row"
        sx={{ flexWrap: "wrap", justifyContent: "center", mt: "48px" }}
        gap="10px"
      >
        <IconBox>
          <img src={faceIcon} alt="facebook icon" />
        </IconBox>
        <IconBox>
          <img src={whatIcon} alt="whats icon" />
        </IconBox>
        <IconBox>
          <img src={instaIcon} alt="intagram icon" />
        </IconBox>
        <IconBox>
          <img src={teleIcon} alt="test" />
        </IconBox>
        <IconBox>
          <img src={metorLogo} alt="test" width="24" height="24px" />
        </IconBox>
      </Stack>
    </Box>
  );
};

export default ContactUs;
