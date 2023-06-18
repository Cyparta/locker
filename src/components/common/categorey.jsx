import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

import RadioCheck from "./radioCheck";

// import Pagination from "@mui/material/Pagination";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { getMeat, setValues } from "../../store/shop/shopSlice";
import { useDispatch } from "react-redux";

const Categorey = ({collection, cate, type, name}) => {
  const dispatch = useDispatch();
  const [isExpand, setIsExpand] = useState(true);

  const toggleExpand = () => {
    setIsExpand(!isExpand);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            color: "#212121",
            fontSize: "16px",
            fontWeight: "700",
            mb: "7px",
          }}
        >
         {name}
        </Typography>
        {isExpand ? (
          <KeyboardArrowDownIcon
            onClick={toggleExpand}
            sx={{ cursor: "pointer" }}
          />
        ) : (
          <KeyboardArrowRightIcon
            onClick={toggleExpand}
            sx={{ cursor: "pointer" }}
          />
        )}
      </Box>
      <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
        {isExpand && (
          <>
            <FormControl sx={{ paddingLeft: "12px" }}>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
              >
                {collection?.map((col, index) => (
                  <FormControlLabel
                    key={col.id}
                    value={col.id}
                    control={<RadioCheck id={col.id} checked={cate} />}
                    label={col.name}
                    onClick={(e) => {
                      dispatch(
                        setValues({
                          name: type,
                          value: col.id,
                        })
                      );
                      dispatch(getMeat());
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </>
        )}
      </ul>
    </>
  );
};

export default Categorey;
