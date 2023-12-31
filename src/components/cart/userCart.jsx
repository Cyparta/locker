import React from "react";
import { Box } from "@mui/material";
import CartProduct from "./cartProduct";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  postGuestOrder,
  postOrder,
  postShipping,
  setErrorDeliveryMsg,
  setErrorMsg,
} from "../../store/shipping/shippingSlice";
import {
  postGuestPayment,
  postPayment,
} from "../../store/payment/paymentSlice";
import { toast } from "react-toastify";
import InfoCart from "./infoCart";
import useHandlePayment from "../../hooks/useHandlePayment";
import DialogShipping from "../shipping/dialogShipping";
import { clearItems } from "../../store/cart/cartSlice";
import { setCartID } from "../../store/guestCart/guestCartSlice";
const UserCart = ({ btn = "Continue to shipping" }) => {
  const { handleConsole } = useHandlePayment();
  const dispatch = useDispatch();
  const guestToken = useSelector((state) => state.guestCart.cartID);
  const { items, total_price, delivery_total } = useSelector(
    (state) => state.cart
  );
  const {
    items: guest,
    total_price: guest_price,
    delivery_total: guest_total,
  } = useSelector((state) => state.guestCart);
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
    ein_number,
    name_of_the_business,
    position_of_the_business,
  } = useSelector((state) => state.shipping.shipping);

  const { checked, checkedSavedAdress, allShipping, emailContact } = useSelector(
    (state) => state.shipping
  );

  console.log(emailContact)

  const { is_wholesale, delivery_date, errorDelivery, errorDeliveryMsg } =
    useSelector((state) => state.cart);

  //  open Dialog if shipping is bigger than 10
  const [open, setOpen] = React.useState(false);
  const [orderHeading, setOrderHeading] = React.useState("order payment");
  const [orderText, setOrderText] = React.useState(
    "your order sent successfully"
  );
  const [orderTo, setOrderTo] = React.useState("home");
  //  handle open Dialog if shipping is bigger than 10
  const handleClickOpen = () => {
    setOpen(true);
  };

  //  handle close Dialog if shipping is bigger than 10
  const handleClose = () => {
    setOpen(false);
  };

  const valditionForm = () => {
    let isEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        emailContact
      );
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

    if (guestToken) {
      if (emailContact === "") {
        dispatch(
          setErrorMsg({ name: "emailContact", value: "requird valid email" })
        );
        test = false;
      } else if (!isEmail) {
        dispatch(
          setErrorMsg({ name: "emailContact", value: "requird valid email" })
        );
        test = false;
      } else {
        dispatch(setErrorMsg({ name: "emailContact", value: "" }));
      }
    }

    if (is_wholesale) {
      if (name_of_the_business == null) {
        dispatch(
          setErrorMsg({
            name: "position_of_the_business",
            value: "this is field is requird",
          })
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
          setErrorMsg({
            name: "position_of_the_business",
            value: "this is field is requird",
          })
        );
        test = false;
      } else {
        dispatch(setErrorMsg({ name: "position_of_the_business", value: "" }));
      }
    }

    return test;
  };

  const handlePayment = () => {
    // check if there is no items
    if (items.length === 0) {
      toast.error("Add Items to Cart !");
      return false;
    }

    

    if (is_wholesale) {
      dispatch(
        postOrder({
          shipping_address: null,
          order_info: "Delivery",
        })
      );
      dispatch(clearItems());

      handleClickOpen();
    } else {
      // check if there is saved adress
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
            dispatch(postPayment({ pk: result })).then((result) => {
              window.open(result.payload.url, "_blank");
            });
          });
        return false;
      }

      // check if From Branch or from site
      if (!checked) {
        if (!valditionForm()) {
          return false;
        }
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
            });
          });
      }
    }
  };

  const handlePaymentGuest = () => {
    // check if there is no items
    if (guest.length === 0) {
      toast.error("Add Items to Cart !");
      return false;
    }

    // check if From Branch or from site
    if (!checked) {
      if (!valditionForm()) {
        return false;
      }
      if (allShipping.length < 10) {
        // postGuestOrder
        dispatch(
          postGuestOrder({
            shipping_address: ` ${name}/${countryValue} /${company_name} /${house_number} /${city} /${postal_code} /${governoate} /${phone} / ${address}`,
            order_info: "Delivery",
            email:emailContact
          })
        )
          .then((result) => {
            return result.payload.id;
          })
          .then((result) => {
            dispatch(postGuestPayment({ pk: result })).then((result) => {
              window.open(result.payload.url, "_blank");
            });
          });

        dispatch(setCartID());
        localStorage.removeItem("tokenGuest");
      } else {
        // Stoooooooooop if there shipping bigger than 10
        handleClickOpen();
      }
    } else {
      dispatch(
        postGuestOrder({
          shipping_address: null,
          order_info: "Pickup from the branch",
          email:emailContact
        })
      )
        .then((result) => {
          return result.payload.id;
        })
        .then((result) => {
          dispatch(postGuestPayment({ pk: result })).then((result) => {
            window.open(result.payload.url, "_blank");
          });
        });

      dispatch(setCartID());
      localStorage.removeItem("tokenGuest");
    }
  };

  return (
    <>
      {/* if your a user */}
      {!guestToken && (
        <>
          {items.length === 0 && (
            <Box>
              there's no items,{" "}
              <Link
                to="/retail"
                style={{ color: "#6E2E02" }}
                aria-label="go to shop"
              >
                shop retail now
              </Link>
            </Box>
          )}

          {items.map((item) => {
            return <CartProduct {...item} key={item.id} />;
          })}

          <InfoCart
            items={items}
            total_price={total_price}
            title="Continue to Pay"
            delivery_total={delivery_total}
            handlePayment={handlePayment}
          />
        </>
      )}

      {/* if you are a guest */}
      {guestToken && (
        <>
          {guest.map((item) => {
            return <CartProduct {...item} key={item.id} />;
          })}
          <InfoCart
            total_price={guest_price}
            title="Continue to Pay"
            delivery_total={guest_total}
            handlePayment={handlePaymentGuest}
          />
        </>
      )}

      <DialogShipping
        open={open}
        handleClose={handleClose}
        orderHeading={orderHeading}
        orderText={orderText}
        orderTo={orderTo}
      />

      {/* don't work Now, Need to Fix  */}
      {/* <button onClick={() => handleConsole(items)}>console</button> */}
    </>
  );
};

export default UserCart;
