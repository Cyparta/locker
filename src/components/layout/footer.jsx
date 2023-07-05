import styled from "@emotion/styled";
import {
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  Stack,
  Button,
  useMediaQuery,
} from "@mui/material";

import icons from "../../assets/home/vector1.svg";
import icons2 from "../../assets/home/vector2.svg";
import icons3 from "../../assets/home/vector3.svg";
import appStore from "../../assets/home/appStore.png";
import googlePlay from "../../assets/home/googlePlay.png";
import send from "../../assets/home/send.svg";
import { Link } from "react-router-dom";

import { HashLink } from "react-router-hash-link";

import { PLAYSTORE } from "../../data/API";

import Fotter from "../../assets/home/footer.png";
import logoFooter from '../../assets/home/logofooter.png'
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import tiktok from '../../assets/home/tiktok.png'
import cypartaLogo from '../../assets/home/cypartal logo.png'
import { Fragment } from "react";


const NavbarNav = styled("ul")({
  listStyle: "none",
  padding: "0",
});
const NavItem = styled("li")({
  color: "#9D9D9D",
  lineHeight: "32px",
  fontWeight: "400",
  fontSize: "15px",
});

const imgStyle={
  mt:"80px",
  ml:{xl:"10%",md:"5%"},
  display:"flex",
  justifyContent:"center"
}
const titleStyle={fontSize:"15px",color:"#00011F",fontWeight:700,lineHeight:"24px",letterSpacing:"-1.5%",marginTop:{xl:"112px",lg:"112px",md:"112px",xs:"48px"}}
const contactStyle={
  height:"222px",
  mt:"75px",
  bgcolor:"#F3E6D8",
  boxShadow:"-4px -4px 4px rgba(250, 251, 255, 0.08), 0px 4px 4px rgba(155, 29, 8, 0.08)",
  borderRadius:"16px",
  display:"flex",
  justifyContent:"space-between",
  flexDirection:"column",
 px:"10%",
 py:"32px"
}
const contactTitleStyle={
  fontSize:"18px",
  fontWeight:700,
  lineHeight:"24px",
  letterSpacing:"-1.5%",
 
}
const contactdescribeStyle={
  fontSize:"14px",
  fontWeight:700,
  lineHeight:"24px",
  letterSpacing:"-1.5%",
  color:"#9D9D9D"
}
const Footer = () => {
  const smSize=useMediaQuery("(max-width:576px)")
  const footerStyle = {
    backgroundImage: smSize? "#fff":`url('${Fotter}')`,
    backgroundRepeat: "no-repeat",
    height: {xl:"400px",lg:"400px"},
    backgroundSize: "cover",
    
    width:"100%",
    
  }

  return (
    <Fragment>
      <Box sx={footerStyle}>
        <Container maxWidth='xl'>
        <Grid container   sx={{ paddingTop: "48px" }}>
          <Grid item xs={12} sm={6} md={4} lg={2}>
        <Box sx={imgStyle}>
          <img src={logoFooter} alt="Logo Footer"/>
        </Box>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={2}>
        <Box>
          <Box sx={{display:"flex",justifyContent:"center" }}>
          <NavbarNav>
          <Typography sx={titleStyle}>Links</Typography>
                <NavItem>
                  <Link to={`/#contact`}>Contact Us</Link>
                </NavItem>
                <NavItem>
                  <Link to="/retail">Shop</Link>
                </NavItem>
                <NavItem>
                  <Link to="/profile">Profile</Link>
                </NavItem>
              </NavbarNav>
              </Box>
        </Box>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={1}>
        <Box sx={{display:"flex",alignItems:{xs:"center"},flexDirection:"column"}}>
          <Typography sx={titleStyle}>Social Media</Typography>
          <Box sx={{mt:"18px",display:"flex",gap:2,flexDirection:"row"}} >
          <InstagramIcon/>
          <TwitterIcon/>
          <FacebookOutlinedIcon/>
          <img src={tiktok} alt='Tictok' />
          </Box>
        </Box>
        </Grid>
       
        <Grid item xs={12} sm={6} md={6}lg={3}>
        <Box sx={{display:"flex",alignItems:{xs:"center",flexDirection:"column"},}}>
          <Typography sx={titleStyle}>Download App</Typography>
          <Box sx={{ display: "flex", gap:3, flexDirection:{xl:"column",lg:"column",md:"row",sm:"column"},mt:"16px" }}>
            <a href={PLAYSTORE} target="_blank" rel="noreferrer">
              <img src={googlePlay} alt="google play" />
            </a>
            <a href={PLAYSTORE} rel="noreferrer" >
              <img src={appStore} alt="app Store" />
            </a>
          </Box>
        </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={4}lg={3}>
        <Box sx={{display:"flex",alignItems:{xs:"center",flexDirection:"column"}}}>
          <Box sx={contactStyle}>
            <Typography sx={contactTitleStyle}>Keep in touch</Typography>
            <Typography sx={contactdescribeStyle}>Get exclusive offers , packages and free delivery</Typography>
            <Box sx={{ display: "flex" }}>
                <TextField
                  id="outlined-basic"
                  label=""
                  placeholder="Email Address"
                  variant="outlined"
                  sx={{
                    input: {
                      background: "#fff",
                      borderRadius: "12px 0px 0 12px",
                    },
                  }}
                />
                <Button
                  sx={{
                    background: "#C76D55",
                    marginLeft: "-3px",
                    borderRadius: "0 12px 12px 0",
                    ":hover":{
                      background: "#C76D55",
                    }
                  }}
                >
                  <img src={send} alt="send" />
                </Button>
              </Box>
          </Box>
          <Box sx={{display:"flex",flexDirection:"row",alignItems:"center"}}>
            <Typography sx={{pt:"15px"}}>Powered by : </Typography>
            <img src={cypartaLogo} alt="cyparta logo"/>
          </Box>
        </Box>
        </Grid>
        </Grid>
        </Container>
      </Box>
    </Fragment>
  );
};

export default Footer;
