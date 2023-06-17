import { Container, Box, Typography, InputLabel, Button, InputAdornment, IconButton, OutlinedInput } from "@mui/material";
import HeroTitle from "../../components/layout/heroTitle";
import Checkbox from "@mui/material/Checkbox";

import { CardSign, InputField } from "../../shared/style";
import { useFormik } from "formik";
import * as Yup from "yup";
import { postLogin, setChecked } from "../../store/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PageMeta from "../../components/layout/PageMeta";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
// import { BASEURL } from "../../data/API";

const Login = () => {
  const token = localStorage.getItem("token");
  const checked = useSelector((state) => state.user.checked);
  const [showPassword, setShowPassword] = useState(false);
  const { user, errMsg, loading } = useSelector((state) => state.user);
  //----- checkBox
  // const [checked, setChecked] = useState(true);

  //---- dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const crumbs = [
    { label: "Home", link: "/", active: false },
    { label: "account", link: "/login", active: true },
  ];
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  //---- useFormik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Please enter a vaild email"),
    }),
    onSubmit: (values) => {
      const { email, password } = values;
      dispatch(postLogin({ email, password }));
      if (user.length > 0) {
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    },
  });

  // change checkbox state
  const handleChange = (event) => {
    dispatch(setChecked(event.target.checked));
  };

  useEffect(() => {
    if (user?.length > 0) {
      setTimeout(() => {
        navigate("/home");
      }, 100);
    }
  });

 
  return (
    <>
      <PageMeta
        title="login - Grays and Danny's"
        desc="Welcome to the login page of Grays and Danny's Login to your account to access your order history, saved items, and other account information"
      />
      <Container>
        {/* hero title */}
        <Box mt="30px">
          <HeroTitle crumbs={crumbs} />
        </Box>
        {/* login card  */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: "30px",
            mb: "30px",
          }}
        >
          {/* card */}
          <CardSign sx={{width:{xl:"48%",lg:"48%",sm:"100%",xs:"100%"}}}>
            <Typography sx={{ fontWeight: "400", color: "#11111191",mb:"10px" }}>
              Welcome back !!!
            </Typography>
            <Typography
              sx={{ fontWeight: "600", fontSize: "56px", mb: "30px" }}
            >
              Login
            </Typography>

            {/* form  */}
            <form onSubmit={formik.handleSubmit}>
              <Box mb="24px">
                <InputLabel
                  sx={{ fontWeight: "300", color: "#212121", mb: "7px" }}
                >
                  Email Address
                </InputLabel>
                <InputField
                  placeholder="enter your Email"
                  variant="outlined"
                  id="email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <Typography
                    component="span"
                    sx={{ color: "red", mt: "1px", fontSize: "14px" }}
                  >
                    {formik.errors.email}
                  </Typography>
                ) : null}
              </Box>
              <Box sx={{mb:"9px"}}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                >
                  <InputLabel
                    sx={{ fontWeight: 400, color: "#121212", mb: "7px",lineHeight:"19.5px" }}
                  >
                    Password
                  </InputLabel>
                  <Link to="/forgotPassword">
                    <Typography
                      sx={{
                        fontWeight: "400",
                        color: "#11111191",
                        fontSize: "14px",
                      }}
                    >
                      Forgot Password ?
                    </Typography>
                  </Link>
                </Box>
                <InputField
                  label=""
                  placeholder="enter your Password"
                  variant="outlined"
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {formik.touched.password && formik.errors.password ? (
                  <Typography
                    component="span"
                    sx={{ color: "red", mt: "1px", fontSize: "14px" }}
                  >
                    {formik.errors.password}
                  </Typography>
                ) : null}
                {errMsg && (
                  <Typography
                    component="span"
                    sx={{ color: "red", mt: "1px", fontSize: "14px" }}
                  >
                    email or password is wrong
                  </Typography>
                )}
              </Box>
              <Box mb="12px">
                <Checkbox
                  checked={checked}
                  checkedIcon={<CheckBoxOutlinedIcon sx={{color:"#9B1D08"}} />}
                  // indeterminateIcon={	<CheckSharpIcon />}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                  sx={{
                    color: "#9B1D08",
                    "&.Mui-checked": {
                      color: "#9B1D08",
                    },
                  }}
                />
                <Typography
                  component="span"
                  sx={{ color: "#212121", fontSize: "14px", fontWeight: "500" }}
                >
                  Rembemer me
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "start", mt: "21px" }}
              >
                <Button
                  type="submit"
                  sx={{
                    background:
                      "#9B1D08",
                    color: "#fff",
                    width: "60%",
                    borderRadius: "14px",
                    padding: "10px 0",
                    textTransform: "capitalize",
                    fontSize: "16px",
                    fontWeight: "400",
                    letterSpacing: "-0.24px",
                    ":hover":{
                      background:
                      "#9B1D08",
                    }
                  }}
                >
                  {loading ? 'loading...': 'Login'}
                </Button>
              </Box>
              <Typography
                sx={{
                  textAlign: "start",
                  mt: "20px",
                  fontWeight: "400",
                  color: "#00000033",
                }}
                component="p"
              >
                Don’t have an account ?
                <Link to="/register">
                  <Typography component="span" sx={{ color: "#6E2E02" }}>
                    {" "}
                    Sign up
                  </Typography>
                </Link>
              </Typography>
            </form>
          </CardSign>
        </Box>
      </Container>
    </>
  );
};

export default Login;
