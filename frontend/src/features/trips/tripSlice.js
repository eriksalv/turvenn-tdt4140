import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tripService from './tripService';
import getError from '../../util/getError';

const initialState = {
  trips: [],
  trip: {},
  userTrips: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

export const getTrips = createAsyncThunk('/trips/getAll', async (_, thunkAPI) => {
  try {
    return await tripService.getTrips();
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

export const createTrip = createAsyncThunk('/trips/create', async (tripData, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().auth.user;
    return await tripService().createTrip(tripData, token);
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

export const getTrip = createAsyncThunk('trips/get', async (tripId, thunkAPI) => {
  try {
    return await tripService.getTrip(tripId);
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

export const getUserTrips = createAsyncThunk('trips/user/get', async (userId, thunkAPI) => {
  try {
    return await tripService.getUserTrips(userId);
  } catch (error) {
    return thunkAPI.rejectWithValue(getError(error));
  }
});

export const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTrips.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrips.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.trip = action.payload;
      })
      .addCase(getTrips.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createTrip.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTrip.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createTrip.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTrip.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.trip = action.payload;
      })
      .addCase(getTrip.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUserTrips.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserTrips.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userTrips = action.payload;
      })
      .addCase(getUserTrips.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset } = tripSlice.actions;

export default tripSlice.reducer;
