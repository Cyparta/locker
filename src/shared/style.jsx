import styled from "@emotion/styled";
import { Box, Typography, TextField, Button, OutlinedInput } from "@mui/material";

// for Main paragraph
export const P = styled(Typography)({
  fontSize: "24px",
  color: "#212121",
  fontFamily: "Poppins, sans-serif",
  fontWeight: "500",
});

/* 
 -------- 
  sign ( login in and Sign up Pages)
 -------- 
*/
// for Card Login and Sign UP
export const CardSign = styled(Box)({
  background: "#fff",
  border: "0.3px solid #121212",
  height:"608px",
  borderRadius: "20px",
  padding: "70px 20px",
  "@media (min-width: 600px)": {
    padding: "70px 60px",
  },
});
export const CardSignup = styled(Box)({
  background: "#fff",
  width:{xl:"50%",xs:"100%"},
  border: "0.3px solid #121212",
  borderRadius: "20px",
  padding: "70px 20px",
  "@media (min-width: 600px)": {
    padding: "70px 60px",
  },
});

// InputField Background is #fff
export const InputField = styled(OutlinedInput)({
  width: "100%",
  borderRadius: "12px",
  height:"45px",
  border: "1px solid #9D9D9D",
  pl:"23px",
  
  "& label.Mui-focused": {
    color: "transparent",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "red",
  },
  "& .MuiOutlinedInput-root": {
    // border:"1px solid transparent",
    // borderBottomColor: "#6E2E02",

    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused fieldset": {
     border:"none"
     
    },
  },
});

/* 
 -------- 
  cart - profile 
  input field >> background is White
 -------- 
*/
export const InputControl = styled(OutlinedInput)({
  width: "100%",
  height:"48",
  
    background: "#fff",
    border: "1px solid #9D9D9D",
    borderRadius: "12px",
    
  "& label.Mui-focused": {
    color: "transparent",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#6E2E02",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6E2E02",
    },
  },
});


/* Card */
export const ProfileCard = styled(Box)({
  background: "#fff",
  boxShadow:
    "0px 2px 10px rgba(33, 6, 2, 0.08)",
  borderRadius: "16px",
  padding: "24px 24px",
});

/* 
 -------- 
  Buttons
 -------- 
*/
export const MainButton = styled(Button)({
  background: "#9B1D08",
  color: "#fff",
  width: "80%",
  borderRadius: "10px",
  padding: "12px 0",
  textTransform: "capitalize",
  fontSize: "16px",
  fontWeight: "400",
  letterSpacing: "-0.24px",
  ":hover":{
    background:"#9B1D08"
  }
});

export const GrayButton = styled(Button)({
  background: "rgba(127, 127, 127, 1)",
  color: "#fff",
  width: { md: "242px" },
  height: "48px",
  border: "none",
  fontSize: "16px",
  fontWeight: "400",
  padding: "10px 0",
  borderRadius: "14px",
  cursor: "pointer",
  textTransform: "capitalize",

});
export const OutlineButton = styled(Button)({
  color: "#9B1D08",
  border: "2px solid #9B1D08",
  width: { md: "242px" },
  height: "48px",
  fontSize: "16px",
  fontWeight: "400",
  padding: "10px 0",
  borderRadius: "14px",
  cursor: "pointer",
  textTransform: "capitalize",

});


export const Span = styled(Typography)({
  background: "#F5F5F5",
  borderRadius: "6px",
  color: "#000",
  display: "inline-block",
  padding: "0px",
  width: "32px",
  height: "32px",
  textAlign: "center",
  cursor: "pointer",
  lineHeight: "32px",
  "&:hover": {
    background: "#CC8648",
    color:"#fff"
  },
});
