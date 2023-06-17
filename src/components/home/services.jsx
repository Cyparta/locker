//---- Mui
import { Grid, Box, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
//----Photo
import ham2 from "../assets/home/ham.gif";
import grass2 from "../assets/home/grass.gif";
import Heading from "./heading";

//---- Item
const Item = styled(Paper)(({ theme }) => ({
  background: "#FFFFFF",
  boxShadow:
    "-2.5px -2.5px 5px rgba(179, 179, 179, 0.08), 2.5px 2.5px 8px rgba(53, 53, 53, 0.2)",
  paddingBlock: "32px",
  borderRadius: "24px",
}));

const Services = () => {
  return (
    <Box className="spad" id="servies">
      <Heading title="Services" />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Item>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography>
                <img src={grass2} alt="grass icon" width="139px" />
              </Typography>
              <Typography
                variant="h3"
                component="h3"
                sx={{ mt: "3px", mb: "16px" }}
              >
                Ground Grass Fed Beef
              </Typography>
              <ul className="ul-services">
                <li>USDA Certified</li>
                <li>Locally Grown</li>
                <li>Locally Processed</li>
                <li>Always Fresh</li>
              </ul>
            </Box>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Item>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography>
                <img src={ham2} alt="grass icon" width="139px" />
              </Typography>
              <Typography
                variant="h3"
                component="h3"
                sx={{ mt: "3px", mb: "16px" }}
              >
                Stew Meat
              </Typography>
              <ul className="ul-services">
                <li>USDA Certified</li>
                <li>Locally Grown</li>
                <li>Locally Processed</li>
                <li>Always Fresh</li>
              </ul>
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Services;
