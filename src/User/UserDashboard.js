import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProduct, getProducts } from "../Store/slices/productSlice";
import Divider from "@mui/material/Divider";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import AddBoxSharpIcon from "@mui/icons-material/AddBoxSharp";
import IndeterminateCheckBoxSharpIcon from "@mui/icons-material/IndeterminateCheckBoxSharp";
import { addToCart, removeFromCart } from "../Store/slices/cartSlice";
import Header from "../Common/Header";

function UserDashboard() {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
  const access_token = useSelector((state) => state.auth.access_token);
  const totalcart = useSelector((state) => state.cart.totalcart);
  const [productsCopy, setProductsCopy] = useState([]);

  React.useEffect(() => {
    dispatch(getProducts());
  }, []);

  React.useEffect(() => {
    const productscopy = [...products].map((product) => ({
      ...product,
      cartcount: 0,
    }));

    setProductsCopy(productscopy);
  }, [products && products.length > 0]);
  const addItemToCart = (cartitem) => {
    let count = 0;

    count = cartitem.cartcount + 1;

    const indexToUpdate = productsCopy.findIndex(
      (item) => item.id === cartitem.id
    );

    if (indexToUpdate !== -1) {
      const updatedCartItem = {
        ...productsCopy[indexToUpdate],
        cartcount: count,
      };

      const updatedTestprod = [...productsCopy];
      updatedTestprod[indexToUpdate] = updatedCartItem;

      setProductsCopy(updatedTestprod);
      dispatch(addToCart(updatedCartItem));
    }
  };

  const removeItemFromCart = (prod) => {
    let count = prod.cartcount;
    count = count - 1;

    if (count >= 0) {
      const indexToUpdate = productsCopy.findIndex(
        (item) => item.id === prod.id
      );

      if (indexToUpdate !== -1) {
        const updatedCartItem = {
          ...productsCopy[indexToUpdate],
          cartcount: count,
        };

        const updatedTestprod = [...productsCopy];
        updatedTestprod[indexToUpdate] = updatedCartItem;

        setProductsCopy(updatedTestprod);
      }
    }
    dispatch(removeFromCart(prod));
  };
  return (
    <div>
      {access_token && (
        <>
          <Header />
          <Grid
            container
            style={{
              display: "flex",

              justifyContent: "left",
            }}
          >
            {productsCopy &&
              productsCopy.length > 0 &&
              productsCopy.map((prod) => (
                <div style={{ padding: "20px" }} key={prod.id}>
                  <Card sx={{ minWidth: 435 }}>
                    <CardContent style={{ backgroundColor: "lightslategrey" }}>
                      <Grid
                        container
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Grid item xs={8}>
                          {" "}
                          <Typography
                            variant="body1"
                            color={"ButtonHighlight"}
                            style={{ float: "left" }}
                          >
                            {prod.name}
                          </Typography>
                        </Grid>
                        <Grid item pt={5}>
                          {" "}
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Divider />
                    <CardActions
                      style={{
                        paddingTop: "10px",
                        backgroundColor: "ButtonHighlight",
                      }}
                    >
                      <Typography variant="body1" style={{ display: "inline" }}>
                        {"$" + prod.price}
                      </Typography>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        {prod.cartcount == 0 ? (
                          <Button
                            color="inherit"
                            size="small"
                            variant="outlined"
                            onClick={(e) => addItemToCart(prod)}
                          >
                            Add To Cart
                          </Button>
                        ) : (
                          <>
                            {" "}
                            <IndeterminateCheckBoxSharpIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => removeItemFromCart(prod)}
                            />
                            <Typography>{prod.cartcount}</Typography>
                            <AddBoxSharpIcon
                              style={{ cursor: "pointer" }}
                              onClick={(e) => addItemToCart(prod)}
                            />
                          </>
                        )}
                      </div>
                    </CardActions>
                  </Card>
                </div>
              ))}
          </Grid>
        </>
      )}{" "}
    </div>
  );
}

export default UserDashboard;
