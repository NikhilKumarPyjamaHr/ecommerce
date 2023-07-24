import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Grid } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import AddToCart from "./AddToCart";

import { useDispatch, useSelector } from "react-redux";
import { addToken } from "../Store/slices/authSlice";

function AdminHeader() {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(addToken(null));
        navigate("/admin");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div>
      {" "}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Grid
              container
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "right",
              }}
            >
              <Grid
                container
                style={{
                  display: "flex",
                  flexDirection: "row",

                  justifyContent: "right",
                }}
              >
                <Grid item>
                  <Button
                    color="inherit"
                    size="small"
                    variant="outlined"
                    onClick={logOut}
                  >
                    Logout
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default AdminHeader;
