import { Routes, Route, useLocation } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Cart from "./pages/cart/cart";
import Shop from "./pages/shop/shop";
import ForgotPassword from "./pages/forgotPassword/forgotPassword";
import Reset from "./pages/reset/reset";
import Register from "./pages/register/register";
import Product from "./pages/product/product";

import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/common/PrivateRoute";
import Profile from "./pages/profile/profile";
import Payment from "./pages/payment/payment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "./store/cart/cartSlice";
import PaymentSuccess from "./pages/paymentSuccess/paymentSuccess";
import PaymentCancel from "./pages/paymentCancel/paymentCancel";
import ZebehaHalal from "./pages/zebehaHala/zebehaHalal";
import Wholesale from "./pages/wholesale/wholesale";
import { useState } from "react";
import DialogCardError from "./components/cart/dialogCardError";
import Aqqiqa from "./pages/aqqiqa/aqqiqa";
import Odhiah from "./pages/odhiha/odhiha";
import AddressSave from "./components/profile/addressSave";
import AddressSection from "./components/profile/addressSection";
import Order from "./pages/profile/order";
import OrderDetails from "./pages/profile/[order]";
import Address from "./pages/profile/address";
import AddressDetails from "./pages/profile/addressDetails";
import { getShippingID } from "./store/shipping/shippingSlice";
import AddressAdd from "./pages/profile/addressAdd";
import { getGuestCart } from "./store/guestCart/guestCartSlice";
import { onMessageListener, requestPermission } from "./firebase";

import { get_token } from "./firebase";
import axios from "axios";
import { BASEURL } from "./data/API";
function App({currentToken}) {
  const location = useLocation();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  
  const [isTokenFound, setTokenFound] = useState({
    status:false,
    token:""});

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((registration) => {
        console.log("Registration successful, scope is:", registration.scope);
      })
      .catch((error) => {
        console.log("Service worker registration failed, error:", error);
      });
  }
  // getToken(setTokenFound)
  // onMessageListener().then(payload => {
  //   setShow(true);
  //   setNotification({title:payload.notification.title, body:payload.notification.body})
  //   console.log(payload);
  // }).catch(err => console.log('failed: ', err));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const { items, total_price } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.cart);
  // const token = localStorage.getItem("token");
  const token = useSelector((state) => state.user.user);

  const guestToken = useSelector((state) => state.guestCart.cartID);

  const getNotification=async()=>{
    if (token && isTokenFound.status) {
   await axios.post(`${BASEURL}api/devices/login/`, {
      registration_id:isTokenFound.status===true? isTokenFound.token:"",
      type: "web",
    },{
      headers: {
        "Authorization":`JWT ${token}`,
}}).then((res)=>console.log(res))
    }
  }


  useEffect(()=> {
    if (token) {
      
      dispatch(getCart());
    }
    
    if (guestToken) {
      dispatch(getGuestCart());
    }
    
  }, [token, guestToken]);

  useEffect(() => {
    requestPermission();
    get_token(setTokenFound,dispatch);
    
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    getNotification()
  }, [location.pathname]);
  
  return (
    <div className="App">
      <CssBaseline />
      {location.pathname !== "/payment/success" && <Navbar />}

      <div
        style={{
          flex: 1,
          marginTop: "72px",
          height: "100%",
          margin: 0,
          overflow: "hidden",
          paddingTop: "70px",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/reset/reset_password/:uid/:token" element={<Reset />} />
          {/* <Route path="/shop" element={<Shop />} /> */}
          <Route path="/wholesale" element={<Wholesale />} />
          <Route path="/retail" element={<Shop />} />
          <Route path="/odhiah" element={<Odhiah />} />
          <Route path="/aqqeqa" element={<Aqqiqa />} />
          <Route path="/wholesale/:id" element={<Product />} />
          <Route path="/retail/:id" element={<Product />} />
          <Route path="/odhiah/:id" element={<Product />} />
          <Route path="/aqqeqa/:id" element={<Product />} />
          {/* <Route path="/shop" element={<Shop />} /> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/order" element={<Order />} />
          <Route path="/profile/order/:id" element={<OrderDetails />} />
          <Route path="/profile/address" element={<Address />} />
          <Route path="/profile/address/:id" element={<AddressDetails />} />
          <Route path="/profile/address/add" element={<AddressAdd />} />

          {/* <Route path="/profile/address" element={<Profile active={2} />}/> */}

          <Route path="/payment" element={<Payment />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/cancel" element={<PaymentCancel />} />
          <Route path="/zebehahalal" element={<ZebehaHalal />} />

          {/* <Route path="/#contact" element={<ContactUs />}/> */}
        </Routes>
      </div>
      {location.pathname !== "/login" &&
        location.pathname !== "/register" &&
        location.pathname !== "/payment/success" &&
        location.pathname !== "/forgotPassword" && <Footer />}
      <ToastContainer position="bottom-left" />

      {/* {error ? <DialogCardError open={open} handleClose={handleClose}/> : ""} */}
      {/* <DialogCardError open={open} handleClose={handleClose}/> */}
    </div>
  );
}

export default App;
