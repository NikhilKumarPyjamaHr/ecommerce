import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../Common/commonconfig";
import axios from "axios";

const initialState = {
  coupons: [],
};

export const getCoupons = createAsyncThunk("coupon/getCoupon", async () => {
  try {
    const response = await axios.get(`${baseUrl}/couponcodes/`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const createCoupon = createAsyncThunk(
  "coupon/createCoupon",
  async (couponData) => {
    try {
      const response = await axios.post(`${baseUrl}/couponcodes/`, couponData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateCoupon = createAsyncThunk(
  "coupon/updateCoupon",
  async (couponData) => {
    try {
      const response = await axios.put(
        `${baseUrl}/couponcodes/${couponData.id}`,
        couponData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const deleteCoupon = createAsyncThunk(
  "coupon/deleteCoupon",
  async (couponData) => {
    try {
      const response = await axios.delete(
        `${baseUrl}/couponcodes/${couponData.id}`,
        couponData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCoupons.pending, (state) => {});
    builder.addCase(getCoupons.fulfilled, (state, action) => {
      state.coupons = action.payload.couponcodes;
    });
    builder.addCase(getCoupons.rejected, (state, action) => {});
    builder.addCase(createCoupon.pending, (state) => {});
    builder.addCase(createCoupon.fulfilled, (state, action) => {
      state.coupons = action.payload.couponcodes;
    });
    builder.addCase(createCoupon.rejected, (state, action) => {});
    builder.addCase(deleteCoupon.pending, (state) => {});
    builder.addCase(deleteCoupon.fulfilled, (state, action) => {
      state.coupons = action.payload.couponcodes;
    });
    builder.addCase(deleteCoupon.rejected, (state, action) => {});

    builder.addCase(updateCoupon.pending, (state) => {});
    builder.addCase(updateCoupon.fulfilled, (state, action) => {
      state.coupons = action.payload.couponcodes;
    });
    builder.addCase(updateCoupon.rejected, (state, action) => {});
  },
});

export const { getCoupon } = couponSlice.actions;

export default couponSlice.reducer;
