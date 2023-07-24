import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../Common/commonconfig";
import axios from "axios";

const initialState = {
  loggedinuser: null,
  loggedinadmin: null,
};

export const createUser = createAsyncThunk(
  "user/createUsers",
  async (userData) => {
    try {
      const response = await axios.post(`${baseUrl}/customerusers/`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const createAdminUser = createAsyncThunk(
  "user/createAdminUsers",
  async (userData) => {
    try {
      const response = await axios.post(`${baseUrl}/adminusers/`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {});
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.loggedinuser = action.payload;
    });
    builder.addCase(createUser.rejected, (state, action) => {});
    builder.addCase(createAdminUser.pending, (state) => {});
    builder.addCase(createAdminUser.fulfilled, (state, action) => {
      state.loggedinadmin = action.payload;
    });
    builder.addCase(createAdminUser.rejected, (state, action) => {});
  },
});

export const { getUsers } = userSlice.actions;

export default userSlice.reducer;
