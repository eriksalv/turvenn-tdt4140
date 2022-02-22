import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import tripReducer from '../features/trips/tripSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    trips: tripReducer
  }
});

export default store;
