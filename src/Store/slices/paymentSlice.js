import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../Common/commonconfig";
import axios from "axios";

const initialState = {
  paymentresponse: null,
};

export const makePayment = createAsyncThunk(
  "payment/makePayments",
  async () => {
    try {
      const response = await axios.get(`${baseUrl}/payment/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(makePayment.pending, (state) => {});
    builder.addCase(makePayment.fulfilled, (state, action) => {
      state.paymentresponse = action.payload;
    });
    builder.addCase(makePayment.rejected, (state, action) => {});
  },
});

export const { makePayments } = paymentSlice.actions;

export default paymentSlice.reducer;
