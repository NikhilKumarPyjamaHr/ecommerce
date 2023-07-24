import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../Store/slices/productSlice";
import { createCoupon } from "../Store/slices/couponSlice";

function AddCouponCard({ open, handleClose }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const dispatch = useDispatch();
  const adminuser = useSelector((state) => state.auth.adminuser);

  const handleIntegerInput = (e) => {
    const inputChar = String.fromCharCode(e.keyCode || e.charCode);

    if (!/^\d+$/.test(inputChar) && e.keyCode !== 8) {
      e.preventDefault();
    }
  };

  const createNewCoupon = () => {
    const coupon = {
      name: name,
      price: price,
    };

    dispatch(createCoupon(coupon));
    setName("");
    setPrice("");
    handleClose();
  };
  return (
    <div>
      {" "}
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {" "}
        <DialogTitle id="alert-dialog-title">
          {"Create Coupon"}
          <div style={{ float: "right", cursor: "pointer" }}>
            <CancelIcon onClick={handleClose} />
          </div>
        </DialogTitle>
        <Divider />
        <DialogContent style={{ minWidth: 300 }}>
          <Grid
            container
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Grid item xs={4}>
              {" "}
              <TextField
                label="Name"
                variant="outlined"
                size="small"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ minWidth: 300 }}
              />
            </Grid>

            <Grid item xs={4} pt={2}>
              {" "}
              <TextField
                label="Price"
                variant="outlined"
                size="small"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                onKeyPress={handleIntegerInput}
                style={{ minWidth: 300 }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            onClick={createNewCoupon}
            disabled={name == "" || price == "" ? true : false}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddCouponCard;
