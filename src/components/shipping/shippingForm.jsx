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
import { InputControl } from "../../shared/style";
import RadioCheck from "../common/radioCheck";
import { useDispatch, useSelector } from "react-redux";
import {
  clearForm,
  setChecked,
  setCheckedSavedAdress,
  setRetail,
  updateForm,
  postForm
} from "../../store/shipping/shippingSlice";
import { countries } from "../../data/country";

const ShippingForm = ({ onSubmit, checked }) => {
  const {
    country: countryValue,
    name,
    company_name,
    house_number,
    city,
    postal_code,
    governoate,
    phone,
    address,
    name_of_the_business,
    position_of_the_business,
    phone_number,
    ein_number,
  } = useSelector((state) => state?.shipping?.shipping);

  const { errorMsg, allShipping, checkedSavedAdress, retail } = useSelector(
    (state) => state.shipping
  );

  const { items, is_wholesale } = useSelector((state) => state.cart);

  // const token = localStorage.getItem("token");
  const token = useSelector(state => state.user.user);

  const dispatch = useDispatch();

  // Change Forms inputs And update Form
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(postForm({ name, value }));
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
        {is_wholesale && (
          <>
            <Box>
              <InputControl
                variant="outlined"
                label=""
                placeholder="name of the bussiness"
                id="name_of_the_business"
                name="name_of_the_business"
                value={name_of_the_business}
                onChange={handleChange}
                disabled={checked}
              />
              {errorMsg?.name_of_the_business && (
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
                placeholder="Position in the business"
                id="position_of_the_business"
                name="position_of_the_business"
                value={position_of_the_business}
                onChange={handleChange}
                disabled={checked}
              />
              {errorMsg?.position_of_the_business && (
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
          </>
        )}
        <Box>
          <InputControl
            variant="outlined"
            label=""
            placeholder="Mobile number"
            id="phone_number"
            name="phone_number"
            value={phone_number}
            onChange={handleChange}
            disabled={checked}
            type="number"
            sx={{borderRadius:"5px!important"}}
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
            placeholder="Address"
            id="address"
            name="address"
            value={address}
            onChange={handleChange}
            disabled={checked}
            sx={{borderRadius:"5px!important"}}
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
        </Box> */}

        {/* <Box>
          <InputControl
            variant="outlined"
            label=""
            placeholder="Apartment, suite, etc. (optional)"
            id="house_number"
            name="house_number"
            value={house_number}
            onChange={handleChange}
            disabled={checked}
          />
          {errorMsg?.house_number && (
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
        </Box> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            flexWrap: { xs: "wrap", md: "nowrap" },
          }}
        >
          <Box sx={{ flex: 1 }}>
            <FormControl fullWidth>
              <InputLabel id="country">country</InputLabel>
              <Select
                labelId="country"
                label="country"
                id="country"
                name="country"
                disabled={checked}
                value={countryValue}
                onChange={handleChange}
                sx={{
                  ".Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6E2E02",
                  },
                  ".MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #C1C1C1",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6E2E02",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6E2E02",
                  },
                }}
              >
                <MenuItem value={"US"}>USA</MenuItem>
                {countries?.map((ele, index) => {
                  return (
                    <MenuItem value={Object.keys(ele)[0]} key={index}>
                      {ele[Object.keys(ele)].country}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
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
              sx={{borderRadius:"5px!important"}}
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
              type="number"
              disabled={checked}
              sx={{borderRadius:"5px!important"}}
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
        </Box>
        {is_wholesale && (
          <Box>
            <InputControl
              variant="outlined"
              label=""
              placeholder="ein number"
              id="ein_number"
              name="ein_number"
              value={ein_number}
              onChange={handleChange}
              disabled={checked}
            />
            {errorMsg?.ein_number && (
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
        )}

        <Button type="submit" sx={{ display: "none" }}></Button>
      </form>
    </>
  );
};

export default ShippingForm;
