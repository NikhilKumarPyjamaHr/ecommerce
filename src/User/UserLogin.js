import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "../Firebase/firebase";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, createUsers, createUser } from "../Store/slices/userSlice";
import { getAuth, getIdTokenResult, onAuthStateChanged } from "firebase/auth";
import { addToken } from "../Store/slices/authSlice";

export function UserLogin() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const access_token = useSelector((state) => state.auth.access_token);

  React.useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        checkFirebaseToken(user);
      } else {
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const checkFirebaseToken = async (user) => {
    try {
      const tokenResult = await getIdTokenResult(user);

      if (tokenResult) {
        navigate("/userdashboard");
      }
    } catch (error) {
      console.error("Error checking token:", error);
    }
  };

  const userGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        const userobj = { name: user.displayName, email: user.email };
        dispatch(createUser(userobj));
        navigate("/userdashboard");
      })
      .catch((error) => {
        const errorCode = error.code;

        const errorMessage = error.message;
        const email = error.customData.email;

        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  return (
    <div style={{ backgroundColor: "#145DA0", height: "27rem" }}>
      {" "}
      <Typography variant="h4" color={"Highlight"} pt={7}>
        Welcome to User Panel
      </Typography>
      <Grid
        container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        pt={30}
      >
        <Card sx={{ minWidth: 350 }}>
          <CardContent>
            <Grid
              container
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item xs={10}>
                {" "}
                <Typography variant="h6" color={"ThreeDDarkShadow"}>
                  Sign In With
                </Typography>
              </Grid>
              <Grid item pt={5}>
                {" "}
                <Button
                  variant="outlined"
                  size="small"
                  onClick={userGoogleLogin}
                  style={{ width: "130px" }}
                >
                  Google
                </Button>
              </Grid>
              <Grid item pt={2}>
                <Typography
                  variant="body2"
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                  onClick={() => {
                    navigate("/admin");
                  }}
                >
                  click for admin panel
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
