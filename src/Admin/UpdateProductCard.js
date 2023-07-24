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
import { updateProduct } from "../Store/slices/productSlice";

function UpdateProductCard({ product, open, handleClose }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const dispatch = useDispatch();
  const adminuser = useSelector((state) => state.auth.adminuser);

  React.useEffect(() => {
    if (product) {
      setName(product.name || "");
      setDesc(product.description || "");
      setPrice(product.price || "");
    }
  }, [product]);

  const handleIntegerInput = (e) => {
    const inputChar = String.fromCharCode(e.keyCode || e.charCode);

    if (!/^\d+$/.test(inputChar) && e.keyCode !== 8) {
      e.preventDefault();
    }
  };

  const updateExistingProduct = () => {
    const productobj = {
      id: product.id,
      name: name,
      description: desc,
      price: price,
      admin_user_id: adminuser,
    };
    dispatch(updateProduct(productobj));
    setName("");
    setDesc("");
    setPrice("");
    handleClose();
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
          {"Update Product"}
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
                label="Description"
                variant="outlined"
                size="small"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
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
            onClick={updateExistingProduct}
            disabled={name == "" || desc == "" || price == "" ? true : false}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UpdateProductCard;
