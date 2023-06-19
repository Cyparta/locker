import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { Grid, InputAdornment, TextField } from "@mui/material";

import cartIcon from "../../assets/icons/cart.png";
import logo from "../../assets/icons/logo.png";
import logoSVG from "../../assets/icons/logo.svg";
import logoPNG from "../../assets/icons/logoPNG.png";
import navbarImage from "../../assets/home/navbarimage.png";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMeat, setValues } from "../../store/shop/shopSlice";
import { setUser } from "../../store/user/userSlice";
import { formatPrice } from "../../utils/foramtPrice";
import { HashLink, NavHashLink } from "react-router-hash-link";
import { MainButton } from "../../shared/style";
import { useState } from "react";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const pages = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Shop",
    to: "/retail",
  },
  // {
  //   name: "wholesale",
  //   to: "/wholesale",
  // },
  // {
  //   name: "Odhiah",
  //   to: "/odhiah",
  // },
  // {
  //   name: "aqqeqa",
  //   to: "/aqqeqa",
  // },

  {
    name: "Contact Us",
    to: "/#contact",
  },
];

function Navbar() {
  /*---- toggle Drawer ------*/
  const [state, setState] = React.useState({
    left: false,
  });
  /*---- Show Search ------*/
  const [query, setQuery] = React.useState(false);
  const [active,setActive]=React.useState(false)
  const [indexLink,setIndexLink]=useState(0)
 
  const { pathname } = useLocation();
  const handleIndexLink=(e,page,index)=>{
    setIndexLink(index)
    console.log(index);
    console.log(page)
    console.log(pathname)
  }
  const isactive = (path) => pathname === path;
  const { items } = useSelector((state) => state.cart);
  const { total_price } = useSelector((state) => state.cart);

  // token
  // const token = localStorage.getItem("token");
  const token = useSelector((state) => state.user.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchRef = React.useRef();

  // close search on click outSide
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setQuery(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
  }, [query]);

  // Drawer
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const textLogoStyle={fontSize:"24px",fontWeight:500,letterSpacing:"8%",color:"#9B1D08",ml:"18px"}
  const loginButtonStyle={
    fontSize:"16px",
    fontWeight:500,
    textAlign:"center",
    borderRadius:"14px",
    display:"flex",
    justifyContent:"center",
    height:"48px",
    width:"130px",
    bgcolor:"#9B1D08",
    color:"#fff",
    marginLeft:"22px",
    pt:1.4
  }

  /*----- sidebar ----- */
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link to="/">
          {/* <img src={logo} alt="logo" width="100%" height="100%" /> */}
          <Typography sx={textLogoStyle}>Papineau Locker</Typography>
        </Link>
        {pages.map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <HashLink
                smooth
                to={`${text.to}`}
                style={{ color: "#000", textDecoration: "none" }}
              >
                <ListItemText primary={text.name} />
              </HashLink>
            </ListItemButton>
          </ListItem>
        ))}
        <Box
          sx={{
            paddingInline: "16px",
            display: "flex",
            gap: "10px",
            mt: "10px",
          }}
        >
          <Box>
            <Link to="/retail" aria-label="go to search">
              <SearchIcon />
            </Link>
          </Box>
          <Box
            sx={{
              color: "#000",
            }}
          >
            <Box
              sx={{
                color: "#000",
              }}
            >
              <Link
                to={token ? "/profile" : "/login"}
                aria-label="go to profile"
              >
                <PersonOutlineOutlinedIcon />
              </Link>
            </Box>
          </Box>

          <Box
            sx={{
              color: "#000",
            }}
          >
            <Link to={token ? "/cart" : "/login"}>
              <ShoppingCartIcon />
            </Link>
          </Box>
        </Box>
        {token ? (
          <ListItem key={0} disablePadding>
            <ListItemButton>
              <Link
                style={{ color: "#000", textDecoration: "none" }}
                onClick={() => {
                  localStorage.removeItem("token");
                  dispatch(setUser(null));
                  navigate("/login");
                }}
                aria-label="click to logout"
              >
                <ListItemText primary={"logout"} />
              </Link>
            </ListItemButton>
          </ListItem>
        ):
        <Box
          sx={{
            paddingInline: "16px",
            display: "flex",
            gap: "10px",
            mt: "10px",
          }}
        >
          <Link to="/login">
            <MainButton
              sx={{
                padding: "5px 30px !important",
                width: "fit-content !important",
              }}
            >
              login
            </MainButton>
          </Link>
        </Box>
        }
      </List>
    </Box>
  );

  /* change Navbar */
  // const [navbarFixed, setNavbarFixed] = React.useState(false);

  const loca = window.location;

  return (
    <>
      <Box>
        <AppBar
         
          sx={{
            bgcolor: { xs: "#F3E6D8", lg: "#F3E6D8" },
            boxShadow: { xs: "0", lg: "0px 4px 40px rgba(155, 29, 8, 0.08)" },
            height:"70px",
            zIndex: "999",
            position: "fixed",
            top: "0px",
          }}
        >
          <Container maxWidth='xl'>
            <Toolbar
              disableGutters
              sx={{ flexWrap: "wrap" }}
            >
              {/*------- logo in Tablet ---- */}
              <Box
                sx={{
                  flexGrow:1,
                  mt:{xl:"5px",xs:"18px"}
                }}
              >
                <Link to="/">
                  {/* <img
                    src={logoPNG}
                    alt="grays and danny's logo"
                    width="100%"
                    height="100%"
                    className="image-navbar"
                  /> */}
                  <Typography sx={textLogoStyle}>Papineau Locker</Typography>
                </Link>
              </Box>

              {/* ------- Items Links ---- */}
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", lg: "flex", marginLeft: "150px" },
                }}
              >
                {pages.map((page, index) => (
                  <Button
                    key={index}
                    sx={{
                      my: 2,
                      lineHeight:"18px",
                      display: "block",
                      textTransform: "capitalize",
                      fontSize: "15px",
                      fontWeight: "500",
                      marginRight: "24px",
                      fontFamily: "Poppins",
                    }}
                    selected={indexLink===index}
                    onClick={(e)=>{handleIndexLink(e,page,index)}}
                  >
                    <NavHashLink
                      smooth
                      to={page.to}
                      style={
                        isactive(page.to)
                          ? {
                              color: "#9B1D08"
              
                            }
                          : {
                            color:"#9D9D9D"
                          }
                      }
                      
                    >
                      {page.name}
                    </NavHashLink>
                  </Button>
                ))}
              </Box>

              {/* -------- settings links --------- */}
              <Box
                sx={{
                  flexGrow: 0,
                  display: { xs: "none", lg: "flex" },
                  alignItems: "center",
                }}
              >
                <Box sx={{ color: "#121212", m: "0", p: "0" }}>
                  <Link
                    onClick={() => setQuery(!query)}
                    aria-label="go to search"
                  >
                    <SearchIcon />
                  </Link>
                </Box>

               

                <Box
                  sx={{
                    m: "0",
                    p: "0",
                    marginRight: "16px",
                    marginLeft: "25px",
                  }}
                >
                  <Link to="/cart" aria-label="go to cart page">
                    <img src={cartIcon} alt="cart /- grays and danny's" />
                  </Link>
                </Box>
                {/* {window.location.pathname ="/wholesale" ?  : ""} */}
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    marginRight: "16px",
                    color:"#121212"
                  }}
                >
                  {items?.length ? items.length : 0}
                </Typography>
                {window.location.pathname !== "/wholesale" ? (
                  <Typography sx={{ fontSize: "16px", fontWeight: "600" ,color:"#121212"}}>
                    $ {total_price ? formatPrice(total_price) : "00.00"}
                  </Typography>
                ) : (
                  ""
                )}
                {token?
                <PersonOutlineIcon sx={{fontSize:"2rem",mx:2,color:"#000",cursor:"pointer"}} onClick={()=>navigate("/profile")}/> : 
                 <Box
                  sx={loginButtonStyle}
                >
                  {/* <Button sx={loginButtonStyle}> </Button> */}
                  <Link
                  
                    to={"/login"}
                    aria-label="go to profile"
                  >
                    {/* <PersonOutlineOutlinedIcon /> */}
                    Log in
                  </Link>
                 
                </Box>
                }
                {/*
              {token && (
                <Box
                  mt="5px"
                  sx={{ cursor: "pointer", position: "relative" }}
                  onClick={() => setUserBox(!userBox)}
                >
                  <ArrowDropDownIcon />
                  {userBox && (
                    <ul
                      style={{
                        listStyle: "none",
                        position: "absolute",
                        top: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "#fff",
                        color: "#000",
                        padding: "10px 10px",
                        width: "150px",
                        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      <li
                        onClick={() => localStorage.removeItem("token")}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <LogoutIcon
                          sx={{ fontSize: "16px", color: "#6E2E02" }}
                        />{" "}
                        <span style={{ marginRight: "5px" }}>logout</span>
                      </li>
                    </ul>
                  )}
                </Box>
              )}
              */}
              </Box>

              {/*------------ mobile --------- */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  width: "100%",
                }}
              >
                {/*------------ mobile icon and nav open --------- */}
                {["left"].map((anchor) => (
                  <React.Fragment key={anchor}>
                    <Button
                      onClick={toggleDrawer(anchor, true)}
                      sx={{
                        display: { xs: "flex", lg: "none" },
                        
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                        marginTop:"-40px",
                        padding: "10px",
                        color: "#fff",
                        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
                        "&:hover": {
                          backgroundColor: "#fff",
                        },
                      }}
                    >
                      <MenuIcon sx={{ color: "#000" }} />
                    </Button>
                    <Drawer
                      anchor={anchor}
                      open={state[anchor]}
                      onClose={toggleDrawer(anchor, false)}
                    >
                      {list(anchor)}
                    </Drawer>
                  </React.Fragment>
                ))}
                {/* <Box
                  sx={{
                    display: { xs: "flex", lg: "none" },
                    mr: 1,
                    position: "absolute",
                    transform: "translateX(-50%)",
                    left: "50%",
                    top: "10px",
                  }}
                >
                  <Link to="/">
                    <img
                      src={logoPNG}
                      alt="grays and danny's logo"
                      className="image-navbar"
                    />
                  </Link>
                </Box> */}
                {/* <Typography
                  sx={{
                    color: "#fff",
                    // mt: "10px",
                    display: { md: "none" },
                  }}
                >
                  <a href="tel:(863)-946-0936">(863)-946-0936</a>
                </Typography> */}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      {query && (
        <Box
          sx={{
            background: "#D3C0B3",
            padding: "33px 0px",
            textAlign: "center",
            position: "fixed",
            width: "100%",
            top: "72px",
            zIndex: "88",
            boxShadow: { lg: "0px 2px 10px rgba(0, 0, 0, 0.2)" },
          }}
          className="top-in"
          ref={searchRef}
        >
          <Grid container justifyContent="center">
            <Grid item xs={6}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatch(getMeat());
                  navigate("/retail");
                  setQuery(false);
                }}
              >
                <TextField
                  fullWidth
                  placeholder={"What can we help you find?"}
                  variant="outlined"
                  label=""
                  id="outlined-search"
                  onChange={(e) => {
                    dispatch(
                      setValues({ name: "search", value: e.target.value })
                    );

                    // dispatch(getMeat());
                  }}
                  sx={{
                    "& .css-1o9s3wi-MuiInputBase-input-MuiOutlinedInput-input":
                      {
                        padding: "10px 60px 10px 15px",
                      },
                    "& fieldset": {
                      borderRadius: "28px",
                      boxShadow:
                        "-2.5px -2.5px 4px rgba(18, 18, 18, 0.08), 2.5px 2.5px 4px rgba(18, 18, 18, 0.08)",
                      border: "none",
                    },
                    "& fieldset::focus": {
                      color: "#ED1B24",
                    },
                    input: {
                      "&::placeholder": {
                        fontWeight: "400",
                      },
                      background: "#fff",
                      borderRadius: "28px",
                    },
                    "& .MuiOutlinedInput-root.MuiInputBase-root": {
                      background: "#fff",
                      borderRadius: "28px",
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        type="submit"
                        onClick={() => {
                          dispatch(getMeat());
                          navigate("/retail");
                          setQuery(false);
                        }}
                      >
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </form>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}
export default Navbar;
