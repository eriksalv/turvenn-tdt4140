import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import logService from './logService';
import getError from '../../util/getError';

const initialState = {
  logs: [],
  log: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  status: ''
};

export const getLogs = createAsyncThunk('/log/getAll', async (_, thunkAPI) => {
  try {
    return await logService.getLogs();
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

export const createLog = createAsyncThunk('/log/create', async (logData, thunkAPI) => {
  try {
    const { accessToken } = thunkAPI.getState().auth.user;
    return await logService.createLog(logData, accessToken);
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

export const logSlice = createSlice({
  name: 'log',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
      state.status = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.trips = action.payload;
      })
      .addCase(getLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createLog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLog.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createLog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset } = logSlice.actions;

export default logSlice.reducer;
