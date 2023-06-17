import { Box } from "@mui/material";
import React from "react";
import { InputControl } from "../../shared/style";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

const InputShowPassword = ({ val, handleChange, onBlur, placeholder, id }) => {
  const [showCurrent, setShowCurrent] = useState(false);
  return (
    <Box mb="20px" mt="24px">
      <Box sx={{ position: "relative" }}>
        <InputControl
          label=""
          placeholder={placeholder}
          variant="outlined"
          id={id}
          name={id}
          type={showCurrent ? "text" : "password"}
          value={val}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <VisibilityOffIcon
          sx={{
            position: "absolute",
            top: "50%",
            right: "20px",
            transform: "translateY(-50%)",
            fontSize: "15px",
            cursor: "pointer",
          }}
          onClick={() => setShowCurrent((oldValue) => !oldValue)}
        />
      </Box>
    </Box>
  );
};

export default InputShowPassword;
