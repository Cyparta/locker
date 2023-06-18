import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomer,
  getProfile,
  setValueUser,
} from "../../store/profile/profileSlice";
import { setUser } from "../../store/user/userSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';
const SideNav = () => {
  // Account Info
  const [activeCard, setActiveCard] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(location.pathname);

  const logOut = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    navigate("/login");
  };

  const sideProfileNav = [
    { id:1, title: "Profile", to: "/profile", icon:<PermIdentityOutlinedIcon/> },
    { id:2, title: "addresses", to: "/profile/address", icon:<PermIdentityOutlinedIcon/> },
    { id:3, title: "order", to: "/profile/order", icon: <RestoreOutlinedIcon/>},
  ];

  return (
    <Box mb="10px">
      {/* {sideProfileNav.map((item, index) => {
        return (
          <Box>
            <Link to={item.to}>
              <button
                className={
                    location.pathname === item.to
                    ? "main-btn-outline"
                    : "main-btn-outline main-btn-not-active"
                }
                style={{
                  marginBottom: "20px",
                  cursor: "pointer",
                  borderRadius: "10px",
                  textAlign: "left",
                }}
              >
                {item.title}
              </button>
            </Link>
          </Box>

          
        );
      })} */}

      <Box mb="10px">
        {sideProfileNav.map((item, index) => {
          return (
            <Box>
              <Link to={item.to}>
              <button
                className={
                    location.pathname === item.to
                    ? "main-btn-outline"
                    : "main-btn-outline main-btn-not-active"
                }
                style={{
                  marginBottom: "20px",
                  cursor: "pointer",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => setActiveCard(index + 1)}
              >
                <Typography sx={{ mr: "15px", fontSize: "1.5rem" }}>
                  {item.icon}
                </Typography>
                <Typography fontSize={"1rem"}>{item.title}</Typography>
              </button>
              </Link>
            </Box>
          );
        })}
        <Box sx={{ borderTop: "0.5px solid #121212", py: "23px" }}>
          <button
            className={"main-btn-outline main-btn-not-active"}
            style={{
              cursor: "pointer",
              borderRadius: "10px",
              color: "#000 !important",
              textAlign: "center",
            }}
            onClick={logOut}
          >
            Log Out
          </button>
        </Box>
      </Box>

    </Box>
  );
};

export default SideNav;
