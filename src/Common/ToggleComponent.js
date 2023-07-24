import React from "react";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

function ToggleComponent({ alignment, handleChange }) {
  return (
    <div>
      {" "}
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        size="small"
      >
        <ToggleButton value="products">Products</ToggleButton>
        <ToggleButton value="coupons">Coupons</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}

export default ToggleComponent;
