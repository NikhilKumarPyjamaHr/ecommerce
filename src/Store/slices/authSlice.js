import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../Common/commonconfig";
import axios from "axios";

const initialState = {
  access_token: null,
  signinuser: null,
  admin_acess_token: null,
  adminuser: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.access_token = action.payload;
    },
    addSigninUser: (state, action) => {
      state.signinuser = action.payload;
    },
    addTokenAdmin: (state, action) => {
      state.admin_acess_token = action.payload;
    },
    addSigninAdmin: (state, action) => {
      state.adminuser = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { addToken, addSigninUser, addTokenAdmin, addSigninAdmin } =
  authSlice.actions;

export default authSlice.reducer;
