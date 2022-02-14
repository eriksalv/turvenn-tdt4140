import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import authService from './authService';

const user = JSON.parse(localStorage.getItem('user')) || null;

const initialState = {
  user: user,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: 'test'
};

export const register = createAsyncThunk('/auth/register', async (user, thunkAPI) => {
  console.log(user);
});

export const login = createAsyncThunk('/auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue('Noe gikk galt!');
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
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
        state.isSuccess = false;
        state.user = null;
      });
  }
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
