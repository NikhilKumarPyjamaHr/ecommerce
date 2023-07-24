import { Button } from "@mui/material";
import React from "react";

function AddCoupon({ handleOpenCoupon }) {
  return (
    <div>
      {" "}
      <Button
        color="inherit"
        size="medium"
        variant="outlined"
        onClick={handleOpenCoupon}
      >
        Add Coupon
      </Button>
    </div>
  );
}

export default AddCoupon;
