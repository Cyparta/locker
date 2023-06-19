import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import { GrayButton, InputControl } from "../../shared/style";
import RadioCheck from "../common/radioCheck";
import { useDispatch, useSelector } from "react-redux";
import {
  clearForm,
  getShipping,
  postShipping,
  setChecked,
  setCheckedSavedAdress,
  setErrorMsg,
  setRetail,
  updateForm,
  postForm
} from "../../store/shipping/shippingSlice";
import { countries } from "../../data/country";
import { useNavigate } from "react-router-dom";

const AddressPost = ({
  onSubmit,
  checked,
  open,
  setAddAds,
  activeCard,
  setActiveCard,
  handleClose,
}) => {
  const { name, company_name, address, phone_number } = useSelector(
    (state) => state?.shipping?.shipping
  );

  const { errorMsg, allShipping, checkedSavedAdress, retail } = useSelector(
    (state) => state.shipping
  );

  const { items } = useSelector((state) => state.cart);

  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const valditionForm = () => {
    let test = true;
    if (phone_number == null) {
      dispatch(
        setErrorMsg({ name: "phone_number", value: "this is field is requird" })
      );
      test = false;
    } else {
      dispatch(setErrorMsg({ name: "phone_number", value: "" }));
    }

    if (address == "") {
      dispatch(
        setErrorMsg({ name: "address", value: "this is field is requird" })
      );
      test = false;
    } else {
      dispatch(setErrorMsg({ name: "address", value: "" }));
    }

    // if (postal_code == "") {
    //   dispatch(
    //     setErrorMsg({ name: "postal_code", value: "this is field is requird" })
    //   );
    //   test = false;
    // } else {
    //   dispatch(setErrorMsg({ name: "postal_code", value: "" }));
    // }

    // if (city == "") {
    //   dispatch(
    //     setErrorMsg({ name: "city", value: "this is field is requird" })
    //   );
    //   test = false;
    // } else {
    //   dispatch(setErrorMsg({ name: "city", value: "" }));
    // }
    return test;
  };
  // Change Forms inputs And update Form
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(postForm({ name, value }));
  };
  const handlePostShipping = (e) => {
    e.preventDefault();
    console.log("yes")
    if (!valditionForm()) {
      return false;
    }
    dispatch(
      postShipping({
        name,
        company_name,
        phone_number,
        address,
        country: "US"
      })
    ).then((result) => {
      if (result.type === "postShipping/fulfilled") {
        dispatch(getShipping());
      }
    });
  };
  return (
    <>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
        onSubmit={onSubmit}
      >
        <Typography
          variant="h4"
          component="h3"
          sx={{
            fontSize: "20px",
            fontWeight: "600",
            marginLeft: "8px",
            mb: "10px",
          }}
        >
          New address
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            flexWrap: { xs: "wrap", md: "nowrap" },
          }}
        >
          <Box sx={{ flex: 1 }}>
            <InputControl
              label=""
              variant="outlined"
              placeholder="First Name"
              type="text"
              id="firstName"
              name="name"
              disabled={checked}
              value={name}
              onChange={handleChange}
            />
            {errorMsg?.name && (
              <span
                style={{
                  color: "#E81717",
                  fontSize: "13px",
                  paddingLeft: "5px",
                }}
              >
                this field is required
              </span>
            )}
          </Box>
          <Box sx={{ flex: 1 }}>
            <InputControl
              label=""
              variant="outlined"
              placeholder="Last Name"
              id="lastName"
              name="company_name"
              value={company_name}
              onChange={handleChange}
              disabled={checked}
            />
          </Box>
        </Box>
        <Box>
          <InputControl
            variant="outlined"
            label=""
            placeholder="phone number"
            id="phone_number"
            name="phone_number"
            value={phone_number}
            onChange={handleChange}
            disabled={checked}
          />
          {errorMsg?.phone_number && (
            <span
              style={{
                color: "#E81717",
                fontSize: "13px",
                paddingLeft: "5px",
              }}
            >
              this field is required
            </span>
          )}
        </Box>
        <Box>
          <InputControl
            variant="outlined"
            label=""
            placeholder="ex: building . street,"
            id="address"
            name="address"
            value={address}
            onChange={handleChange}
            disabled={checked}
          />
          {errorMsg?.address && (
            <span
              style={{
                color: "#E81717",
                fontSize: "13px",
                paddingLeft: "5px",
              }}
            >
              this field is required
            </span>
          )}
        </Box>

        {/* <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              flexWrap: { xs: "wrap", md: "nowrap" },
            }}
          >
            <Box sx={{ flex: 1 }}>
              <InputControl
                variant="outlined"
                label=""
                placeholder="city"
                id="city"
                name="city"
                value={city}
                onChange={handleChange}
                disabled={checked}
              />
              {errorMsg?.city && (
                <span
                  style={{
                    color: "#E81717",
                    fontSize: "13px",
                    paddingLeft: "5px",
                  }}
                >
                  this field is required
                </span>
              )}
            </Box>
            <Box sx={{ flex: 1 }}>
              <InputControl
                variant="outlined"
                label=""
                placeholder="Postal code"
                id="postal_code"
                name="postal_code"
                value={postal_code}
                onChange={handleChange}
                disabled={checked}
                type="number"
              />
              {errorMsg?.postal_code && (
                <span
                  style={{
                    color: "#E81717",
                    fontSize: "13px",
                    paddingLeft: "5px",
                  }}
                >
                  this field is required
                </span>
              )}
            </Box>
          </Box> */}

        <Box sx={{ textAlign: "start" }}>
          <GrayButton
            sx={{
              width: { md: "200px" },
              height: "48px",
              "&:hover": {
                background: "rgba(127, 127, 127, 1)",
              },
              my: "32px",
              padding: "10px",
            }}
            type="submit"
            onClick={handlePostShipping}
          >
            Save
          </GrayButton>
        </Box>
      </form>
    </>
  );
};

export default AddressPost;
