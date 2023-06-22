import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import HeroTitle from "../../components/layout/heroTitle";
import { GrayButton, InputControl, OutlineButton } from "../../shared/style";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomer,

  postChangePassword,
  setValueUser,
  updateCustomer,
} from "../../store/profile/profileSlice";
import * as Yup from "yup";
import PageMeta from "../../components/layout/PageMeta";
import { setUser } from "../../store/user/userSlice";
import { useEffect } from "react";
import {
  deleteShipping,
  getShipping,
} from "../../store/shipping/shippingSlice";

import { ProfileCard } from "../../shared/style";
import InputShowPassword from "../../components/common/inputShowPassword";
import AddressSection from "../../components/profile/addressSection";
import EditIcon from "../../assets/icons/editIcon.png";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AddressSave from "../../components/profile/addressSave";
import SideNav from "../../components/profile/sideNav";
const inputData = [
  { placeholder: "last Name", type: "text", id: "lastName", name: "last_name" },
];

const Address = ({ active }) => {
  // edit Account
  const [editAcc, setEditAcc] = useState(true);
  // inputs for password
  const [showCurrent, setShowCurrent] = useState(true);
  const [showNewPass, setShowNewPass] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(true);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // Account Info
  const [activeCard, setActiveCard] = useState(1);
  const { profile, customer } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const crumbs = [
    { label: "Home", link: "/", active: false },
    { label: "profile", link: "/profile", active: false },
    { label: "Address", link: "/profile/address", active: true },
  ];

  useEffect(() => {
    dispatch(getShipping());
  }, []);

  return (
    <>
      <PageMeta title={`Grays and Danny's `} desc="user profile" />
      <Box>
        {/* hero Title */}
        <Box mt="32px" sx={{ ml: { xs: "20px", sm: "80px" } }}>
          <HeroTitle crumbs={crumbs} />
        </Box>

        {/* -----
              Grid container
            -----
          */}
        <Grid container spacing={6} mb="48px" sx={{mt: {xs: "1px", sm: "40px"}}}>
          {/* col 1 */}
          <Grid item xs={12} sm={4} md={3}>
            <Box mb="10px">
              <SideNav />
            </Box>
          </Grid>
          {/* col 2 */}
          <Grid item xs={12} sm={8} md={9}>
            <Box>
              <AddressSection
                activeCard={activeCard}
                setActiveCard={setActiveCard}
              />
              {activeCard === 4 && (
                <ProfileCard sx={{ mb: "24px", width: "88%", mx: { xs: "auto", sm: 0 } }}>
                  <AddressSave
                    activeCard={activeCard}
                    setActiveCard={setActiveCard}
                  />
                </ProfileCard>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Address;
