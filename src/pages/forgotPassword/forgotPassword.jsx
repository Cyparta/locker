import { Container, Box, Typography, InputLabel, Button } from "@mui/material";
import HeroTitle from "../../components/layout/heroTitle";
import Checkbox from "@mui/material/Checkbox";

import { CardSign, InputField } from "../../shared/style";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  postLogin,
  resetPassword,
  setChecked,
} from "../../store/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
const ForgotPassword = () => {
  const checked = useSelector((state) => state.user.checked);
  const userToken = useSelector((state) => state.user.user);
  const checkEmail = useSelector((state) => state.user.checkEmail);

  const crumbs = [
    { label: "Home", link: "/", active: false },
    { label: "forget password", link: "/forgotPassword", active: true },
  ];

  //---- dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      password: Yup.string()
        .required("Please enter password")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    }),
    onSubmit: (values, { resetForm }) => {
      const { email, password } = values;
      dispatch(postLogin({ email, password }));
      resetForm({ values: "" });
      navigate("/shop");
    },
  });

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ email: formik.values.email }));
  };

  return (
    <Container>
      {/* hero title */}
      <Box mt="32px">
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
        }}
      >
        {/* card */}
        <CardSign>
          {/* <Typography sx={{ fontWeight: "400", color: "#11111191" }}>
            Welcome back !!!
          </Typography> */}
          <Typography sx={{ fontWeight: "600", fontSize: "56px", mb: "30px" }}>
            Forgot Password
          </Typography>
          <form onSubmit={handleEmailSubmit}>
            <>
              <Box mb="20px">
                <InputLabel
                  sx={{ fontWeight: "300", color: "#212121", mb: "7px" }}
                >
                  Email Address
                </InputLabel>
                <InputField
                  label=""
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
              <Box sx={{display:"flex", justifyContent:"center"}}>
                <Button
                  type="submit"
                  sx={{
                    background:
                      "linear-gradient(114.83deg, #6E2E02 -19.62%, #CC8648 100%)",
                    color: "#fff",
                    width: "80%",
                    borderRadius: "10px",
                    padding: "12px 0",
                    textTransform: "capitalize",
                    fontSize: "16px",
                    fontWeight: "400",
                    letterSpacing: "-0.24px",
                  }}
                >
                  submit
                </Button>
              </Box>
              <Typography
                sx={{
                  textAlign: "center",
                  mt: "24px",
                  fontWeight: "400",
                  color: "#00000033",
                }}
                component="p"
              >
                Remember your password ?
                <Link to="/login">
                  <Typography component="span" sx={{ color: "#6E2E02" }}>
                    {" "}
                    login
                  </Typography>
                </Link>
              </Typography>
            </>
          </form>
        </CardSign>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
