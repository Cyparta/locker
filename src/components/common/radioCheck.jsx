import { Box } from "@mui/material";
import React from "react";

const RadioCheck = ({ id, checked }) => {
  return (
    <Box
      sx={{
        width: "22px",
        height: "22px",
        borderRadius: "50%",
        background: id === checked ? "#8F5147" : "#fff",
        boxShadow: "0px 3px 5px rgba(46, 46, 66, 0.08)",
        marginRight: "5px",
        marginBottom: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        lineHeight: "20px",
        textAlign: "center",
        position: "relative",
        border: id === checked ? "0" : "1px solid #8F5147",
        mt:"5px"
      }}
    >
      <Box
        sx={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          border: "3px solid #fff",
          position: "absolute",
          transform: "translate(-50%, -50%)",
          left: "50%",
          top: "50%",
        }}
      ></Box>
    </Box>
  );
};

export default RadioCheck;
