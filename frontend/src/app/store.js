import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import tripReducer from '../features/trips/tripSlice';
import userReducer from '../features/users/userSlice';
import logReducer from '../features/logs/logSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    trips: tripReducer,
    users: userReducer,
    logs: logReducer
  }
});

export default store;
