import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ProductList({ products, deleteProducts, editProduct }) {
  return (
    <div>
      {" "}
      <Grid
        container
        style={{
          display: "flex",
          justifyContent: "left",
        }}
      >
        {products &&
          products.map((prod) => (
            <>
              {" "}
              <div style={{ padding: "20px" }} key={prod.id}>
                <Card sx={{ minWidth: 426 }}>
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
                        <Typography
                          variant="body1"
                          color={"ButtonHighlight"}
                          style={{ float: "left" }}
                        >
                          {prod.description}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Divider />
                  <CardActions
                    style={{
                      backgroundColor: "lightgray",
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
                      <Button
                        variant="text"
                        style={{
                          color: "black",
                          borderColor: "black",
                          cursor: "pointer",
                        }}
                        size="small"
                        onClick={() => editProduct(prod)}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        variant="text"
                        style={{
                          color: "red",
                          borderColor: "black",
                          cursor: "pointer",
                        }}
                        onClick={() => deleteProducts(prod)}
                      >
                        <DeleteIcon />
                      </Button>
                    </div>
                  </CardActions>
                </Card>
              </div>
            </>
          ))}
      </Grid>
    </div>
  );
}

export default ProductList;
