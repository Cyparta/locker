import { Box, Typography } from "@mui/material";
const Heading = ({ title, sx }) => {
  return (
    <Box sx={{ width: "100%", textAlign: "center", fontWeight: 700 }}>
      <Typography
        sx={{
          fontSize: "32px",
          color: "#212121",
          mb: "33px",
          fontWeight: "700",
          ...sx
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default Heading;
