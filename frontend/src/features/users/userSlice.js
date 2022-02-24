import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getError from '../../util/getError';

import userService from './userService';

const initialState = {
  users: [],
  user: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ''
};

export const getUsers = createAsyncThunk('/users/getAll', async (_, thunkAPI) => {
  try {
    return await userService.getUsers();
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

export const getUser = createAsyncThunk('/users/get', async (userId, thunkAPI) => {
  try {
    return await userService.getUser(userId);
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
