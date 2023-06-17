import React from "react";
import { Box, Typography } from "@mui/material";

// import Slide from "@mui/material/Slide";
// import { useFormik } from "formik";
// import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  clearForm,
  postOrder,
  postShipping,
  setChecked,
  setCheckedSavedAdress,
  setDeliveryDate,
  setDeliveryTime,
  setErrorMsg,
  setSavedAdress,
  // updateForm,
} from "../../store/shipping/shippingSlice";
import { Link } from "react-router-dom";
import RadioCheck from "../common/radioCheck";
import { InputControl } from "../../shared/style";
import { postPayment } from "../../store/payment/paymentSlice";
import { toast } from "react-toastify";
import DialogShipping from "./dialogShipping";
import ShippingForm from "./shippingForm";

const today = new Date();
const dayAfterTomorrow = new Date();
dayAfterTomorrow.setDate(today.getDate() + 2);

const year = dayAfterTomorrow.getFullYear();
const month = String(dayAfterTomorrow.getMonth() + 1).padStart(2, "0");
const day = String(dayAfterTomorrow.getDate()).padStart(2, "0");

const formattedToday = `${year}-${month}-${day}`;

const timeDate = [
  "8AM-10AM",
  "10AM-12PM",
  "12PM-2PM",
  "2PM-4PM",
  "4PM-6PM",
  "6PM-8PM",
];
const Shipping = () => {
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
    phone_number,
    position_of_the_business,
    name_of_the_business,
    ein_number,
  } = useSelector((state) => state?.shipping?.shipping);

  const {
    checked,
    allShipping,
    checkedSavedAdress,
    delivery_date,
    delivery_time,
    errorDelivery,
  } = useSelector((state) => state.shipping);

  const { items, is_wholesale } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  // const token = localStorage.getItem("token");
  const token = useSelector(state => state.user.user);


  // const [dateField, setDateField] = useState("");
  // const [dateTime, setDateTime] = useState("");
  // console.log(dateField, dateTime)
  // for show and hide saved address
  const [isAdd, setIsAdd] = React.useState(true);

  // open dialog if shipping is greater than 10
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Change Forms inputs And update Form
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   dispatch(updateForm({ name, value }));
  // };

  // console.log(is_wholesale)
  
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

    if (postal_code == "") {
      dispatch(
        setErrorMsg({ name: "postal_code", value: "this is field is requird" })
      );
      test = false;
    } else {
      dispatch(setErrorMsg({ name: "postal_code", value: "" }));
    }
    if (city == "") {
      dispatch(
        setErrorMsg({ name: "city", value: "this is field is requird" })
      );
      test = false;
    } else {
      dispatch(setErrorMsg({ name: "city", value: "" }));
    }

    if (is_wholesale) {
      if (name_of_the_business == null) {
        dispatch(
          setErrorMsg({ name: "position_of_the_business", value: "this is field is requird" })
        );
        test = false;
      } else {
        dispatch(setErrorMsg({ name: "position_of_the_business", value: "" }));
      }

      if (ein_number == null) {
        dispatch(
          setErrorMsg({ name: "ein_number", value: "this is field is requird" })
        );
        test = false;
      } else {
        dispatch(setErrorMsg({ name: "ein_number", value: "" }));
      }

      if (position_of_the_business == null) {
        dispatch(
          setErrorMsg({ name: "position_of_the_business", value: "this is field is requird" })
        );
        test = false;
      } else {
        dispatch(setErrorMsg({ name: "position_of_the_business", value: "" }));
      }
    }

    return test;
  };

  // handle Payment CheckOut
  const handlePayment = (e) => {
    console.log(checked);
    e.preventDefault();

    if (items.length === 0) {
      toast.error("Add Items to Cart !");
      return false;
    }

    // check if latest address
    if (checkedSavedAdress !== null) {
      dispatch(
        postOrder({
          shipping_address: checkedSavedAdress,
          order_info: "Delivery",
        })
      )
        .then((result) => {
          return result.payload.id;
        })
        .then((result) => {
          dispatch(
            postPayment({
              pk: result,
            })
          ).then((result) => {
            // window.location.href = result.payload.url;
            window.open(result.payload.url, "_blank");
          });
        });
      return false;
    }
    // check if From Branch or from site
    // fromSite here => Shipping information
    if (!checked) {
      if (!valditionForm()) {
        return false;
      }
      // check if shipping is bigger than 10
      if (allShipping.length < 10) {
        dispatch(
          postShipping({
            name,
            country: countryValue,
            company_name,
            house_number,
            city,
            postal_code,
            governoate,
            phone,
            address,
          })
        ).then((result) => {
          if (!result.error) {
            dispatch(
              postOrder({
                shipping_address: result.payload.id,
                order_info: "Delivery",
              })
            )
              .then((result) => {
                return result.payload.id;
              })
              .then((result) => {
                dispatch(postPayment({ pk: result })).then((result) => {
                  window.open(result.payload.url, "_blank");
                });
              });
          }
        });
      } else {
        // Stoooooooooop if there shipping bigger than 10
        handleClickOpen();
      }
    } else {
      dispatch(
        postOrder({
          shipping_address: null,
          order_info: "Pickup from the branch",
        })
      )
        .then((result) => {
          return result.payload.id;
        })
        .then((result) => {
          dispatch(postPayment({ pk: result })).then((result) => {
            window.open(result.payload.url, "_blank");
            // window.location.href = result.payload.url;
          });
        });
    }
  };

  return (
    <>
      <DialogShipping open={open} handleClose={handleClose} />
      <Box sx={{ position: "sticky", top: "90px", marginBottom: "30px" }}>
        {!token && (
          <Box>
            <Typography
              variant="h4"
              component="h3"
              sx={{ fontSize: "20px", fontWeight: "600", mt: "32px" }}
            >
              Contact information
            </Typography>
            <Typography
              variant="p"
              component="p"
              sx={{
                textAlign: "right",
                color: "#535353",
                fontWeight: "500",
                fontSize: "13px",
                mb: "9px",
              }}
            >
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#6E2E02" }}>
                Log in
              </Link>
            </Typography>
            <InputControl
              id="outlined-basic"
              label=""
              variant="outlined"
              placeholder="Email"
            />
          </Box>
        )}
        <Box>
          {!is_wholesale && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mt: "32px",
                mb: "16px",
                cursor: "pointer",
              }}
              onClick={() => dispatch(setChecked(false))}
            >
              <RadioCheck id={false} checked={checked} />
              <Typography
                variant="h4"
                component="h3"
                sx={{
                  fontSize: "20px",
                  fontWeight: "600",
                  marginLeft: "8px",
                }}
              >
                Shipping information
              </Typography>
            </Box>
          )}
          {allShipping.length > 0 && !is_wholesale && !checked && (
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                boxShadow:
                  "-2.5px -2.5px 5px rgba(179, 179, 179, 0.08), 2.5px 2.5px 8px rgba(53, 53, 53, 0.2)",
                borderRadius: "20px",
                padding: "20px",
                marginBottom: "24px",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="h4"
                  component="h3"
                  sx={{
                    fontSize: "20px",
                    fontWeight: "600",
                    marginLeft: "8px",
                  }}
                >
                  Saved Address
                </Typography>
                <Typography
                  sx={{ color: "rgba(110, 46, 2, 1)", cursor: "pointer" }}
                  onClick={() => setIsAdd(!isAdd)}
                >
                  + Add Latest Address
                </Typography>
              </Box>
              {isAdd &&
                allShipping.slice(0, 11).map((item, index) => (
                  <Box
                    key={item.id}
                    onClick={() => {
                      // setSavedAdress(!savedAdress);
                      dispatch(setSavedAdress());
                      if (checkedSavedAdress === item.id) {
                        dispatch(setCheckedSavedAdress(null));
                      } else {
                        dispatch(setCheckedSavedAdress(item.id));
                      }
                    }}
                  >
                    {" "}
                    <Typography
                      sx={{
                        border: "1px solid #ddd",
                        padding: "17px",
                        borderRadius: "5px",
                        color:
                          item.id === checkedSavedAdress &&
                          "rgba(204, 134, 72, 1)",
                        borderColor:
                          item.id === checkedSavedAdress &&
                          "rgba(204, 134, 72, 1)",
                        cursor: "pointer",
                      }}
                    >
                      {item.address}
                    </Typography>
                    {/* "#6E2E02" */}
                  </Box>
                ))}
            </Box>
          )}
          {/* form  */}
          {!checkedSavedAdress && !is_wholesale && !checked && (
            <>
              <ShippingForm onSubmit={handlePayment} checked={checked} />
            </>
          )}

          {is_wholesale && (
            <ShippingForm onSubmit={handlePayment} checked={checked} />
          )}

          {/* Delivery date */}
          <Box mt="20px" sx={{ position: "relative", display: "inline-block" }}>
            <Typography
              component="span"
              variant="span"
              mb="8px"
              sx={{ color: "rgba(53, 53, 53, 0.9)" }}
            >
              Delivery date
            </Typography>
            {errorDelivery && (
              <span
                style={{
                  position: "absolute",
                  top: "-1px",
                  right: "-10px",
                  color: "red",
                }}
              >
                *
              </span>
            )}
          </Box>

          <Box>
            <input
              type="date"
              value={delivery_date}
              onChange={(e) => dispatch(setDeliveryDate(e.target.value))}
              style={{ padding: "10px" }}
              min={formattedToday}
            />
            {/* <FirstComponent /> */}
            {/* <DatePickerExmple
              value={delivery_date}
              onChange={(e) => dispatch(setDeliveryDate(e.target.value))}
            /> */}
          </Box>
          {/* delivery Time */}
          <Box mt="12px">
            <Typography mb="8px" sx={{ color: "rgba(53, 53, 53, 0.9)" }}>
              Delivery Time
            </Typography>
            {timeDate.map((time, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    background: "rgba(110, 46, 2, 0.12)",
                    borderRadius: "6px",
                    padding: "8px",
                    display: "inline-block",
                    mr: "8px",
                    cursor: "pointer",
                    border: delivery_time === time && "1px solid #6E2E02",
                    color: "#6E2E02",
                    mb: "10px",
                  }}
                  onClick={() => dispatch(setDeliveryTime(time))}
                >
                  {time}
                </Box>
              );
            })}
          </Box>

          {!is_wholesale && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mt: "15px",
                mb: "15px",
              }}
              onClick={() => {
                dispatch(setChecked(true));
                dispatch(setCheckedSavedAdress(null));
                dispatch(clearForm());
              }}
            >
              <RadioCheck id={true} checked={checked} />
              <Typography
                variant="h4"
                component="h3"
                sx={{
                  fontSize: "20px",
                  fontWeight: "600",
                  marginLeft: "8px",
                }}
              >
                Pick up from the branch
              </Typography>
            </Box>
          )}

          <Box
            sx={{
              mb: { xs: "", sm: "50px", md: "50px" },
              mt: { xs: "", sm: "30px" },
            }}
          >
            <Link to="/shop">
              {/* <ButtonBack>Back to Shopping</ButtonBack> */}
              <button
                className="main-btn-outline"
                style={{
                  width: "auto",
                  padding: "12px 68px",
                  cursor: "pointer",
                }}
              >
                Back to Shopping
              </button>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Shipping;
