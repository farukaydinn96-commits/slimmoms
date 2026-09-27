import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getDiaryByDate,
  addDiaryProduct,
  deleteDiaryProduct,
} from '../services/diaryApi';

export const fetchDiaryByDate = createAsyncThunk(
  'diary/fetchByDate',
  async date => {
    const response = await getDiaryByDate(date);
    return response.data;
  }
);

export const addDiaryProductThunk = createAsyncThunk(
  'diary/addProduct',
  async data => {
    const response = await addDiaryProduct(data);
    return response.data;
  }
);

export const deleteDiaryProductThunk = createAsyncThunk(
  'diary/deleteProduct',
  async id => {
    await deleteDiaryProduct(id);
    return id;
  }
);

const initialState = {
  selectedDate: new Date().toISOString().split('T')[0],
  eatenProducts: [],
  daySummary: {
    kcalConsumed: 0,
    kcalLeft: 0,
    dailyRate: 0,
  },
  isLoading: false,
  error: null,
};

const diarySlice = createSlice({
  name: 'diary',
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDiaryByDate.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDiaryByDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.eatenProducts = action.payload.eatenProducts;
        state.daySummary = action.payload.daySummary;
      })
      .addCase(fetchDiaryByDate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addDiaryProductThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addDiaryProductThunk.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(addDiaryProductThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteDiaryProductThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteDiaryProductThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.eatenProducts = state.eatenProducts.filter(
          product => product.id !== action.payload
        );
      })
      .addCase(deleteDiaryProductThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedDate } = diarySlice.actions;

export default diarySlice.reducer;
