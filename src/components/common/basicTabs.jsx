import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import RadioCheck from "./radioCheck";
import { setValues } from "../../store/cart/cartSlice";
import { useDispatch } from "react-redux";
import Normal from "../productDetails/normal";

export function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const [occasion, setOccasion] = React.useState("");

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({
  zebehaHalal,
  aqqeqa,
  odhiah,
  normal,
  collection,
  occassion,
}) {
  const [value, setValue] = React.useState(
    occassion == "Normal" ? 0 : occassion == "Aqiqqa" ? 1 : 2
  );
  // const {occassion  } = React.useSelector((state) => state.cart);
  console.log(collection);
  const [opt, setOpt] = React.useState(0);
  const dispatch = useDispatch();
  console.log(collection);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      dispatch(setValues("Normal")); // Normal
    } else if (newValue === 1) {
      dispatch(setValues("Aqiqqa")); // Aqiqqa
    } else {
      dispatch(setValues("Odhiah")); // Odhiah
    }
  };

  // const value = occassion == "Normal" ? 0 : occassion == "Aqiqqa" ? 1 : 2;

  // if (newValue === 0) {
  //   dispatch(setValues("Normal")); // Normal
  // } else if (newValue === 1) {
  //   dispatch(setValues("Aqiqqa")); // Aqiqqa
  // } else {
  //   dispatch(setValues("Odhiah")); // Odhiah
  // }

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          ".MuiTabs-flexContainer": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mt: "24px" }}>
          <Typography sx={{ fontSize: "20px", fontWeight: "600" }}>
            Occasion
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt:"20px" }}>
          <button
            style={{
              background: "rgba(110, 46, 2, 0.12)",
              padding: "8px 16px",
              border: "none",
              cursor: "pointer",
              borderRadius: "6px",
              fontSize: "14px",
              color: "rgba(53, 53, 53, 0.9)",
            }}
          >
            {occassion}
          </button>
        </Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{ minHeight: "30px" }}
        >
          {/* {occassion == "Normal" && (
              <>
                <Tab
                  label={
                    <button
                      style={{
                        background: "rgba(110, 46, 2, 0.12)",
                        padding: "8px 16px",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "6px",
                        fontSize: "14px",
                        color: "rgba(53, 53, 53, 0.9)",
                      }}
                    >
                      normal
                    </button>
                  }
                  {...a11yProps(0)}
                />
              </>
            )}
            {occassion == "Aqiqqa" && (
              <Tab
                label={
                  <button
                    style={{
                      background: "rgba(110, 46, 2, 0.12)",
                      padding: "8px 16px",
                      border: "none",
                      cursor: "pointer",
                      borderRadius: "6px",
                      fontSize: "14px",
                      color: "rgba(53, 53, 53, 0.9)",
                    }}
                  >
                    Aqqeqa
                  </button>
                }
                {...a11yProps(1)}
              />
            )}

            {occassion == "Odhiah" && (
              <Tab
                label={
                  <button
                    style={{
                      background: "rgba(110, 46, 2, 0.12)",
                      padding: "8px 16px",
                      border: "none",
                      cursor: "pointer",
                      borderRadius: "6px",
                      fontSize: "14px",
                      color: "rgba(53, 53, 53, 0.9)",
                    }}
                  >
                    Odhiah
                  </button>
                }
                {...a11yProps(2)}
              />
            )} */}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {normal}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {aqqeqa}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {odhiah}
      </TabPanel>
    </Box>
  );
}
