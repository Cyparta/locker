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
  getProfile,
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

const Profile = ({ active }) => {
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
    { label: "profile", link: "/profile", active: true },
  ];

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getCustomer());
    dispatch(getShipping());
  }, []);

  const handleChange = (e) => {
    dispatch(setValueUser(e.target));
  };

  const logOut = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    navigate("/login");
  };

  const formik = useFormik({
    initialValues: {
      new_password: "",
      current_password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object().shape({
      confirm_password: Yup.string().oneOf(
        [Yup.ref("new_password"), null],
        "Passwords must match"
      ),
    }),
    onSubmit: (values, { resetForm }) => {
      const { new_password, current_password } = values;
      dispatch(postChangePassword({ new_password, current_password }));
      resetForm({ values: "" });
    },
  });
  const menuLink = [
    { id: 1, title: "profile", icon: <PermIdentityOutlinedIcon /> },
    { id: 2, title: "Address", icon: <FmdGoodOutlinedIcon /> },
    { id: 3, title: "Order", icon: <RestoreOutlinedIcon /> },
  ];
  return (
    <>
      <PageMeta title={`Grays and Danny's `} desc="user profile" />
      <Box>
        {/* hero Title */}
        <Box mt="32px" ml="80px">
          <HeroTitle crumbs={crumbs} />
        </Box>
        {/* Account Page */}
        {/* <Box
            sx={{
              background: "rgba(235, 235, 235, 1)",
              borderRadius: "4px",
              padding: "9px 16px",
              mb: "32px",
              mt: "24px",
            }}
          >
            <Typography
              sx={{
                color: "rgba(204, 134, 72, 1)",
                fontSize: "22px",
                fontWeight: "500",
              }}
            >
              Account Profile
            </Typography>
          </Box> */}

        {/* -----
              Grid container
              -----
          */}
        <Grid container spacing={6} mb="48px" mt="48px">
          {/* col 1 */}
          <Grid item xs={12} xl={3}>
            <Box mb="10px">
              {/* <Box sx={{borderTop: "0.5px solid #121212",py:"23px"}}>
                  <button
                    className={
                      "main-btn-outline main-btn-not-active"
                    }
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
                </Box> */}
              <SideNav />
            </Box>
          </Grid>
          {/* col 2 */}
          <Grid item xs={12} xl={9}>
            <Box>
              <>
                {/* info data */}
                <ProfileCard sx={{ width: "88%" }}>
                  {/* info Box */}
                  <Stack direction="row" justifyContent="space-between">
                    <Typography
                      sx={{
                        color: "#212121",
                        fontWeight: "600",
                        fontSize: "20px",
                        mb: "24px",
                      }}
                    >
                      Account Info
                    </Typography>
                    <Box>
                      <img
                        src={EditIcon}
                        style={{ cursor: "pointer" }}
                        onClick={() => setEditAcc((oldValue) => !oldValue)}
                      />
                    </Box>
                  </Stack>

                  {/* form */}
                  <form
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      dispatch(updateCustomer({ ...customer }));
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "16px",
                        flexWrap: { xs: "wrap", md: "nowrap" },
                      }}
                    >
                      <InputControl
                        label=""
                        variant="outlined"
                        placeholder="First Name"
                        type="text"
                        id="firstName"
                        name="first_name"
                        value={customer?.first_name}
                        onChange={handleChange}
                        disabled={editAcc}
                      />
                      <InputControl
                        label=""
                        variant="outlined"
                        placeholder="last Name"
                        type="text"
                        id="lastName"
                        name="last_name"
                        value={customer?.last_name}
                        onChange={handleChange}
                        disabled={editAcc}
                      />
                    </Box>
                    {/* <Box>
                        <InputControl
                          label=""
                          variant="outlined"
                          placeholder="Address"
                          type="text"
                          id="address"
                          name="address_apartment"
                          value={customer?.address_apartment}
                          onChange={handleChange}
                          disabled={editAcc}
                        />
                      </Box> */}
                    <Box>
                      <InputControl
                        label=""
                        variant="outlined"
                        placeholder="Email Address"
                        type="text"
                        id="email"
                        name="email"
                        value={profile?.email}
                        disabled
                        onChange={handleChange}
                        sx={{ maxWidth: "49%" }}
                      />
                    </Box>
                    {/* <Box>
                        <InputControl
                          label=""
                          variant="outlined"
                          placeholder="phone"
                          type="text"
                          id="phone"
                          name="phone_number"
                          value={customer.phone_number}
                          onChange={handleChange}
                          disabled={editAcc}
                        />
                      </Box> */}

                    <Box sx={{ textAlign: "start", mt: "31px" }}>
                      <GrayButton
                        sx={{
                          width: { md: "242px" },
                          height: "48px",
                          "&:hover": {
                            background: "rgba(127, 127, 127, 1)",
                          },
                          "&.Mui-disabled": {
                            background: "rgba(127, 127, 127, 50%)",
                            color: "#fff",
                          },
                        }}
                        type="submit"
                        disabled={editAcc}
                      >
                        Save Changes
                      </GrayButton>
                    </Box>
                  </form>
                </ProfileCard>
                {/* default data */}
                <ProfileCard sx={{ width: "88%", mt: "40px" }}>
                  {/* info Box */}
                  <Stack direction="row" justifyContent="space-between">
                    <Typography
                      sx={{
                        color: "#212121",
                        fontWeight: "600",
                        fontSize: "20px",
                        mb: "24px",
                      }}
                    >
                      Default data
                    </Typography>
                    <Box>
                      <img
                        src={EditIcon}
                        style={{ cursor: "pointer" }}
                        onClick={() => setEditAcc((oldValue) => !oldValue)}
                      />
                    </Box>
                  </Stack>

                  {/* form */}
                  <form
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      dispatch(updateCustomer({ ...customer }));
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "16px",
                        flexWrap: "wrap",
                      }}
                    >
                      <InputControl
                        variant="outlined"
                        id="current_password"
                        name="current_password"
                        type={showCurrent ? "password" : "text"}
                        value={formik.values.current_password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="old password"
                        disabled={editAcc}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        sx={{ maxWidth: "49%" }}
                      />
                      <InputControl
                        label=""
                        variant="outlined"
                        type={showNewPass ? "password" : "text"}
                        id="new_password"
                        name="new_password"
                        value={formik.values.new_password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="new password"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        sx={{ maxWidth: "49%" }}
                      />
                      <InputControl
                        label=""
                        variant="outlined"
                        id="confirm_password"
                        name="confirm_password"
                        type={showConfirmPass ? "password" : "text"}
                        value={formik.values.confirm_password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="confirm password"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        sx={{ maxWidth: "49%" }}
                      />
                      {formik.touched.confirm_password &&
                      formik.errors.confirm_password ? (
                        <Typography
                          component="span"
                          sx={{ color: "red", mt: "1px", fontSize: "14px" }}
                        >
                          {formik.errors.confirm_password}
                        </Typography>
                      ) : null}

                      <InputControl
                        label=""
                        variant="outlined"
                        placeholder="phone"
                        type="text"
                        id="phone"
                        name="phone_number"
                        value={customer.phone_number}
                        onChange={handleChange}
                        disabled={editAcc}
                        sx={{ maxWidth: "49%" }}
                      />
                    </Box>

                    <Box
                      sx={{
                        textAlign: "start",
                        mt: "31px",
                        gap: "14px",
                        display: "flex",
                      }}
                    >
                      <OutlineButton
                        sx={{
                          width: { md: "242px" },
                          height: "48px",
                          "&:hover": {},
                          "&.Mui-disabled": {
                            borderColor: "rgba(127, 127, 127, 50%)",
                            color: "rgba(127, 127, 127, 50%)",
                          },
                        }}
                        type="submit"
                        disabled={editAcc}
                      >
                        Change Password
                      </OutlineButton>
                      <OutlineButton
                        sx={{
                          width: { md: "242px" },
                          height: "48px",
                          "&:hover": {
                            background: "rgba(127, 127, 127, 1)",
                          },
                          "&.Mui-disabled": {
                            borderColor: "rgba(127, 127, 127, 50%)",
                            color: "rgba(127, 127, 127, 50%)",
                          },
                        }}
                        type="submit"
                        disabled={editAcc}
                      >
                        Change phone number
                      </OutlineButton>
                    </Box>
                  </form>
                </ProfileCard>
              </>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Profile;
