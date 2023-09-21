import { createSlice } from "@reduxjs/toolkit";

const lightSlice = createSlice({
  name: "light",
  initialState: {
    light: false,
  },
  reducers: {
    lightAdd(state, action) {
      state.light = action.payload;
    },
  },
});

export const lightReducer = lightSlice.reducer;

export const { lightAdd } = lightSlice.actions;
