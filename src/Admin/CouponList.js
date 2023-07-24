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

function CouponList({ coupons, deleteCoupon, editCoupon }) {
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
        {coupons &&
          coupons.map((coupon) => (
            <>
              {" "}
              <div style={{ padding: "20px" }} key={coupon.id}>
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
                          {coupon.name}
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
                      {"$" + coupon.price}
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
                        onClick={() => editCoupon(coupon)}
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
                        onClick={() => deleteCoupon(coupon)}
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

export default CouponList;
