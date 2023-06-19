import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

const ProductDetails = ({items}) => {
  return (
    <div>
        <Box sx={{ background: "#F9FAFB", padding: "12px", mt: "50px",borderBottom: "0.1px solid #353535 "}}>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#9B1D08",
                // borderBottom: "3px solid",

              "border-image-source":" linearRadient(114.83deg, #6E2E02 -19.62%, #CC8648 100%)"


              }}
            >
              Description
            </Typography>
          </Box>
          <Box sx={{ paddingRight: { sm: "50px" } }}>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 500,
                lineHeight:"19.5px",
                letterSpacing:"-0.41 px",
                mt: "32px",
                mb: "80px",
              }}
            >
              {items.description}
            </Typography>
           
            {/* <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
              {items.packaging_details}{" "}
            </Typography> */}
            {/* <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "500",
                mt: "24px",
                mb: "16px",
              }}
            >
              Essential details
            </Typography>
            <Box>
              <Box
                sx={{
                  width: "100%",
                  fontSize: "16px",
                  background: "#FFF6F4",
                  fontWeight: "400",
                  padding: "13px 0px 13px 30px",
                }}
              >
                <Stack direction={{ xs: "column", sm: "row" }}>
                  <Box sx={{ display: "flex", maxWidth: "50%", flex: "50%" }}>
                    <Typography sx={{ width: "100px" }}>
                      Shelf Life :{" "}
                    </Typography>
                    {items.shelf_life}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      maxWidth: "50%",
                      flex: "50%",
                    }}
                  >
                    <Typography sx={{ width: "100px" }}>Instruction for use  : </Typography>
                    {items.instruction_for_use}
                  </Box>
                </Stack>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  fontSize: "16px",
                  fontWeight: "400",
                  padding: "13px 0px 13px 30px",
                }}
              >
                <Stack direction={{ xs: "column", sm: "row" }}>
                  <Box sx={{ display: "flex", maxWidth: "50%", flex: "50%" }}>
                    <Typography sx={{ width: "100px" }}>Address : </Typography>
                    {items.address}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      maxWidth: "50%",
                      flex: "50%",
                    }}
                  >
                    <Typography sx={{ width: "100px" }}>
                      Place of origin : {" "}
                    </Typography>
                    {items.place_of_origin}
                  </Box>
                </Stack>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  fontSize: "16px",
                  fontWeight: "400",
                  background: "#FFF6F4",
                  padding: "13px 0px 13px 30px",
                }}
              >
                <Stack direction={{ xs: "column", sm: "row" }}>
                  <Box sx={{ display: "flex", maxWidth: "50%", flex: "50%" }}>
                    <Typography sx={{ width: "100px" }}>storage type : {" "} </Typography>
                    {items.storage_type}
                  </Box>
                </Stack>
              </Box>
            </Box> */}
          </Box>
    </div>
  )
}

export default ProductDetails