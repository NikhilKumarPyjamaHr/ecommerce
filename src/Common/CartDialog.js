import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { Box, Divider, Grid } from "@mui/material";
import { getCoupons } from "../Store/slices/couponSlice";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CancelIcon from "@mui/icons-material/Cancel";
import { makePayment } from "../Store/slices/paymentSlice";
import AlertBar from "./AlertBar";
import { clearCart, removeCart } from "../Store/slices/cartSlice";
import { useNavigate } from "react-router-dom";

export default function CartDialog({ open, handleClose, signinuser }) {
  const cartresponse = useSelector((state) => state.cart.cartresponse);
  const deletecart = useSelector((state) => state.cart.deletecart);
  const [amountAfterCoupon, setAmountAfterCoupon] = useState(0);
  const [selectedCoupon, setSelectedCoupon] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const coupons = useSelector((state) => state.coupon.coupons);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(getCoupons());
  }, []);

  const handleSelectedCoupon = (e) => {
    setSelectedCoupon(e.target.value);

    setAmountAfterCoupon(
      cartresponse?.totalprice - parseInt(e.target.value.price)
    );
  };

  const handlePayment = () => {
    dispatch(makePayment());

    setAlertMessage("Payment is successful");

    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);

    dispatch(clearCart(cartresponse?.id));

    setTimeout(() => handleClose(), 3000);
    dispatch(removeCart());
  };

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {" "}
        <DialogTitle id="alert-dialog-title">
          {"Checkout"}
          <div style={{ float: "right", cursor: "pointer" }}>
            <CancelIcon onClick={handleClose} />
          </div>
        </DialogTitle>
        {showAlert && <AlertBar severity={"success"} message={alertMessage} />}
        <Divider />
        <DialogContent style={{ minWidth: 500 }}>
          {cartresponse &&
            JSON.parse(cartresponse?.items).map((cartitem) => (
              <DialogContentText
                id="alert-dialog-description"
                key={cartitem.id}
              >
                <Grid
                  container
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "left",
                  }}
                >
                  <Grid item xs={5}>
                    {cartitem.name}
                  </Grid>
                  <Grid item xs={1}>
                    {"x"}
                  </Grid>
                  <Grid item xs={3}>
                    {cartitem.cartcount}
                  </Grid>
                  <Grid item xs={3}>
                    {" "}
                    {"$ " + cartitem.cartcount * cartitem.price}
                  </Grid>
                </Grid>
              </DialogContentText>
            ))}

          <Grid
            container
            style={{
              display: "flex",

              alignItems: "flex-end",
            }}
            pt={3}
          >
            <Grid item xs={9}>
              {"Amount To Pay:"}
            </Grid>
            <Grid item>{"$ " + cartresponse?.totalprice}</Grid>
          </Grid>
          <Box pt={3}>
            <>
              <FormControl sx={{ minWidth: 300 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Apply Coupon
                </InputLabel>
                <Select
                  size="small"
                  label="Coupon"
                  defaultValue={selectedCoupon}
                  onChange={(e) => handleSelectedCoupon(e)}
                >
                  <MenuItem value="0">
                    <em>None</em>
                  </MenuItem>
                  {coupons &&
                    coupons.length > 0 &&
                    coupons.map((coupon) => (
                      <MenuItem
                        value={coupon}
                        disabled={
                          cartresponse?.totalprice <= coupon.price
                            ? true
                            : false
                        }
                      >
                        {coupon.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </>
          </Box>
          {amountAfterCoupon && amountAfterCoupon > 0 ? (
            <Grid
              container
              style={{
                display: "flex",

                alignItems: "flex-end",
              }}
              pt={3}
            >
              <Grid item xs={9}>
                {"Amount After Discount:"}
              </Grid>
              <Grid item>{"$ " + amountAfterCoupon}</Grid>
            </Grid>
          ) : null}
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handlePayment}>Make Payment</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
