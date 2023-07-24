import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../Common/commonconfig";
import axios from "axios";

const initialState = {
  totalcart: [],
  cartresponse: null,
  deletecart: null,
};

export const createCart = createAsyncThunk(
  "cart/createCarts",
  async (cartData) => {
    try {
      const response = await axios.post(`${baseUrl}/cart/`, cartData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const clearCart = createAsyncThunk("cart/clearCarts", async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/cart/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productExistsIndex = state.totalcart.findIndex(
        (prod) => prod.id === action.payload.id
      );
      if (productExistsIndex !== -1) {
        state.totalcart[productExistsIndex] = action.payload;
      } else {
        state.totalcart = [...state.totalcart, action.payload];
      }
    },
    removeFromCart: (state, action) => {
      const idToRemove = action.payload.id;

      const indexToRemove = state.totalcart.findIndex(
        (item) => item.id === idToRemove
      );

      if (indexToRemove !== -1 && action.payload.cartcount == 1) {
        state.totalcart.splice(indexToRemove, 1);
      }
    },
    removeCart: (state, action) => {
      state.totalcart.splice(0);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createCart.pending, (state) => {});
    builder.addCase(createCart.fulfilled, (state, action) => {
      state.cartresponse = action.payload;
    });
    builder.addCase(createCart.rejected, (state, action) => {});
    builder.addCase(clearCart.pending, (state) => {
      // handle pending for updateCart action if needed
    });
    builder.addCase(clearCart.fulfilled, (state, action) => {
      state.deletecart = action.payload;
    });
    builder.addCase(clearCart.rejected, (state, action) => {
      // handle rejected for updateCart action if needed
    });
  },
});

export const { addToCart, removeFromCart, removeCart } = cartSlice.actions;

export default cartSlice.reducer;
