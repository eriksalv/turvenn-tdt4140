import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import authService from './authService';

const user = JSON.parse(localStorage.getItem('user')) || null;

const initialState = {
  user: user,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ''
};

export const register = createAsyncThunk('/auth/register', async (userData, thunkAPI) => {
  console.log(user);
});

export const login = createAsyncThunk('/auth/login', async (userData, thunkAPI) => {
  try {
    return await authService.login(userData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  }
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
