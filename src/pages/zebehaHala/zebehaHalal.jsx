import { Box, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import PageMeta from "../../components/layout/PageMeta";
import HeroTitle from "../../components/layout/heroTitle";
import RadioCheck from "../../components/common/radioCheck";
import { MainButton } from "../../shared/style";

const ZebehaHalal = () => {
  const [opt, setOpt] = useState(0);
  return (
    <Box>
      <Container>
        {/* option Selcection */}
        <Box mt="24px" sx={{padding:"20px"}}>
          <Typography sx={{ fontSize: "20px", fontWeight: "500" }}>
            Choose option
          </Typography>
          <Box
            sx={{ display: "flex", alignItems: "center", cursor:"pointer" }}
            onClick={() => {
              setOpt(1)
            }}
          >
            <Box sx={{ flex: { xs: 0, sm: 0 } }}>
              <RadioCheck id={1} checked={opt} />
            </Box>
            <Typography component="p" variant="p" sx={{ marginLeft: "8px" }}>
              Buy and slaughter your livestock?
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", cursor:"pointer" }} onClick={() => {
              setOpt(2);
            }}>
            <Box sx={{ flex: { xs: 0, sm: 0 } }}>
              <RadioCheck id={2} checked={opt} />
            </Box>
            <Typography component="p" variant="p" sx={{ marginLeft: "8px" }}>
              Witness the slaughter of your Qurbani/Odhia
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", cursor:"pointer" }} onClick={() => {
              setOpt(3);
            }}>
            <Box sx={{ flex: { xs: 0, sm: 0 } }}>
              <RadioCheck id={3} checked={opt} />
            </Box>
            <Typography component="p" variant="p" sx={{ marginLeft: "8px" }}>
              Not interested to attend the slaughtering ; I just need to pick up
              the meat after.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", cursor:"pointer" }} onClick={() => {
              setOpt(4);
            }}>
            <Box sx={{ flex: { xs: 0, sm: 0 } }}>
              <RadioCheck id={4} checked={opt} />
            </Box>
            <Typography component="p" variant="p" sx={{ marginLeft: "8px" }}>
              Special request to be said/done at the slaughter time.
            </Typography>
          </Box>
        </Box>

        <Box>
          <Typography sx={{ color: "#6E2E02", mt:"20px", fontWeight: "500", fontSize:"20px" }}>A warning statement</Typography>
          <ul style={{ fontSize: "14px", color: "#353535" }}>
            <li>
              a discount of <span style={{color:"#6E2E02", fontWeight:"600"}}>$75</span> will apply if you choose to do your
              qurbani/odhia in the second day of Adhia Eid{" "}
            </li>
            <li>
              a discount of <span style={{color:"#6E2E02", fontWeight:"600"}}>$100</span> will apply if you choose to do your Qurbani
              /Odhia the third day
            </li>
            <li>
              a discount of <span style={{color:"#6E2E02", fontWeight:"600"}}>$150</span> will apply if you choose to do your
              Qurbani/odhia in the fourth day of Adhia Eid
            </li>
          </ul>

          <span> Discount apply for Beef</span>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: "32px",
            mb: "48px",
          }}
        >
          <MainButton sx={{ width: { xs: "100%", sm: "311px" } }}>
            Next
          </MainButton>
        </Box>
      </Container>
    </Box>
  );
};

export default ZebehaHalal;
