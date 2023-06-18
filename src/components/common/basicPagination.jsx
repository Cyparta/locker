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
        mb: "50px",
        "& .MuiPaginationItem-root": { color: "red" },
        "& .Mui-selected": {
          borderBottom: "1px solid #000",
        },
        "& .MuiPaginationItem-outlined": {
          color: "#000",
          border: "none",
        },
        "& .MuiPaginationItem-previousNext": {
          background: "#EBEBEB",
          color: "#6E2E02",
          borderRadius: "8px",
        },
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
