import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../Common/commonconfig";
import axios from "axios";

const initialState = {
  products: [],
};

export const getProducts = createAsyncThunk("product/getProduct", async () => {
  try {
    const response = await axios.get(`${baseUrl}/products/`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (productData) => {
    try {
      const response = await axios.post(`${baseUrl}/products/`, productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (productData) => {
    try {
      const response = await axios.put(
        `${baseUrl}/products/${productData.id}`,
        productData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productData) => {
    try {
      const response = await axios.delete(
        `${baseUrl}/products/${productData.id}`,
        productData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {});
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload.products;
    });
    builder.addCase(getProducts.rejected, (state, action) => {});
    builder.addCase(createProduct.pending, (state) => {});
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.products = action.payload.products;
    });
    builder.addCase(createProduct.rejected, (state, action) => {});
    builder.addCase(updateProduct.pending, (state) => {});
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.products = action.payload.products;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {});
    builder.addCase(deleteProduct.pending, (state) => {});
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = action.payload.products;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {});
  },
});

export const {} = productSlice.actions;

export default productSlice.reducer;
