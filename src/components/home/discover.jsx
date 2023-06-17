import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { MainButton } from "../../shared/style";
import Heading from "../layout/heading";

const Discover = () => {
  return (
    <Box className="spad">
      <Box sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
        <Heading title="Discover" sx={{mb:"0"}}/>
        <Typography sx={{m:"0", mb:"24px", mt:"8px", textAlign: "center"}}>Quickly discover the new way to buy you odhiah or aqqeqa  </Typography>
        <MainButton sx={{width: {md: '311px !important'}}}>Discover Now</MainButton>
      </Box>
    </Box>
  );
};

export default Discover;
