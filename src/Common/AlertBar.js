import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Grid } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={2} ref={ref} variant="standard" {...props} />;
});

function AlertBar({ severity, message }) {
  return (
    <div>
      <Alert severity={severity}>{message}</Alert>
    </div>
  );
}

export default AlertBar;
