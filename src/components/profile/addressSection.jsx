import React, { useState } from "react";
import { ProfileCard } from "../../shared/style";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GrayButton } from "../../shared/style";
import {
  deleteShipping,
  getShipping,
  postShipping,
  setErrorMsg,
} from "../../store/shipping/shippingSlice";
import trash from "../../assets/cart/trash.png";
import ShippingForm from "../shipping/shippingForm";
import { toast } from "react-toastify";
import DialogShipping from "../shipping/dialogShipping";
import AddressSave from "./addressSave";
import { Link, useNavigate } from "react-router-dom";

const AddressSection = ({ activeCard, setActiveCard }) => {
  const { allShipping } = useSelector((state) => state.shipping);
  const { name, company_name, phone_number, address } = useSelector(
    (state) => state?.shipping?.shipping
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  //  open Dialog if shipping is bigger than 10
  const [open, setOpen] = React.useState(false);
  const [addAds, setAddAds] = useState(false);

  //  handle open Dialog if shipping is bigger than 10
  const handleClickOpen = () => {
    setOpen(true);
  };

  //  handle close Dialog if shipping is bigger than 10
  const handleClose = () => {
    setOpen(false);
  };

  const dispatchReturn = (name, value) => {
    return dispatch(setErrorMsg({ name, value }));
  };
  // validition Form
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

  //  const shippingProfile = useState({name: "", country: "", company_name: "", house_number:"", postal_code, governoate, })
  const handlePostShipping = (e) => {
    e.preventDefault();

    if (!valditionForm()) {
      return false;
    }
    if (allShipping.length >= 10) {
      handleClickOpen();

      return false;
    }

    dispatch(
      postShipping({
        name,
        company_name,
        phone_number,
        address,
      })
    ).then((result) => {
      if (result.type === "postShipping/fulfilled") {
        dispatch(getShipping());
      }
    });
    setAddAds(false);
  };

  return (
    <>
      <Button
        style={{
          fontSize: "16px",
          lineHeight: "18.96px",
          fontWeight: 500,
          color: "#9B1D08",
          mb: "30px",
        }}
        onClick={() => {
          navigate('/profile/address/add')
        }}
      >
        Add new address
      </Button>

      {allShipping.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          {allShipping?.map((item) => {
            return (
              <ProfileCard key={item.id} sx={{ mb: "24px", width: "88%", mx: { xs: "auto", sm: 0 } }}>
                <Box
                  sx={{ position: "relative" }}
                  onClick={() => console.log(item.id)}
                >
                  <Box
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      mb: "16px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "20px",
                        fontWeight: 600,
                        lineHeight: "24.38px",
                        letterSpacing: "-0.24 px",
                      }}
                    >
                      Default address
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        gap: 2,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 300,
                          lineHeight: "17.07px",
                          textAlign: "right",
                        }}
                        onClick={() => navigate(`/profile/address/${item.id}`)}
                      >
                        Edit
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 300,
                          lineHeight: "17.07px",
                          color: "#9B1D08",
                          textAlign: "right",
                        }}
                        onClick={() =>
                          dispatch(deleteShipping({ id: item.id }))
                        }
                      >
                        Delete
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        bborder: "none",
                        padding: "8px",

                        color: "rgba(144, 144, 144, 1)",

                        cursor: "pointer",
                      }}
                    >
                      {item.name} {item.company_name}
                    </Typography>
                    <Typography
                      sx={{
                        border: "none",
                        padding: "8px",

                        color: "rgba(144, 144, 144, 1)",

                        cursor: "pointer",
                      }}
                    >
                      {item.phone_number}
                    </Typography>
                    <Typography
                      sx={{
                        border: "none",
                        padding: "8px",

                        color: "rgba(144, 144, 144, 1)",

                        cursor: "pointer",
                      }}
                    >
                      {item.address}
                    </Typography>
                  </Box>
                </Box>
              </ProfileCard>
            );
          })}
        </Box>
      )}

      {addAds && (
        <ProfileCard mt="50px" sx={{ mb: "24px", width: "88%", mx: { xs: "auto", sm: 0 } }}>
          {/* <ShippingForm onSubmit={handlePostShipping} checked={false}/> */}

          <AddressSave setAddAds={setAddAds} addAds={addAds} checked={false} />
        </ProfileCard>
      )}
      <DialogShipping open={open} handleClose={handleClose} />
    </>
  );
};

export default AddressSection;
