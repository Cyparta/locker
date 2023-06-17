import { Box, Typography } from "@mui/material";
import React from "react";
import RadioCheck from "../common/radioCheck";
import { MainButton } from "../../shared/style";
import { useDispatch, useSelector } from "react-redux";
import { setError, setSlaying } from "../../store/cart/cartSlice";

const Normal = ({ handleAddToCart }) => {
  const [opt, setOpt] = React.useState(0);
  const { slaying } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <>
      <Typography sx={{ fontSize: "14px", mb: "19px" }}>
        Do you want to slay it on your own responsibility or leave it to the
        butcher, If you need to slay it by yourself you need to agree the{" "}
        <span
          style={{
            color: "rgba(110, 46, 2, 1)",
            borderBottom: "1px solid rgba(110, 46, 2, 1)",
          }}
        >
          policy
        </span>{" "}
        first
      </Typography>

      <Box
        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={() => {
          setOpt(2);
          dispatch(setSlaying("On My own responsibility"));
        }}
      >
        <Box sx={{ flex: { xs: 0, sm: 0 } }}>
          <RadioCheck id={"On My own responsibility"} checked={slaying} />
        </Box>
        <Typography component="p" variant="p" sx={{ marginLeft: "8px" }}>
          Buy and slaughter your livestock
        </Typography>
      </Box>
      <Box
        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={() => {
          setOpt(1);
          dispatch(setSlaying("Leave it to butcher"));
        }}
      >
        <Box sx={{ flex: { xs: 0, sm: 0 } }}>
          <RadioCheck id={"Leave it to butcher"} checked={slaying} />
        </Box>
        <Typography component="p" variant="p" sx={{ marginLeft: "8px" }}>
          leave it to the butcher
        </Typography>
      </Box>
      <Box mt="40px" sx={{ textAlign: "center" }}>
        <MainButton
          sx={{ width: { xs: "100%", sm: "311px" } }}
          onClick={() => {
            handleAddToCart();
          }}
        >
          Next
        </MainButton>
      </Box>
    </>
  );
};

export default Normal;
