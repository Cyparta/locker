import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './cart/cartSlice'
import globalSlice from './global/globalSlice'
import productsIDSlice  from './productID/productIDSlice'
import productsSlice from './products/productsSlice'
import profileSlice from './profile/profileSlice'
import registerSlice from './register/registerSlice'
import shopSlice from './shop/shopSlice'
import userSlice from './user/userSlice'
import shippingSlice from './shipping/shippingSlice'
import paymentSlice from './payment/paymentSlice'
import orderSlice  from './order/order'
import guestCartSlice from './guestCart/guestCartSlice'

export const store = configureStore({
  reducer: {
    products: productsSlice,
    register: registerSlice,
    shop:shopSlice,
    productID: productsIDSlice,
    cart: cartSlice,
    global: globalSlice,
    user: userSlice,
    profile:profileSlice,
    shipping:shippingSlice,
    payment:paymentSlice,
    order: orderSlice,
    guestCart: guestCartSlice,
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})