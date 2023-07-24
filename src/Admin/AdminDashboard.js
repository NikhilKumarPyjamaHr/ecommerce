import React, { useState } from "react";
import AdminHeader from "../Common/AdminHeader";
import ToggleComponent from "../Common/ToggleComponent";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import AddProduct from "../Common/AddProduct";
import AddCoupon from "../Common/AddCoupon";

import CouponList from "./CouponList";
import AddProductCard from "./AddProductCard";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../Store/slices/productSlice";
import ProductList from "./ProductList";
import UpdateProductCard from "./UpdateProductCard";
import {
  deleteCoupon,
  getCoupons,
  updateCoupon,
} from "../Store/slices/couponSlice";
import AddCouponCard from "./AddCouponCard";
import UpdateCouponCard from "./UpdateCouponCard";

function AdminDashboard() {
  const [alignment, setAlignment] = React.useState("products");
  const [openProduct, setOpenProduct] = React.useState(false);
  const [openCoupon, setOpenCoupon] = React.useState(false);

  const [openUpdateProduct, setOpenUpdateProduct] = React.useState(false);
  const [openUpdateCoupon, setOpenUpdateCoupon] = React.useState(false);

  const [productToEdit, setProductToEdit] = React.useState();
  const [couponToEdit, setCouponToEdit] = React.useState();
  const products = useSelector((state) => state.product.products);
  const coupons = useSelector((state) => state.coupon.coupons);
  const admin_acess_token = useSelector(
    (state) => state.auth.admin_acess_token
  );

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getProducts());
    dispatch(getCoupons());
  }, []);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleCloseProduct = () => {
    setOpenProduct(false);
  };

  const handleCloseCoupon = () => {
    setOpenCoupon(false);
  };
  const handleCloseUpdateProduct = () => {
    setOpenUpdateProduct(false);
  };

  const handleOpenProduct = () => {
    setOpenProduct(true);
  };

  const handleOpenCoupon = () => {
    setOpenCoupon(true);
  };
  const deleteProducts = (prod) => {
    dispatch(deleteProduct(prod));
  };

  const editProducts = (prod) => {
    setProductToEdit(prod);
    setOpenUpdateProduct(true);
  };

  const deleteExistingCoupon = (coupon) => {
    dispatch(deleteCoupon(coupon));
  };

  const editExistingCoupon = (coupon) => {
    setCouponToEdit(coupon);
    setOpenUpdateCoupon(true);
  };

  const handleCloseUpdateCoupon = () => {
    setOpenUpdateCoupon(false);
  };

  return (
    <div>
      {admin_acess_token && (
        <>
          {" "}
          <AdminHeader />
          <Grid
            container
            style={{
              display: "flex",

              justifyContent: "right",
            }}
            p={3}
          >
            {" "}
            <Grid item xs={9}>
              {" "}
              {alignment == "products" ? (
                <AddProduct
                  handleOpenProduct={handleOpenProduct}
                  handleCloseProduct={handleCloseProduct}
                />
              ) : (
                <AddCoupon
                  handleOpenCoupon={handleOpenCoupon}
                  handleCloseCoupon={handleCloseCoupon}
                />
              )}
            </Grid>
            <Grid item>
              <ToggleComponent
                alignment={alignment}
                handleChange={handleChange}
              />
            </Grid>
          </Grid>
          <Box>
            {alignment == "products" ? (
              <div style={{ padding: "20px" }}>
                <ProductList
                  products={products}
                  deleteProducts={(prod) => deleteProducts(prod)}
                  editProduct={(prod) => editProducts(prod)}
                />
              </div>
            ) : (
              <div style={{ padding: "20px" }}>
                <CouponList
                  coupons={coupons}
                  deleteCoupon={(coupon) => deleteExistingCoupon(coupon)}
                  editCoupon={(coupon) => editExistingCoupon(coupon)}
                />
              </div>
            )}
          </Box>
          <AddProductCard open={openProduct} handleClose={handleCloseProduct} />
          <AddCouponCard open={openCoupon} handleClose={handleCloseCoupon} />
          <UpdateProductCard
            open={openUpdateProduct}
            product={productToEdit}
            handleClose={handleCloseUpdateProduct}
          />
          <UpdateCouponCard
            open={openUpdateCoupon}
            coupon={couponToEdit}
            handleClose={handleCloseUpdateCoupon}
          />
        </>
      )}
    </div>
  );
}

export default AdminDashboard;
