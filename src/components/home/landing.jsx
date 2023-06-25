// mui
import { Box, Grid, Typography, useMediaQuery} from "@mui/material";
// photos
import googlePlay from "../../assets/home/googlePlay.png";
import appStore from "../../assets/home/appStore.png";
import landing from "../../assets/home/meatlanding.png";

import { PLAYSTORE } from "../../data/API";

const Landing = () => {
  const fixedCard={width:{xl:"50%",lg:"50%",md:"50%",sm:"100%",xs:"100%"}}
  const smSize=useMediaQuery("(max-width:576px)")
  return (
    <Grid
      container
      spacing={2}
     // sx={{ position: "relative", mt: { xs: "30px", md: "217px" }}}
     sx={{width:"100%",mt:"0px",mx:"auto",flexDirection:{xl:"row",lg:"row",md:"row",sm:"column-reverse",xs:"column-reverse"}}}
    >
      

        {/* dwonload app links */}
        <Box
          sx={{
            bgcolor: "#FFFFFF",
            // paddingTop: "108px",
            // paddingBottom: "94px",
            // paddingLeft: "48px",
            px:"5%",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            width:{xl:"50%",lg:"50%",md:"50%",sm:"100%",xs:"100%"} ,
            pt:{md:"192px",xs:"40px"},
            pb:{md:"12px",xs:"12px"}
            

          }}
        >
          <Typography variant="h1" component="h1" sx={{fontSize:"48px",mb:"16px"}}>
          Our platform allows buy meat in one click And save your effort
          </Typography>
          <Typography
            sx={{color:"#7B7B7B",fontSize:"16px",lineHeight:"32px",mb:"24px"}}
          >
           thinking you make a better decision more than choosing us !! <br/>thinking you make a better 
          </Typography>
          <Box sx={{ display: "flex", gap:{xs:"10px", sm:"15px"}, flexDirection:{xs:"column", sm:"row"} }}>
            <a href={PLAYSTORE} target="_blank" rel="noreferrer">
              <img src={googlePlay} alt="google play" />
            </a>
            <a href={PLAYSTORE} rel="noreferrer" sx={{ marginLeft: { xs: "0 !important", sm: "16px" } }}>
              <img src={appStore} alt="app Store" />
            </a>
          </Box>
        </Box>
      
      <Box
        sx={fixedCard }
      >
        <img src={landing} alt="landing" width="100%" height={smSize? "479px":"679px"}/>
      </Box>
    </Grid>
  );
};

export default Landing;
