import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const searchProducts = createAsyncThunk(
  'products/search',
  async (query, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.accessToken || state.auth.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`/api/products?search=${query}`, config);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Ürün aranırken bir hata oluştu.'
      );
    }
  }
);
