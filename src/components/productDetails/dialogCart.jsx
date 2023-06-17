import { Dialog } from "@mui/material";
import React from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Link, useNavigate } from "react-router-dom";
import ZebehaHalal from "../../pages/zebehaHala/zebehaHalal";
import BasicTabs from "../common/basicTabs";
import Aqqeqa from "./aqqeqa";
import Odhiah from "./odhiah";
import { useDispatch, useSelector } from "react-redux";
import { setCartNav } from "../../store/global/globalSlice";
import { getCart, postCart } from "../../store/cart/cartSlice";
import Normal from "./normal";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const DialogCart = ({ open, handleClose, type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, count } = useSelector((state) => state.productID);
  // open dialog if shipping is greater than 10
  //   const [open, setOpen] = React.useState(false);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };
  // const token = localStorage.getItem('token')
  const token = useSelector(state => state.user.user);

  const {occassion} = useSelector(state => state.cart) 
  const handleAddToCart = () => {
    if (token) {
      dispatch(setCartNav());
      dispatch(
        postCart({ product_id: items.id, quantity: count, is_wholesale: type, occassion })
      ).then(() => {
        dispatch(getCart());
      });
      handleClose();
    } else {
      navigate("/register");
      handleClose();
    }
  };
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <BasicTabs
          normal={<Normal handleAddToCart={handleAddToCart}/>}
          aqqeqa={<Aqqeqa handleAddToCart={handleAddToCart} />}
          odhiah={<Odhiah handleAddToCart={handleAddToCart}/>}
          handleClose={handleClose}
          collection={items.collection}
          occassion={occassion}
        />
        {/* <ZebehaHalal /> */}
      </Dialog>
    </div>
  );
};

export default DialogCart;
