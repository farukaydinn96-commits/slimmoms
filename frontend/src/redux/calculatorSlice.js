import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { calculateCaloriesApi } from '../services/calculatorApi';

export const calculateCalories = createAsyncThunk(
  'calculator/calculateCalories',
  async (data, thunkAPI) => {
    try {
      return await calculateCaloriesApi(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const initialState = {
  dailyCalories: null,
  notRecommendedFoods: [],
  isLoading: false,
  error: null,
};

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,

  reducers: {
    clearCalculator: state => {
      state.dailyCalories = null;
      state.notRecommendedFoods = [];
      state.error = null;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(calculateCalories.pending, state => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(calculateCalories.fulfilled, (state, action) => {
        state.isLoading = false;

        state.dailyCalories =
          action.payload.dailyRate ??
          action.payload.dailyCalories ??
          null;

        state.notRecommendedFoods =
          action.payload.notRecommendedFoods ?? [];
      })

      .addCase(calculateCalories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { clearCalculator } = calculatorSlice.actions;

export default calculatorSlice.reducer;