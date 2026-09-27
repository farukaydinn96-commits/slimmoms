import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const searchProducts = createAsyncThunk(
  "products/search",
  async (query, thunkAPI) => {
    try {
      const { data } = await axios.get(`/products?search=${query}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);
