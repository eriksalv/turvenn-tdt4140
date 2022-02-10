import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "test@test.com",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
