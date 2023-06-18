import React  from "react";
import { Box, Container, Typography } from "@mui/material";

import RadioCheck from "../../components/common/radioCheck";
import { MainButton } from "../../shared/style";
import { useDispatch, useSelector } from "react-redux";
import { setChooseOpt } from "../../store/cart/cartSlice";

const Odhiah = ({handleAddToCart}) => {
  // const [opt, setOpt] = useState(0);
  const {choose_option} = useSelector(state => state.cart);

  const dispatch = useDispatch()

  return (
    <Box>
      <Container>
        {/* option Selcection */}
        <Box mt="24px" sx={{ padding: "20px" }}>
          <Typography sx={{ fontSize: "20px", fontWeight: "500" }}>
            Choose option
          </Typography>
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => {
              dispatch(setChooseOpt(1))
            }}
          >
            <Box sx={{ flex: { xs: 0, sm: 0 } }}>
              <RadioCheck id={1} checked={choose_option} />
            </Box>
            <Typography component="p" variant="p" sx={{ marginLeft: "8px" }}>
              Buy and slaughter your livestock?
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => {
              dispatch(setChooseOpt(2))

            }}
          >
            <Box sx={{ flex: { xs: 0, sm: 0 } }}>
              <RadioCheck id={2} checked={choose_option} />
            </Box>
            <Typography component="p" variant="p" sx={{ marginLeft: "8px" }}>
              Witness the slaughter of your Qurbani/Odhia
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => {
              dispatch(setChooseOpt(3))

            }}
          >
            <Box sx={{ flex: { xs: 0, sm: 0 } }}>
              <RadioCheck id={3} checked={choose_option} />
            </Box>
            <Typography component="p" variant="p" sx={{ marginLeft: "8px" }}>
              Not interested to attend the slaughtering ; I just need to pick up
              the meat after.
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => {
              dispatch(setChooseOpt(4))
            }}
          >
            <Box sx={{ flex: { xs: 0, sm: 0 } }}>
              <RadioCheck id={4} checked={choose_option} />
            </Box>
            <Typography component="p" variant="p" sx={{ marginLeft: "8px" }}>
              Special request to be said/done at the slaughter time.
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: "32px",
            mb: "48px",
          }}
        >
          <MainButton sx={{ width: { xs: "100%", sm: "311px" } }} onClick={handleAddToCart}>
            Next
          </MainButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Odhiah;
