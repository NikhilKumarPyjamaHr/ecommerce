import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "../Store/slices/userSlice";
import authReducer from "../Store/slices/authSlice";
import productReducer from "../Store/slices/productSlice";
import cartReducer from "../Store/slices/cartSlice";
import couponReducer from "../Store/slices/couponSlice";
import paymentReducer from "../Store/slices/paymentSlice";

export const store = configureStore({
  reducer: {
    user: usersReducer,
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    coupon: couponReducer,
    payment: paymentReducer,
  },
});
