import React, { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import CartDialog from "./CartDialog";
import { createCart } from "../Store/slices/cartSlice";
import { getCoupons } from "../Store/slices/couponSlice";

function AddToCart() {
  const totalcart = useSelector((state) => state.cart.totalcart);
  const signinuser = useSelector((state) => state.auth.signinuser);
  const [openDialog, setOpenDialog] = useState(false);
  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = () => {
    let totalprice = 0;
    for (let i = 0; i < totalcart.length; i++) {
      let cartitemprice = 0;
      const cartitem = { ...totalcart[i] };
      cartitemprice = cartitem.price * cartitem.cartcount;
      totalprice = totalprice + cartitemprice;
    }
    if (totalprice > 0) {
      const cartData = {
        items: JSON.stringify(totalcart),
        purchasestatus: false,
        is_active: true,
        customer_user_id: signinuser,
        totalprice: totalprice,
      };

      dispatch(createCart(cartData));

      setOpenDialog(true);
    }
  };
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <ShoppingCartIcon
          style={{ cursor: "pointer" }}
          onClick={handleOpenDialog}
        />
        <Typography
          variant="caption"
          style={{
            position: "absolute",
            top: 0,
            right: 130,
            backgroundColor: "#f50057",

            padding: "2px 6px",
            borderRadius: "50%",
          }}
        >
          {[...totalcart].length}
        </Typography>
      </div>
      <CartDialog
        open={openDialog}
        handleClose={handleClose}
        signinuser={signinuser}
      />
    </div>
  );
}

export default AddToCart;
