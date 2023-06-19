import styled from "@emotion/styled";
import {
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  Stack,
  Button,
} from "@mui/material";

import icons from "../../assets/home/vector1.svg";
import icons2 from "../../assets/home/vector2.svg";
import icons3 from "../../assets/home/vector3.svg";
import appStore from "../../assets/home/appStore.png";
import googlePlay from "../../assets/home/googlePlay.png";
import send from "../../assets/home/send.svg";
import cypartaLogo from "../../assets/icons/cypartaLogo.png";
import { Link } from "react-router-dom";

import { HashLink } from "react-router-hash-link";

import { PLAYSTORE } from "../../data/API";

import Fotter from "../../assets/home/footer.png";
import logoFooter from '../../assets/home/logofooter.png'
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import tiktok from '../../assets/home/tiktok.png'


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
const footerStyle = {
  backgroundImage: `url('${Fotter}')`,
  backgroundRepeat: "no-repeat",
  height: {xl:"400px",lg:"400px"},
  backgroundSize: "cover",
  display:"flex",
  flexWrap:{lg:"wrap",md:"wrap"},
  flexDirection:{xl:"row",lg:"row",md:"row",sm:"column",xs:"column"},
  justifyContent:{xl:"space-between",md:"space-between",xs:"center"},
  width:"100%"
};
const imgStyle={
  mt:"80px",
  ml:{xl:"10%",md:"5%"},
  display:"flex",
  justifyContent:"center"
}
const titleStyle={fontSize:"15px",color:"#00011F",fontWeight:700,lineHeight:"24px",letterSpacing:"-1.5%",marginTop:{xl:"112px",lg:"112px",md:"112px",xs:"24px"}}
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
  return (
    <>
      {/* <Box
      sx={{
        background: "#6E2E02",
        color: "#FFFFFF",
      }}
    >
      <Container>
        <Grid container spacing={4} sx={{ paddingTop: "48px" }}>
          <Grid item xs={12} sm={6} md={4}>
            <Box>
              <Typography
                variant="h4"
                component="h4"
                mb="8px"
                sx={{ fontWeight: 700, fontSize: "20px" }}
              >
                Home
              </Typography>
              <Box
                sx={{
                  width: "80%",
                  height: "1px",
                  background: "#C9C9C9",
                  mb: "8px",
                }}
              ></Box>
              <NavbarNav>
                <NavItem>
                  <Link to="/retail">retail</Link>
                </NavItem>
                <NavItem>
                  <Link to="/wholesale">Wholesale</Link>
                </NavItem>
                <NavItem>
                  <Link to="/odhiah">Odhiah</Link>
                </NavItem>
                <NavItem>
                  <Link to="/aqqeqa">Aqqeqa</Link>
                </NavItem>
              </NavbarNav>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box>
              <Typography
                variant="h4"
                component="h4"
                mb="8px"
                sx={{ fontWeight: 700, fontSize: "20px" }}
              >
                About us
              </Typography>
              <Box
                sx={{
                  width: "80%",
                  height: "1px",
                  background: "#C9C9C9",
                  mb: "8px",
                }}
              ></Box>
              <NavbarNav>
                <NavItem>
                  <HashLink
                    smooth
                    to={`/#services`}
                    style={{  }}
                  >
                    Services
                  </HashLink>
                </NavItem>
                <NavItem>
                  <HashLink
                    smooth
                    to={`/#contact`}
                    style={{  }}
                  >
                    Contact Us
                  </HashLink>
                </NavItem>
                <NavItem>
                  <HashLink
                    smooth
                    to={`/#contact`}
                    style={{  }}
                  >
                    Branches
                  </HashLink>
                </NavItem>
                <NavItem>
                  <Link to="/retail">Search</Link>
                </NavItem>
              </NavbarNav>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box>
              <Typography
                variant="h4"
                component="h4"
                mb="8px"
                sx={{ fontWeight: 700, fontSize: "20px" }}
              >
                Contact With Us
              </Typography>
              <Box
                sx={{
                  width: "80%",
                  height: "1px",
                  background: "#C9C9C9",
                  mb: "8px",
                }}
              ></Box>
              <Typography variant="p" component="p" mb="16px">
                Enter Your mail to Contact you
              </Typography>
              <Box sx={{ display: "flex" }}>
                <TextField
                  id="outlined-basic"
                  label=""
                  placeholder="Email Address"
                  variant="outlined"
                  sx={{
                    input: {
                      background: "#fff",
                      borderRadius: "10px 0px 0 10px",
                    },
                  }}
                />
                <Button
                  sx={{
                    background: "#CC8648",
                    marginLeft: "-3px",
                    borderRadius: "0 10px 10px 0",
                  }}
                >
                  <img src={send} alt="send" />
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            width: "100%",
            height: "1px",
            background: "#C9C9C9",
            mb: "8px",
            mt: "32px",
            display: { xs: "none", md: "flex" },
          }}
        ></Box>
      </Container>
      <Container>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent={{ xs: "flex-start", md: "space-between" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          mt="32px"
          pb="80px"
        >
          <Box
            sx={{
              flex: "1",
              display: { xs: "none", md: "flex" },
            }}
          >
            <img
              src={icons}
              alt="link to grays and danny's Facebook"
              width="24px"
              height="24px"
            />
            <img
              src={icons2}
              alt="link to grays and danny's whatsApp"
              style={{ marginLeft: "15px" }}
              width="24px"
              height="24px"
            />
            <img
              src={icons3}
              alt="test"
              style={{ marginLeft: "15px" }}
              width="24px"
              height="24px"
            />
          </Box>
          <Box
            sx={{
              flex: 1,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            <Box>Powered by : </Box>{" "}
            <Box>
              {" "}
              <a href="https://cyparta.com/" target="_blank">
                <img
                  src={cypartaLogo}
                  alt="cyparta logo /-grays and danny's "
                />
              </a>
            </Box>
          </Box>
          <Box sx={{ flex: 1 }}>
            <a href={PLAYSTORE} target="_blank">
              <Button>
                <img
                  src={googlePlay}
                  alt="Download grays and danny's from google play"
                  width={"100%"}
                  height={"100%"}
                />
              </Button>
            </a>
            <Button>
              <img
                src={appStore}
                alt="Download grays and danny's from app store"
                width="100%"
                height="100%"
              />
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box> */}
      <Box  sx={footerStyle}>
        <Box sx={imgStyle}>
          <img src={logoFooter} alt="Logo Footer"/>
        </Box>
        <Box>
          <Box sx={{display:"flex",justifyContent:{xs:"center"}}}>
          <NavbarNav>
          <Typography sx={titleStyle}>Links</Typography>
                <NavItem>
                  <Link to="/retail">Contact Us</Link>
                </NavItem>
                <NavItem>
                  <Link to="/wholesale">Shop</Link>
                </NavItem>
                <NavItem>
                  <Link to="/profile">Profile</Link>
                </NavItem>
              </NavbarNav>
              </Box>
        </Box>
        <Box sx={{display:"flex",alignItems:{xs:"center"},flexDirection:"column"}}>
          <Typography sx={titleStyle}>Social Media</Typography>
          <Box sx={{mt:"18px",display:"flex",gap:2,flexDirection:"row"}} >
          <InstagramIcon/>
          <TwitterIcon/>
          <FacebookOutlinedIcon/>
          <img src={tiktok} alt='Tictok' />
          </Box>
        </Box>
        <Box sx={{display:"flex",alignItems:{xs:"center",flexDirection:"column"}}}>
          <Typography sx={titleStyle}>Download App</Typography>
          <Box sx={{ display: "flex", gap:3, flexDirection:"column",mt:"16px" }}>
            <a href={PLAYSTORE} target="_blank" rel="noreferrer">
              <img src={googlePlay} alt="google play" />
            </a>
            <a href={PLAYSTORE} rel="noreferrer" >
              <img src={appStore} alt="app Store" />
            </a>
          </Box>
        </Box>
        <Box sx={{mr:{xl:"15%",lg:"8%",md:"4%"},display:"flex",alignItems:{xs:"center",flexDirection:"column"}}}>
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
        </Box>
      </Box>
    </>
  );
};

export default Footer;
