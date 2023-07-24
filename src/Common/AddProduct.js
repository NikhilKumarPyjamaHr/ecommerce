import { Button } from "@mui/material";
import React from "react";

function AddProduct({ handleOpenProduct, handleCloseProduct }) {
  return (
    <div>
      {" "}
      <Button
        color="inherit"
        size="medium"
        variant="outlined"
        onClick={handleOpenProduct}
      >
        Add Product
      </Button>
    </div>
  );
}

export default AddProduct;
