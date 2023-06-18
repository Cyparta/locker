import { Box } from "@mui/material";
import React from "react";
import Pagination from "@mui/material/Pagination";
import { useDispatch } from "react-redux";
import { getMeat, setValues } from "../../store/shop/shopSlice";

const BasicPagination = ({allProducts, data}) => {
  const dispatch = useDispatch({allProducts, data});
  
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height:"37.84px",
        mb: "50px",
        "& .MuiPaginationItem-root": { color: "red" },
        "& .Mui-selected": {
          borderBottom: "1px solid #000",
        },
        "& .MuiPaginationItem-outlined": {
          color: "#000",
          border: "none",
          width:" 40.09px",
          height:"37.84px",
        },
        "& .MuiPaginationItem-previousNext": {
          background: "#EBEBEB",
          color: "#121212",
          borderRadius: "8px",
          width:" 40.09px",
          padding:"10px, 10px, 8px, 10px"
        },
        ".Mui-selected":{
          backgroundColor:"#5F5F5F",
          color:"#FFF",
          borderRadius: "8px",
          ":hover":{
            backgroundColor:"#5F5F5F",
          }
         
        }
      }}
    >
      <Pagination
        count={Math.ceil(allProducts.count / parseInt(data.limit))}
        variant="outlined"
        onChange={(e, page) => {
          dispatch(setValues({ name: "page", value: page }));
          dispatch(getMeat());
        }}
      />
    </Box>
  );
};

export default BasicPagination;
