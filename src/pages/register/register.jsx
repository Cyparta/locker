import { Container, Box, Typography, InputLabel, Button, InputAdornment, IconButton } from "@mui/material";
import HeroTitle from "../../components/layout/heroTitle";

import { CardSign, CardSignup, InputField } from "../../shared/style";

import { useFormik } from "formik";
import * as Yup from "yup";
import { postRegister } from "../../store/register/registerSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PageMeta from "../../components/layout/PageMeta";
import { useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const Register = () => {
  const { user, errorMsg, loading } = useSelector((state) => state.register);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // const [formattedNumber, setFormattedNumber] = useState('');
  const [phoneReg, setPhoneReg] = useState('')
  const phoneRegExp =
  /^(1\s?)?(\d{3}|\(\d{3}\))[\s\-]?\d{3}[\s\-]?\d{4}$/;

  function formatPhoneNumber(phoneNumber) {
    // Remove non-numeric characters
    const cleanedNumber = phoneNumber.replace(/\D/g, "");
    
    if (cleanedNumber.length > 10) {
      return 'Invalid phone number';
    }

    // Split the number into parts
    const areaCode = cleanedNumber.substring(0, 3);
    const prefix = cleanedNumber.substring(3, 6);
    const lineNumber = cleanedNumber.substring(6);
  
    // Format the number
    const formattedNumber = `(${areaCode}) ${prefix}-${lineNumber}`;
    return formattedNumber;
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      phone: "",
      password2: "",
      username: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Please enter a vaild email"),
      phone: Yup.string().matches(
        phoneRegExp,
        "Phone number is not valid"
      ),
      password: Yup.string()
        .required("Please enter password")
        .min(
          8,
          "Password is too short - should be 8 chars minimum. and at least one letter"
        )
        .matches(/[a-zA-Z]/, "Password must contain at least one letter "),
      password2: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
    }),
    onSubmit: (values, { resetForm }) => {
      const { email, password, password2, username, phone } = values;
      dispatch(
        postRegister({ email, password, password2, username, phone })
      ).then((result) => {
        if (result.type === "postRegister/fulfilled") {
          setTimeout(() => {
            navigate("/login");
          }, 500);
        }
      });
    },
  });

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setPhoneNumber(inputValue);
    formik.setFieldValue('phone', inputValue);
  };

  // const formattedNumber = formatPhoneNumber(phoneNumber);
  const formattedNumber = formatPhoneNumber(formik.values.phone);


  const crumbs = [
    { label: "Home", link: "/", active: false },
    { label: "register", link: "/register", active: true },
  ];

  return (
    <>
      <PageMeta
        title="Register - Papineau Locker`s"
        desc="Welcome to the Register page of GPapineau Locker`s Register to your account to access your order history, saved items, and other account information"
      />
      <Container >
        {/* hero title */}
        <Box mt="32px">
          <HeroTitle title="Account" crumbs={crumbs} />
        </Box>
        {/* login card  */}
        <Box
          sx={{
            
           width:{xl:"50%",lg:"50%",md:"50%",sm:"70%",xs:"100%"},
           mx:"auto",
            mt:"30px",
            mb:"30px"
           
          }}
        >
          {/* card */}
          <CardSignup >
            <Typography sx={{ fontWeight: "400", color: "#11111191" }}>
              Welcome !!!
            </Typography>
            <Typography
              sx={{ fontWeight: "600", fontSize: "56px", mb: "30px" }}
            >
              Sign up
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Box mb="20px">
                <InputLabel
                  sx={{ fontWeight: "300", color: "#121212", mb: "7px" ,fontSize:"16px",lineHeight:"19.5px"}}
                >
                  Email Address
                </InputLabel>
                <InputField
                  name="email"
                  type="email"
                  id="email"
                  label=""
                  placeholder="enter your Email address"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <Typography
                    component="span"
                    sx={{ color: "red", mt: "1px", fontSize: "14px" }}
                  >
                    {formik.errors.email}
                  </Typography>
                ) : null}
                {errorMsg?.email && (
                  <Typography
                    component="span"
                    sx={{ color: "red", mt: "1px", fontSize: "14px" }}
                  >
                    {errorMsg?.email[0]}
                  </Typography>
                )}
              </Box>
              <Box mb="20px">
                <InputLabel
                  sx={{ fontWeight: "300", color: "#212121", mb: "7px" }}
                >
                  Username
                </InputLabel>
                <InputField
                  name="username"
                  type="text"
                  id="username"
                  label=""
                  placeholder="enter your Username"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username ? (
                  <Typography
                    component="span"
                    sx={{ color: "red", mt: "1px", fontSize: "14px" }}
                  >
                    {formik.errors.username}
                  </Typography>
                ) : null}
                {errorMsg?.username && (
                  <Typography
                    component="span"
                    sx={{ color: "red", mt: "1px", fontSize: "14px" }}
                  >
                    {errorMsg?.username[0]}
                  </Typography>
                )}
              </Box>
              <Box mb="20px" sx={{position:"relative"}}>
                <InputLabel
                  sx={{ fontWeight: "300", color: "#212121", mb: "7px" }}
                >
                  Phone Number
                </InputLabel>
                <InputField
                  name="phone"
                  type="number"
                  id="phone"
                  label=""
                  placeholder="ex. 2358454848"
                  variant="outlined"
                  sx={{"input": {
                    paddingLeft:"50px",
                  } }}
                  onChange={(e) => {  
                    formik.setFieldValue('phone', e.target.value)
                    handleInputChange(e)
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
                <p style={{position:"absolute", top:"45px", left:"0", margin:"0 15px", color:"rgba(144, 144, 144, 1)"}}>
                  +1 
                  <span style={{width:"1px", height:"25px", display:"inline-block" ,background:"rgba(33, 33, 33, 1)", position:"absolute", margin:"0 10px"}}></span>
                </p>
                {formik.touched.phone && formik.errors.phone ? (
                  <Typography
                    component="span"
                    sx={{ color: "red", mt: "1px", fontSize: "14px" }}
                  >
                    {formik.errors.phone}
                  </Typography>
                ) : null}
                {/* <p>Formatted phone number: {formattedNumber}</p> */}
                {errorMsg?.phone && (
                  <Typography
                    component="span"
                    sx={{ color: "red", mt: "1px", fontSize: "14px" }}
                  >
                    {errorMsg?.phone[0]}
                  </Typography>
                )}
              </Box>
              <Box mb="20px">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                >
                  <InputLabel
                    sx={{ fontWeight: "300", color: "#212121", mb: "7px" }}
                  >
                    Password
                  </InputLabel>
                </Box>
                <InputField
                  id="password"
                  label=""
                  variant="outlined"
                  name="password"
                  placeholder="enter your Password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
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
              </Box>

              <Box>
                <InputLabel
                  sx={{ fontWeight: "300", color: "#212121", mb: "7px" }}
                >
                  Confirm Password
                </InputLabel>
                <InputField
                  id="password2"
                  label=""
                  variant="outlined"
                  name="password2"
                  placeholder="renter your Password"
                  onChange={formik.handleChange}
                  value={formik.values.password2}
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
                {formik.touched.password2 && formik.errors.password2 ? (
                  <Typography
                    component="span"
                    sx={{ color: "red", mt: "1px", fontSize: "14px" }}
                  >
                    {formik.errors.password2}
                  </Typography>
                ) : null}
              </Box>

              <Box
                sx={{ display: "flex", justifyContent: "start", mt: "32px" }}
              >
                <Button
                  sx={{
                    background:
                      "#9B1D08",
                    color: "#fff",
                    width: "60%",
                    borderRadius: "14px",
                    padding: "12px 0",
                    textTransform: "capitalize",
                    fontSize: "16px",
                    fontWeight: 500,
                    letterSpacing: "-0.24px",
                    ":hover":{
                      background:
                      "#9B1D08",
                    }
                  }}
                  disabled={loading}
                  type="submit"
                >
                  {loading ? "loading...": "Sign Up"}
                  
                </Button>
              </Box>
              <Typography
                sx={{
                  textAlign: "start",
                  mt: "24px",
                  fontWeight: "400",
                  color: "#00000033",
                }}
                component="p"
              >
                Already have an account ?
                <Link to="/login">
                  <Typography component="span" sx={{ color: "#6E2E02" }}>
                    {" "}
                    Login
                  </Typography>
                </Link>
              </Typography>
            </form>
          </CardSignup>
        </Box>
      </Container>
    </>
  );
};

export default Register;
