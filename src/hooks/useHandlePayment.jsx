import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { postOrder, postShipping } from ".../../store/shipping/shippingSlice";
// import { postPayment } from "../../store/payment/paymentSlice";
import { postOrder, postShipping } from "../store/shipping/shippingSlice";
import { postPayment } from "../store/payment/paymentSlice";
import { toast } from "react-toastify";


const useHandlePayment = () => {
  const dispatch = useDispatch();
  
  const formData = useSelector((state) => state.shipping.shipping);
  const { checked, checkedSavedAdress, savedAdress } = useSelector(
    (state) => state.shipping
  );
  const handleConsole = (items) => {
    // check if there are no items
    if (items.length === 0) {
      toast.error("Add Items to Cart !");
      return false;
    }

    console.log(typeof checkedSavedAdress)

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
            // window.location.href = result.payload.url;
            window.open(result.payload.url, "_blank");
          });
        });
        
      return false;
    } 

    if (!checked) {
      dispatch(
        postShipping({
          name: formData.name,
          country: formData.country,
          company_name: formData.company_name,
          house_number: formData.house_number,
          city: formData.city,
          postal_code: formData.postal_code,
          governoate: formData.governoate,
          phone: formData.phone,
          address: formData.address,
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
  };

  return { handleConsole };
};

export default useHandlePayment;
